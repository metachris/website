---
boldLinks: true
date: 2016-02-21T00:00:00Z
image: images/posts/wp-caching/thumbnail.jpg
tags:
- How-To
- Wordpress
- Server
title: How to Optimize Wordpress Performance with nginx and WP Super Cache
twitterTags: Wordpress
url: /2016/02/how-to-optimize-wordpress-performance-with-nginx-and-wp-super-cache/
---

This is a simple and effective method how to serve Wordpress pages blazingly fast: <b>produce static HTML files with WP Super Cache, and serve them directly with nginx</b>.

* [WP Super Cache](https://wordpress.org/plugins/wp-super-cache/) (on [Github](https://github.com/Automattic/wp-super-cache)) is an immensely popular, official Wordpress caching plugin with more than 1 million active installations. Basically the plugin produces static html pages of your posts and pages, and anonymous users can directly load the html without any interaction with PHP.

* [nginx](http://nginx.org/) is a very fast, flexible webserver, reverse proxy, load balancer and cache. If you are using Apache, WP Super Cache explains mod_rewrite rules to achieve the same thing as explained in this post.

After installing the WP Super Cache plugin, enable caching in the plugin settings, and configure the garbage collector timeout according to your needs.

<p style="text-align:center;"><img src="/images/posts/wp-caching/wp-super-cache-activate.png" style="border: 1px solid #ccc; max-width:500px; "/></p>

Once enabled, visits by anonymous users (user which are not logged in) will create static .html files in the `/wp-content/cache/supercache/` directory.

<hr class="spaced" />

To achieve optimal performance, serve those .html files directly, bypassing PHP altogether. The following nginx config snippet works well for http:// and https:// sites. I save this snippet as `wp-supercache.conf` and reference it from the various server configs.

{{< highlight nginx >}}
set $cache_uri $request_uri;

# POST requests and urls with a query string should always go to PHP
if ($request_method = POST) {
    set $cache_uri 'null cache';
}
if ($query_string != "") {
    set $cache_uri 'null cache';
}

# Don't cache uris containing the following segments
if ($request_uri ~* "(/wp-admin/|/xmlrpc.php|/wp-(app|cron|login|register|mail).php
                      |wp-.*.php|/feed/|index.php|wp-comments-popup.php
                      |wp-links-opml.php|wp-locations.php |sitemap(_index)?.xml
                      |[a-z0-9_-]+-sitemap([0-9]+)?.xml)") {

    set $cache_uri 'null cache';
}

# Don't use the cache for logged-in users or recent commenters
if ($http_cookie ~* "comment_author|wordpress_[a-f0-9]+
                     |wp-postpass|wordpress_logged_in") {
    set $cache_uri 'null cache';
}

# Set the cache file
set $cachefile "/wp-content/cache/supercache/$http_host/$cache_uri/index.html";
if ($https ~* "on") {
    set $cachefile "/wp-content/cache/supercache/$http_host/$cache_uri/index-https.html";
}

# Add cache file debug info as header
#add_header X-Cache-File $cachefile;

# Try in the following order: (1) cachefile, (2) normal url, (3) php
location / {
    try_files $cachefile $uri $uri/ /index.php;
}
{{< / highlight >}}

This config snippet is based on the nginx.com article [9 Tips for Improving WordPress Performance](https://www.nginx.com/blog/9-tips-for-improving-wordpress-performance-with-nginx/), with added support for https.

<hr class="spaced" />

Now just include the above snippet from a nginx server config:

{{< highlight nginx >}}
server {
    listen 80;
    listen 443 ssl http2;
    server_name www.foremka.at;

    client_max_body_size 24m;
    gzip on;

    root /var/www/foremka.at/htdocs;
    index index.php;

    include snippets/wp-supercache.conf;  # <-- here we reference the wp-supercache snippet

    location ~ \.php$ {
        try_files $uri $uri/ /index.php?$args;
        include fastcgi.conf;
        fastcgi_pass unix:/var/run/php5-fpm.sock;
    }

    # Caching of media: images, icons, video, audio, HTC
    location ~* \.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc|woff|woff2)$ {
        expires 2M;
        add_header Cache-Control "public";
    }

    # CSS and Javascript
    location ~* \.(?:css|js)$ {
        expires 1d;
        add_header Cache-Control "public";
    }
}
{{< / highlight >}}

As always, test and reload the nginx config with `nginx -t && nginx -s reload`. This
command will only reload the config if it doesn't contain any errors.

<hr class="spaced" />

Now let's test if it works:

1. The first anonymous visit will call the PHP code and produce the static .html file
2. The second anonymous visit will receive the cached html

{{< highlight bash >}}
# First call to the website serves directly from wordpress
$ curl -s -D - http://www.foremka.at -o /dev/null
HTTP/1.1 200 OK
Server: nginx
Date: Sun, 21 Feb 2016 12:12:42 GMT
Content-Type: text/html; charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Vary: Accept-Encoding
X-Powered-By: PHP/5.5.9-1ubuntu4.14
Vary: Cookie
Link: <http://www.foremka.at/wp-json/>; rel="https://api.w.org/"
Link: <http://www.foremka.at/>; rel=shortlink
Strict-Transport-Security: max-age=15768000

# Second call to the website should serve the plain html
$ curl -s -D - http://www.foremka.at -o /dev/null
HTTP/1.1 200 OK
Server: nginx
Date: Sun, 21 Feb 2016 12:13:48 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 7146
Last-Modified: Sun, 21 Feb 2016 12:12:42 GMT
Connection: keep-alive
Vary: Accept-Encoding
ETag: "56c9a9ba-1bea"
Strict-Transport-Security: max-age=15768000
Accept-Ranges: bytes
{{< / highlight >}}

How do we know it didn't go through the PHP WP Super Cache? Because WP Super Cache
adds it's own header, as you can see in this example with the nginx config disabled:

{{< highlight bash >}}
$ curl -s -D - http://www.foremka.at -o /dev/null
HTTP/1.1 200 OK
Server: nginx
Date: Sun, 21 Feb 2016 12:15:12 GMT
Content-Type: text/html; charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Vary: Accept-Encoding
X-Powered-By: PHP/5.5.9-1ubuntu4.14
Vary: Accept-Encoding, Cookie
Cache-Control: max-age=3, must-revalidate
WP-Super-Cache: Served supercache file from PHP  <-- WP Super Cache Header
Strict-Transport-Security: max-age=15768000
{{< / highlight >}}

<hr class="spaced" />

## Troubleshooting

If you run into problems, you can always enable the WP Super Cache debugging which
logs a lot of info into a logfile, and manually delete the `/wp-content/cache` directory
for a fresh start.

You can easily verify that WP Super Cache is producing the static files by
showing all files in the directory `wp-content/cache`, for instance with the command `tree`
or `find ./`, or by opening the "Contents" tab in the WP Super Cache Settings
and then clicking "Regenerate cache stats".

<hr class="spaced" />

And that's it! Enjoy your blazingly fast Wordpress setup 😎🚀

If you have suggestions or feedback, let me know via <a href="https://twitter.com/@metachris" target="_blank">@metachris</a>.

<hr class="spaced" />

## References

* [WP Super Cache](https://wordpress.org/plugins/wp-super-cache/) (on [Github](https://github.com/Automattic/wp-super-cache))
* [9 Tips for Improving WordPress Performance](https://www.nginx.com/blog/9-tips-for-improving-wordpress-performance-with-nginx/)
