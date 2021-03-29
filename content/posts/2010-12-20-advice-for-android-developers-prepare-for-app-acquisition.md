---
boldLinks: true
date: 2010-12-20T00:00:00Z
tags:
- Android
title: "Advice for Android Developers: Prepare for App Acquisition"
url: /2010/12/advice-for-android-developers-prepare-for-app-acquisition/
---

Here’s a brief but important advice for Android app developers: starting with your first app, prepare for the situation where a company wants to acquire one of your applications. Use a unique signing key (alias) for each app! Else you’ll be forced to either cancel the acquisition or hand out the key you use for other apps as well.

[http://developer.android.com/guide/publishing/app-signing.html](ttp://developer.android.com/guide/publishing/app-signing.html):

<blockquote>Android requires that all apps be digitally signed with a certificate before they can be installed. Android uses this certificate to identify the author of an app, and the certificate does not need to be signed by a certificate authority. Android apps often use self-signed certificates. The app developer holds the certificate's private key.</blockquote>

I hope this post might help to avoid a similar situation for other developers.
