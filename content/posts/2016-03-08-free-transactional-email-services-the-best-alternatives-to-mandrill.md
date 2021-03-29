---
boldLinks: true
date: 2016-03-08T00:00:00Z
description: Round-up and comparison of several popular and free transactional email
  services and Mandrill alternatives.
image: images/posts/transactional-email/thumbnail.png
tags:
- Server
- Email
title: Free Transactional Email Services - The Best Alternatives to Mandrill &amp;
  Co.
twitterTags: email
url: /2016/03/free-transactional-email-services-the-best-alternatives-to-mandrill/
---

<center><img src="/images/posts/transactional-email/email-provider.png" style="border: 1px solid #CCC; margin-bottom:1rem;"/></center>

[Mandrill](http://www.mandrill.com/pricing/), the beloved-by-many transactional email service, recently [announced](http://blog.mandrill.com/important-changes-to-mandrill.html) that it will switch to a paid-only model under the MailChimp umbrella.
This came as a surprise to many developers who used them for sending emails for free from various servers and backends.
This post provides a round-up of some of the more popular Mandrill alternatives.

# Free Transactional Email Providers

This section covers a number of popular transactional email providers with a free tier.

<img src="/images/posts/transactional-email/logo-mailgun.png" style="float:right; margin-top:18px;" />

## Mailgun

* [http://www.mailgun.com/pricing](http://www.mailgun.com/pricing)
* First 10,000 emails per month free, then starting at $5 per 5k mails
* Used by: GitHub, Stripe, Heroku
* Sending via SMTP, HTTP API
* Features: Delivery statistics, Recipient Variables (first name, order value, ...), Open, click &amp; unsubscribe tracking, Dedicated IP, Inbound Email

<img src="/images/posts/transactional-email/logo-aws.png" style="float:right; margin-top:18px;" />

## Amazon SES (Simple Email Service)

* [http://aws.amazon.com/ses/pricing](http://aws.amazon.com/ses/pricing)
* 62k emails per month free, then $0.10 per 1,000. $0.12 per GB of attachments sent
* Sending via SMTP, HTTP API
* Features: Analytics for last 24 hours only (delivery attempts, bounces, complaints, rejects), Only Basic Interface, Inbound Email

<img src="/images/posts/transactional-email/logo-sparkpost.png" style="width:120px; float:right; margin-top:18px;" />

## SparkPost

* [https://www.sparkpost.com/pricing](https://www.sparkpost.com/pricing)
* First 100k emails per month free, then ~$0.2 per thousand ($24.99 per 100k)
* Sending via SMTP, HTTP REST API
* Features: Email Open and Click Tracking, Analytics, Templating (incl. conditionals, loops), Open Source Libraries, Dedicated IP, Inbound Email
* Position themselves as Mandrill replacement, including a [migration guide](https://www.sparkpost.com/mandrill-migration-guide) and [low prices for life for new customers](https://www.sparkpost.com/blog/my-promise-to-developers-sparkpost-pricing/)

<img src="/images/posts/transactional-email/logo-mailjet.png" style="width:120px; float:right; margin-top:18px;" />

## Mailjet

* [https://www.mailjet.com/pricing_v3](https://www.mailjet.com/pricing_v3)
* Free for 6k emails / month, paid plans starting at $7.50 for 30k mails
* Sending via SMTP, HTTP API
* Features: Tracking, Analytics, Personalization, Templates, Dedicated IP, Inbound Email

<img src="/images/posts/transactional-email/logo-elastic-email.png" style="width:120px; float:right; margin-top:18px;" />

## Elastic Email

* [http://elasticemail.com/pricing](http://elasticemail.com/pricing)
* First 25k emails per month free, then $0.19 per thousand
* Sending via SMTP, HTTP API
* Features: Email Open and Click Tracking, Templates, Dedicated IP, Inbound Email API

<img src="/images/posts/transactional-email/logo-sendinblue.png" style="width:120px; float:right; margin-top:18px;" />

## SendinBlue

* [https://www.sendinblue.com/pricing](https://www.sendinblue.com/pricing)
* 9k emails per month free (limited to 300 per day)
* Sending via SMTP, HTTP API
* Features: Delivery statistics, Templates, Template Editor, SMS Marketing, Dedicated IP

<img src="/images/posts/transactional-email/logo-gmail.png" style="width:120px; float:right; margin-top:8px;" />

## smtp.google.com

* Gmail allows sending 2000 emails per day with SMTP via any standard user account
* [How To Use Google's SMTP Server](https://support.google.com/a/answer/176600?hl=en)


<img src="/images/posts/transactional-email/logo-postageapp.gif" style="width:50px; float:right; margin-top:18px;" />

## Postage App

* [https://secure.postageapp.com/register](https://secure.postageapp.com/register)
* 1k emails per month free (max 100/day), $9 for 10k emails/month, $29 for 40k emails/month, $79 for 100k emails/month
* Sending via SMTP, HTTP API
* Features: Analytics, Templates, Personalization, Dedicated IP

---

# Paid-Only Transactional Email Providers

This incomplete section covers a number of paid-only transactional email providers.

<img src="/images/posts/transactional-email/logo-mandrill.png" style="width:120px; float:right; margin-top:18px;" />

## Mandrill

* [http://www.mandrill.com/pricing](http://www.mandrill.com/pricing)
* by Mailchimp, paid starting March 16
* Starting at $20 for 25k emails, then about $.8/k.
* Features: Fine grained API, Open Source Libraries, Dedicated IP, Templates, Inbound Email

<img src="/images/posts/transactional-email/logo-postmark.png" style="width:120px; float:right; margin-top:8px;" />

## Postmark App

* [https://postmarkapp.com/pricing](https://postmarkapp.com/pricing)
* $1.50 per 1k emails
* First 25k emails free
* Sending via SMTP, HTTP API
* Features: Analytics, Open tracking, Dedicated IP, Templates, Inbound Email, Full content for every mail of past 45 days

<img src="/images/posts/transactional-email/logo-smtpcom.png" style="width:120px; float:right; margin-top:18px;" />

## SMTP.com

* [https://www.smtp.com/plans-pricing](https://www.smtp.com/plans-pricing)
* 10k emails/month $15, 50k emails/month $70, 100k emails/month $160
* Sending via SMTP, HTTP API


<img src="/images/posts/transactional-email/logo-sendgrid.svg" style="width:120px; float:right; margin-top:18px;" />

## Sendgrid

* [https://sendgrid.com/pricing](https://sendgrid.com/pricing)
* <strike>Free plan for 12k emails / month. Paid plans starting at $10 for 40k emails, or $0.10 for 1k emails</strike>
* 30 day trial with 40k emails
* Sending via SMTP, HTTP API
* Features: Analytics (open, click, bounce, etc.), Templates, Mobile apps, Fine grained API permissions, Dedicated IP, Inbound Email

---

# Summary

Finally a quick overview in tabular form:

<table>
	<tr>
		<th style="width:15%;">Service</th>
		<th>Free Tier</th>
		<th>20k Emails</th>
		<th>50k Emails</th>
		<th>100k Emails</th>
		<th>SMTP</th>
		<th>API</th>
		<!-- <th>Info / Features</th> -->
		<th>Dedicated IP</th>
		<th>Templates</th>
		<th>Inbound Email</th>
	</tr>
	<tr>
		<td><a href="http://www.mailgun.com/">Mailgun</a></td>
		<td>10k/m</td>
		<td>$5</td>
		<td>$20</td>
		<td>$45</td>
		<td>✅</td>
		<td>✅</td>
		<td>✅</td>
		<td>⛔</td>
        <td>✅</td>
		<!-- <td>Analytics, Variables, Tracking</td> -->
	</tr>
	<tr>
		<td><a href="http://aws.amazon.com/ses">Amazon SES</a></td>
		<td>62k/m</td>
		<td>$0</td>
		<td>$0</td>
		<td>~$4</td>
		<td>✅</td>
		<td>✅</td>
		<!-- <td>$.1 per 1k emails after 62k free / month. Only 24h Analytics and few features overall.</td> -->
        <td>⛔</td>
		<td>⛔</td>
        <td>✅</td>
	</tr>
    <tr>
		<td><a href="https://www.sparkpost.com/features">SparkPost</a></td>
		<td>100k/m</td>
		<td>$0</td>
		<td>$0</td>
		<td>$0</td>
		<td>✅</td>
		<td>✅</td>
		<!-- <td>Analytics, Variables, Tracking</td> -->
        <td>✅</td>
        <td>✅</td>
        <td>✅</td>
	</tr>
	<tr>
		<td><a href="https://www.mailjet.com">MailJet</a></td>
		<td>6k/m</td>
		<td>$7.49</td>
		<td>$21.95</td>
		<td>$74.95</td>
		<td>✅</td>
		<td>✅</td>
		<!-- <td>Analytics, Variables, Tracking</td> -->
        <td>✅</td>
        <td>✅</td>
        <td>✅</td>
	</tr>
	<tr>
		<td><a href="http://elasticemail.com/">Elastic Email</a></td>
		<td>25k/m</td>
		<td>$0</td>
		<td>$4.75</td>
		<td>$14.25</td>
		<td>✅</td>
		<td>✅</td>
		<!-- <td>Analytics, Variables, Tracking</td> -->
        <td>✅</td>
        <td>✅</td>
        <td>✅</td>

	</tr>
        <tr>
		<td><a href="https://www.sendinblue.com">Sendin Blue</a></td>
		<td>300/day, 9k/m</td>
		<td>$7.37</td>
		<td>$39</td>
		<td>$66</td>
		<td>✅</td>
		<td>✅</td>
		<!-- <td>Analytics, Variables, Tracking, Template Editor, SMS</td> -->
        <td>✅</td>
        <td>✅</td>
        <td>⛔</td>
	</tr>
	<tr>
		<td><a href="https://support.google.com/a/answer/176600?hl=en">Gmail SMTP</a></td>
		<td>2k/day, 60k/m</td>
		<td>$0</td>
		<td>$0</td>
		<td>-</td>
		<td>✅</td>
		<td>⛔</td>
		<!-- <td>No Analytics, just plain SMTP</td> -->
        <td>⛔</td>
        <td>⛔</td>
        <td>⛔</td>
	</tr>
    <tr>
		<td><a href="https://secure.postageapp.com">Postage App</a></td>
		<td>1k/month</td>
		<td>$9</td>
		<td>$79</td>
		<td>$79</td>
		<td>✅</td>
		<td>✅</td>
		<!-- <td>Analytics, Variables, Tracking</td> -->
        <td>✅</td>
        <td>✅</td>
        <td>⛔</td>
	</tr>
    <tr>
		<td><a href="http://www.mandrill.com/">Mandrill</a></td>
		<td>0</td>
		<td>$20</td>
		<td>$40</td>
		<td>$80</td>
		<td>✅</td>
		<td>✅</td>
		<!-- <td>Analytics, Variables, Tracking</td> -->
        <td>✅</td>
        <td>✅</td>
        <td>✅</td>
	</tr>
    <tr>
		<td><a href="https://postmarkapp.com">Postmark</a></td>
		<td>0</td>
		<td>$30</td>
		<td>$75</td>
		<td>$150</td>
		<td>✅</td>
		<td>✅</td>
		<!-- <td>Analytics, Variables, Tracking</td> -->
        <td>✅</td>
        <td>✅</td>
        <td>✅</td>
	</tr>
    <tr>
		<td><a href="https://www.smtp.com">SMTP.com</a></td>
		<td>0</td>
		<td>$70</td>
		<td>$70</td>
		<td>$160</td>
		<td>✅</td>
		<td>✅</td>
		<!-- <td>Analytics, Variables, Tracking</td> -->
        <td>✅</td>
        <td>✅</td>
        <td>⛔</td>
	</tr>
		<tr>
		<td><a href="https://sendgrid.com/solutions/transactional-email">SendGrid</a></td>
		<td>0</td>
		<td>$9.95</td>
		<td>$19.95</td>
		<td>$19.95</td>
		<td>✅</td>
		<td>✅</td>
		<!-- <td>Analytics, Variables, Tracking</td> -->
        <td>✅</td>
        <td>✅</td>
        <td>✅</td>
	</tr>
</table>


<hr class="spaced" />

You can contact me [on Twitter](https://twitter.com/metachris), and Discuss this post on <a href="https://news.ycombinator.com/item?id=11328631">Hacker News</a>.

<small>Update 2017-01-11: Updated SendGrid prices (no longer has a free tier)</small><br>
<small>Update 2016-03-22: Updated Mailchimp prices, Added dedicated IPs to Postmark</small>

<!--
<hr class="spaced" />

Please let me know via <a href="https://twitter.com/@metachris" target="_blank">@metachris</a> if you have any feedback or suggestions. -->
