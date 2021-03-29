---
hideInPostlist: true
boldLinks: true
date: 2015-10-22T00:00:00Z
tags:
- Node.js
title: How to install Node.js 4.x (LTS) on CentOS
url: /2015/10/how-to-install-nodejs-4-on-centos/
---

**Node.js v4.x is deprecated**. Take a look at the current instructions on how to install [Node.js 6.x Long-Term Support (LTS)](/2017/01/how-to-install-nodejs-6-lts-on-ubuntu-and-centos/) and [Node.js 7.x](/2017/01/how-to-install-nodejs-7-on-ubuntu-and-centos/).

<hr class="spaced">

Recently [io.js and node.js merged](https://nodejs.org/en/blog/announcements/foundation-v4-announce/) again into a single codebase in Node v4.0.0.
The fork happened in December 2014 and io.js has seen rapid improvements and fast uptake of upstream V8 features.

Now the merge has happened, and with it comes a lot of [features](https://nodejs.org/en/blog/release/v4.0.0/#notable-changes) from the io.js codebase.
Node.js 4.2.0 has been released on October 12, which is labelled as the first [Long Term Support](https://github.comnodejs/LTS) (LTS) release of Node.js. This means that Node.js v4.x is going to be officially supported without backward incompatible updates for 30 months, until June 2017.

Sadly the standard installation instructions on the [downloads page](https://nodejs.org/en/download/) for installing a current version of node with yum is not updated to the new Node.js v4.x releases!

So here is a quick and easy way how to install the current Node.js 4.x LTS (including `npm`) on CentOS from the [official RPM repository](https://rpm.nodesource.com/pub_4.x/el/7/x86_64/).

{{< highlight bash >}}
# Install the repository
rpm -Uvh https://rpm.nodesource.com/pub_4.x/el/7/x86_64/nodesource-release-el7-1.noarch.rpm

# Install Node.js
yum install nodejs
{{< / highlight >}}

Enjoy Node.js 4.x LTS on CentOS, and reach out to me on Twitter [@metachris](https://twitter.com/metachris)

See also:

* [How to install Node.js 6.x Long-Term Support (LTS) on Centos and Ubuntu](/2017/01/how-to-install-nodejs-6-lts-on-ubuntu-and-centos/)
* [How to install Node.js 7.x on Ubuntu/Debian and CentOS](/2017/01/how-to-install-nodejs-7-on-ubuntu-and-centos/)
