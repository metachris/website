---
boldLinks: true
date: 2011-08-12T00:00:00Z
tags:
- Python
title: App Engine Boilerplate 2.0 – Using html5-boilerplate v2 on Google App Engine
url: /2011/08/app-engine-boilerplate-2-0-using-html5-boilerplate-v2-on-google-app-engine/
---

<p>Just a year ago Paul Irish and several contributors started working on <a href="http://html5boilerplate.com/" target="_blank" rel="nofollow"><strong>html5-boilerplate</strong></a>, a popular repository of boilerplate and best practices for creating cross-browser compatible, html5-enabled websites.

Thanks to the efforts of many front-end developers and researchers who have spent countless hours on developing and evolving best practices, html5 boilerplate is rapidly maturing and establishing itself as the de-facto standard html boilerplate.</p>
<p><img class="aligncenter size-full wp-image-897" title="h5bp" src="https://web.archive.org/web/20120701124709im_/http://metachris.org/wp-content/uploads/2011/08/h5bp.png" alt="html5 boilerplate logo" width="400" height="75" /></p>
<p>The authors just celebrated the one-year anniversary with the release of version 2.0, delivering a well tested, versatile and most useful package. Here&rsquo;s a brief excerpt of <a href="http://html5boilerplate.com/#intro" target="_blank" rel="nofollow">why h5bp is awesome</a>:</p>
<ul>
<li>Cross-browser compatible (IE6, yeah we got that.)</li>
<li>HTML5 ready. Use the new tags with certainty</li>
<li>Build toolchain for optimizing images, minifying and concatenating js+css</li>
<li>Optimal caching and compression rules, Mobile browser optimizations</li>
<li>IE specific classes for maximum cross-browser control</li>
<li>Handy .no-js and .js classes to style based on capability</li>
<li>iOS, Android, Opera Mobile-adaptable markup and CSS skeleton</li>
<li>CDN hosted jQuery with local fallback failsafe</li>
<li><a href="http://html5boilerplate.com/" target="_blank" rel="nofollow">much more</a></li>
</ul>
<div>&nbsp;</div>
<h1>App Engine Boilerplate 2.0</h1>
<p><strong><a href="https://github.com/metachris/appengine-boilerplate" target="_blank" rel="nofollow">appengine-boilerplate</a></strong> is the easiest way to use html5-boilerplate 2.0 on App Engine. It provides a startup kit with h5bp and several app engine specific boilerplate resources and best practices:</p>
<ul>
<li>OpenID authentication + beatiful login UI with&nbsp;<a href="http://code.google.com/p/openid-selector/" target="_blank" rel="nofollow">openid-selector</a></li>
<li>Memcaching setup for requests and responses</li>
<li>Flexible&nbsp;user-preferences model</li>
<li>Templates and template addons</li>
<li>Tools such as&nbsp;<code>is_testenv()</code> and&nbsp;<code>slugify(url)</code></li>
<li>Build tool for optimizing images, minifying and concatenating js+css</li>
<li>Released under the BSD license &mdash; do with it what you want!</li>
</ul>
<p>This let&rsquo;s you skip the boring work of setting up a new app, and focus on building the idea!</p>
<div>&nbsp;</div>
<p><a href="https://github.com/metachris/appengine-boilerplate" target="_blank" rel="nofollow"><img src="https://web.archive.org/web/20120701124709im_/http://kovaiconnect.com/img/bullet-arrow-green.original.png" alt="" /></a></p>
<div><a href="https://github.com/metachris/appengine-boilerplate" target="_blank" rel="nofollow"><strong>Visit appengine-boilerplate on Github</strong></a></div>
<p>&nbsp;</p>
<div>&nbsp;</div>
<p><img src="https://web.archive.org/web/20120701124709im_/https://d3nwyuy0nl342s.cloudfront.net/img/d2956c0fab1d342cb2dec8a5941f077bd99a21dc/687474703a2f2f6c68342e67677068742e636f6d2f5f49664568375859545465452f535441317947486e3739492f41414141414141414144632f49584b72527069636b34772f73746570312e706e67" alt="" /><br />Screenshot of the openid-selector plugin used for users logging in.</p>
<div>&nbsp;</div>
<h1>Tutorial</h1>
<p>Here&rsquo;s a quick step by step guide on starting a new project with appengine-boilerplate:</p>
<ol>
<li>(optional) fork appengine-boilerplate on Github</li>
<li>Clone the repository
<pre class="prettyprint"><span class="pln">git clone git@github</span><span class="pun">.</span><span class="pln">com</span><span class="pun">:</span><span class="pln">metachris</span><span class="pun">/</span><span class="pln">appengine</span><span class="pun">-</span><span class="pln">boilerplate</span><span class="pun">.</span><span class="pln">git</span></pre>
</li>
<li>Configure <tt>upload_to_appengine.sh</tt>: set <tt>CMD_APPCFG</tt> to your local <tt>appcfg.py</tt> from the App Engine SDK</li>
<li>Start the appengine dev-server:
<pre class="prettyprint"><span class="pun">[</span><span class="pln">APP_ENGINE_SDK</span><span class="pun">]/</span><span class="pln">dev_appserver</span><span class="pun">.</span><span class="pln">py app</span><span class="pun">/</span></pre>
</li>
<li>Hack away! You can access the dev version via <tt><a href="http://localhost:8080/" target="_blank" rel="nofollow">http://localhost:8080</a></tt></li>
</ol>
<p>Once you are ready to deploy to App Engine:</p>
<ol>
<li>Create an app on App Engine, if you haven&rsquo;t already</li>
<li>Set the application name in <tt>app/app.yaml</tt></li>
<li>Invoke <tt>upload_to_appengine.sh</tt> which builds the production version of the app with minified and concatenated html, js and css files and optimized images. It will ask you to test the app and, if confirmed, will invoke the App Engine upload-script <tt>appcfg.py</tt>.</li>
</ol>
<div>&nbsp;</div>
<h1>References</h1>
<ul>
<li><strong><a href="https://github.com/metachris/appengine-boilerplate" target="_blank" rel="nofollow">App Engine Boilderplate on Github</a></strong></li>
<li><a href="http://html5boilerplate.com/" target="_blank" rel="nofollow">HTML5 Boilerplate</a>, <a href="https://github.com/paulirish/html5-boilerplate" target="_blank" rel="nofollow">on Github</a></li>
<li><a href="http://metachris.org/2011/04/app-engine-boilerplate/" target="_blank" rel="nofollow">App Engine Boilerplate v1.0</a></li>
<li><a href="http://paulirish.com/" target="_blank" rel="nofollow">Paul Irish</a></li>
</ul>
