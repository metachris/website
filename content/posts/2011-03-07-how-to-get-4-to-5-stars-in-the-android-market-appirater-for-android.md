---
boldLinks: true
date: 2011-03-07T00:00:00Z
tags:
- Android
title: How to get 4 to 5 stars in the Android market (Appirater for Android)
url: /2011/03/how-to-get-4-to-5-stars-in-the-android-market-appirater-for-android/
---

<p>Short answer: Ask your especially engaged users to rate the app (eg. with a tool such as <a href="http://www.androidsnippets.com/prompt-engaged-users-to-rate-your-app-in-the-android-market-appirater" target="_blank">AppRater</a>).</p>

<hr />
<p>iPhone developer Amro Mousa published a <a href="http://amro.co/how-to-get-4-to-5-stars-on-the-app-store" target="_blank">post yesterday</a> with recommendations about how to reach a high average rating on the AppStore, since many app users are only remembered to rate an app on uninstalling, which naturally leads to less-than-optimal reviews and ratings.</p>
<blockquote>
<p>The reality is some developers pay for downloads and reviews to get higher rankings on the App Store. It&rsquo;s tough for Apple to do much about it since the sales look legitimate. It&rsquo;s easy to be frustrated by this sort of thing but there are two things you can do to beat it (ymmv, of course):</p>
<p>1) Release a good app<br />2) Use Appirater</p>
<p>Appirater asks your users to review your app after some conditions are met. &hellip;</p>
</blockquote>
<p>More specifically, iOS library <a href="http://arashpayan.com/blog/index.php/2009/09/07/presenting-appirater/" target="_blank">Appirater</a> prompts users to rate the app after it was launched at least 15 times and installed at least 30 days ago. This targets particularly engaged users which is more likely to yield a great rating.</p>
<p>After seeing a number of people ask for an Android equivalent, I wrote up a simple helper class that does this job:<strong><a href="http://www.androidsnippets.com/prompt-engaged-users-to-rate-your-app-in-the-android-market-appirater" target="_blank">androidsnippets.com/prompt-engaged-users-to-rate-your-app&hellip;</a></strong>.</p>
<p>Usage is simple: After adding your APP_TITLE and APP_PNAME and perhaps adjusting DAYS_UNTIL_PROMPT and LAUNCHES_UNTIL_PROMPT, simply call <tt>app_launched()</tt> from your Activity&rsquo;s<tt>onCreate</tt> method:</p>
<pre class="prettyprint"><span class="typ">AppRater</span><span class="pun">.</span><span class="pln">app_launched</span><span class="pun">(</span><span class="kwd">this</span><span class="pun">);</span></pre>
<p>The dialog&rsquo;s user interface is still very basic &mdash; if you have improvements for the user interface please let me know and I will add it!</p>
<h2>References</h2>
<ul>
<li><a href="http://www.androidsnippets.com/prompt-engaged-users-to-rate-your-app-in-the-android-market-appirater" target="_blank">AppRater on androidsnippets.com</a></li>
<li><a href="http://arashpayan.com/blog/index.php/2009/09/07/presenting-appirater/" target="_blank">Appirater</a> for iOS</li>
</ul>
