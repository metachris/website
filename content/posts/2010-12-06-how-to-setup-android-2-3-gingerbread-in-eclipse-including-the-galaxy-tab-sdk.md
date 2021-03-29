---
boldLinks: true
date: 2010-12-06T00:00:00Z
hidecomments: true
tags: 
- Android
title: How to Setup Android 2.3 (Gingerbread) in Eclipse, including the Galaxy Tab SDK
url: /2010/12/how-to-setup-android-2-3-gingerbread-in-eclipse-including-the-galaxy-tab-sdk/
---

<p>Today Android version 2.3 (Gingerbread, API Level 9) was <a href="http://android-developers.blogspot.com/2010/12/android-23-platform-and-updated-sdk.html">released</a>, including an updated Android plugin for Eclipse and the API Level 9 SDK.</p>
<p><img style="float:right; margin-left:18px;" title="Android 2.3 &quot;Gingerbread&quot;" src="/images/posts/androidsetup/7-gingerdroid.png" alt="" width="60" height="74" />The release includes some very welcome updates for both users and developers, including better text selection tools, access to more sensor data, improved garbage collection, updated video drivers for better OpenGL performance, a new media framework including VP8 video compression, WebM video container format, AAC audio encoding and AMR wideband encoding. Furthermore Android now natively supports <a href="http://en.wikipedia.org/wiki/Session_Initiation_Protocol">SIP</a> (Session Initiation Protocol) and <a href="http://en.wikipedia.org/wiki/Near_field_communication">NFC</a> (Near Field Communication). For a complete list of updates have a look at the following pages:</p>
<ul>
<li><a href="http://developer.android.com/sdk/android-2.3.html">Android 2.3 Version Notes</a></li>
<li><a href="http://developer.android.com/sdk/android-2.3-highlights.html">Android 2.3 Platform Highlights</a></li>
<li><a href="http://developer.android.com/sdk/api_diff/9/changes.html">Android API Differences</a></li>
</ul>
<p>Everyone new to Android can simply follow the standard <a href="http://developer.android.com/sdk/installing.html">Android SDK installation procedure</a>. Those of us who already have an Android SDK running need to perform the following steps:</p>
<ol>
<li>Update the Android plugin for Eclipse</li>
<li>Install the new SDK (SDK for API Level 9 &ndash; Android 2.3, Gingerbread)</li>
<li>Create a new emulator with Android 2.3</li>
</ol>
<h3>Step 1: Update the Android plugin for Eclipse</h3>
<p><a href="/images/posts/androidsetup/a23-s11.png"><img src="/images/posts/androidsetup/a23-s11.png" alt="" width="600" height="222" /></a></p>
<p><a href="/images/posts/androidsetup/a23-s21.png"><img src="/images/posts/androidsetup/a23-s21.png" alt="" width="600" height="370" /></a></p>
<h3>Step 2: Install the new SDK</h3>
<p><a href="/images/posts/androidsetup/a23-b11.png"><img src="/images/posts/androidsetup/a23-b11.png" alt="" width="600" height="224" /></a><br />
<a href="/images/posts/androidsetup/a23-b21.png"><img src="/images/posts/androidsetup/a23-b21.png" alt="" width="600" height="325" /></a><br />
<a href="/images/posts/androidsetup/a23-b31.png"><img src="/images/posts/androidsetup/a23-b31.png" alt="" width="600" height="452" /></a><br />
<a href="/images/posts/androidsetup/a23-b41.png"><img src="/images/posts/androidsetup/a23-b41.png" alt="" width="600" height="452" /></a></p>
<p>Android API Level 9 including docs and samples should be installed and ready to go, after a restart of Eclipse. For some reason it might stop the installation after the Galaxy Tab SDK setup without having installed the new Android SDK &mdash; in that case start again with step 2 and install what is still available there.</p>
<h3>Step 3: Setting up a new emulator</h3>
<p><a href="/images/posts/androidsetup/a23-b11.png"><img src="/images/posts/androidsetup/a23-b11.png" alt="" width="600" height="224" /></a></p>
<p>In the &ldquo;Android SDK and AVD Manager&rdquo; window, click on &ldquo;New&rdquo;, and select your preferred settings:<br /><a href="/images/posts/androidsetup/a23-c1.png"><img src="/images/posts/androidsetup/a23-c1.png" alt="" width="562" height="544" /></a></p>
<p>That&rsquo;s it!</p>
