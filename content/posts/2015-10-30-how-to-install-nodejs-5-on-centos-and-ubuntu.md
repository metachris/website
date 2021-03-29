---
hideInPostlist: true
boldLinks: true
date: 2015-10-30T00:00:00Z
tags:
- Node.js
title: How to install Node.js 5.x on CentOS and Ubuntu/Debian
url: /2015/10/how-to-install-nodejs-5-on-centos-and-ubuntu/
---

**Node.js v5.x is deprecated**. Take a look at the current instructions on how to install [Node.js 6.x Long-Term Support (LTS)](/2017/01/how-to-install-nodejs-6-lts-on-ubuntu-and-centos/) and [Node.js 7.x](/2017/01/how-to-install-nodejs-7-on-ubuntu-and-centos/).

<hr class="spaced">

[Node.js v5.0.0](https://nodejs.org/en/blog/release/v5.0.0/) (stable) was released today, just a month after the [v4.x](/2015/10/how-to-install-nodejs-4-on-centos) long-term-support (LTS) release! Here is a quick and easy way to install the current Node.js 5.x (including `npm`) on CentOS and Ubuntu/Debian.

---

<h3>Installing Node.js 5.x on CentOS 7</h3>

The easiest way is to install the latest Node.js 5.x from the [official RPM repository](https://rpm.nodesource.com/pub_5.x/el/7/x86_64/) with the standard package manager, which has the advatage of automatically being able to get updates to Node.js:

{{< highlight bash >}}
# Install the Repository
rpm -Uvh https://rpm.nodesource.com/pub_5.x/el/7/x86_64/nodesource-release-el7-1.noarch.rpm

# Install Node.js
yum install nodejs
{{< / highlight >}}

This is basically the short version of running the official CentOS/Fedora/RHEL
install script: [https://rpm.nodesource.com/setup_5.x](https://rpm.nodesource.com/setup_5.x)

---

<h3>Installing Node.js 5.x on Ubuntu and Debian</h3>

This is the [official way](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions) to install Node.js 5.x on Ubuntu, Debian, Linux Mint, Linux Mint Debian Edition (LMDE) and elementaryOS :

{{< highlight bash >}}
# Installing Node.js 5.x on Ubuntu / Debian
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
{{< / highlight >}}

---

Enjoy Node.js 5.x, and reach out to me on Twitter [@metachris](https://twitter.com/metachris)

See also:

* [How to install Node.js 6.x Long-Term Support (LTS) on Centos and Ubuntu](/2017/01/how-to-install-nodejs-6-lts-on-ubuntu-and-centos/)
* [How to install Node.js 7.x on Ubuntu/Debian and CentOS](/2017/01/how-to-install-nodejs-7-on-ubuntu-and-centos/)
