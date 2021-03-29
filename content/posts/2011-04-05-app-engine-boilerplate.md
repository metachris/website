---
boldLinks: true
date: 2011-04-05T00:00:00Z
tags:
- Python
title: App Engine Boilerplate
url: /2011/04/app-engine-boilerplate/
---

<p>I recently started <a href="https://github.com/metachris/appengine-boilerplate">appengine-boilerplate</a>, a repository of often used boilerplate code for Google&rsquo;s App Engine, which allows to quickly setup new projects without having to re-invent the most common wheels. All code is released under the BSD license, and It comes with the following goodies:</p>

<ul>
<li>html5-boilerplate (incl. jQuery)</li>
<li>OpenID authentication</li>
<li>User preferences data model (with gravatar image link)</li>
<li>Memcache for datastore objects</li>
<li>Handlers for /, /profile, /login and /logout</li>
<li>Custom template tags</li>
<li>Various tools such as <code>is_testenv()</code>, <code>decode(input)</code> and <code>slugify(title)</code></li>
<li><code>app.yaml</code> configuration for URL&rsquo;s which can be accessed publicly, only for logged in users, and only for administrators, all setup to work with html5-boilerplate&rsquo;s directory structure</li>
</ul>
<h2>html5-boilerplate</h2>
<p><a href="http://html5boilerplate.com/">html5-boilerplate</a> is a great project initiated by Paul Irish, which provides a boilerplate for cross-browser compatible html5 websites, and also includes a nifty build system which minifies, concatenates and optimizes all the resources of the website to increase the website&rsquo;s performance.</p>
<p>The build-system is fully integrated into appengine-boilerplate, including a helper script called<code>upload_to_appengine.sh</code>. This scripts initiates the build process, changes the /static symlink to the minified verion, uploads the website to appengine, and reverts /static back to the development environment. Implementing this process can <a href="http://blog.androidsnippets.com/2011/how-html5-boilerplate-helped-drastically-improving-our-website-performance">drastically improve the website&rsquo;s performance</a>.</p>
<h2>OpenID</h2>
<p>appengine-boilerplate uses the same OpenID provider selection as StackOverflow, based on the <a href="http://code.google.com/p/openid-selector/">openid-selector</a>jQuery plugin:<br /><img src="https://web.archive.org/web/20120622021213im_/https://d3nwyuy0nl342s.cloudfront.net/img/d2956c0fab1d342cb2dec8a5941f077bd99a21dc/687474703a2f2f6c68342e67677068742e636f6d2f5f49664568375859545465452f535441317947486e3739492f41414141414141414144632f49584b72527069636b34772f73746570312e706e67" alt="" /></p>
<h2>Memcache</h2>
<p>App Engine allows you to directly put datastore entities into memcache, which is commonly used to reduce database reads when viewing a website. Using memcache, only the first user will trigger a database read which places the entities into memcache, and all subsequent users can get them from there until the cache is invalidated either by the website or by App Engine itself. Cache lifetime on App Engine seems to be usually just a few hours, but it will provide a noticeable performance improvement for your visitors.</p>
<p>Using appengine-boilerplate you can use the following commands</p>
<pre class="prettyprint"><span class="kwd">import</span><span class="pln"> mc<br />mc</span><span class="pun">.</span><span class="pln">cache</span><span class="pun">.</span><span class="pln">get_someitems</span><span class="pun">()</span><span class="pln"> &nbsp;</span><span class="com"># will read from db if not in cache</span></pre>
<p>and invalidate the cache with</p>
<pre class="prettyprint"><span class="pln">mc</span><span class="pun">.</span><span class="pln">cache</span><span class="pun">.</span><span class="pln">get_someitems</span><span class="pun">(</span><span class="pln">clear</span><span class="pun">=</span><span class="kwd">True</span><span class="pun">)</span></pre>
<h2>Feedback &amp; Additions</h2>
<p>One particular feature I&rsquo;d like to implement in the near future is authentication with OAuth (Twitter, Facebook, etc). <strong>I&rsquo;d love to hear your ideas</strong> for further additions, and will happily review and accept pull requests. Please leave your feedback in the comments or drop me a line via chris (at) metachris.org.</p>
<p>And if you want to stay updated, you should <a href="http://twitter.com/metachris">follow me on twitter</a>.</p>
<h2>References</h2>
<ul>
<li><a href="https://github.com/metachris/appengine-boilerplate">appengine-boilerplate</a></li>
<li><a href="http://html5boilerplate.com/#v1">html5-boilerplate</a></li>
</ul>
