---
hideInPostlist: true
boldLinks: true
date: 2017-01-12T00:00:00Z
hide-thumbnail: true
image: images/posts/nodejs-logo.svg
tags:
- Node.js
thumbnail: images/posts/nodejs-thumb.png
title: How to install Node.js 7.x on Ubuntu/Debian and CentOS
url: /2017/01/how-to-install-nodejs-7-on-ubuntu-and-centos/
---

[Node.js 7.x](https://nodejs.org) is the current stable release of the Node.js, which is actively maintained in parallel to [Node.js 6.x Long-Term Support (LTS)](/2017/01/how-to-install-nodejs-6-lts-on-ubuntu-and-centos/). At the moment, the latest version is Node.js v7.4.0, and you can find the Node.js v7.x Changelog [here on Github](https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V7.md).

<center>
<img src="/images/posts/nodejs-logo-wide.png" style="max-width: 400px;" />
</center>

This guide shows a quick and reliable way to install the current Node.js 7.x version (including `npm`) on Ubuntu/Debian and CentOS, using the system package manager, in order to continually receive security updates without risking a major version jump with possibly breaking changes.

---

<a name="ubuntu-debian"></a>
<h2>Installing Node.js 7.x on Ubuntu and Debian</h2>

This is the [official way](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions) to install Node.js 7.x on Ubuntu, Debian, Linux Mint, Linux Mint Debian Edition (LMDE) and elementaryOS:

{{< highlight bash >}}
# Install Node.js 7.x repository
curl -sL https://deb.nodesource.com/setup_7.x | bash -

# Install Node.js and npm
apt-get install -y nodejs
{{< / highlight >}}

The [setup_7.x bash script](https://deb.nodesource.com/setup_7.x) basically just checks whether your operating system version is suppored and adds the corresponding repository (eg. `https://deb.nodesource.com/node_7.x xenial InRelease`).

---

<a name="centos"></a>
<h2>Installing Node.js 7.x on CentOS 7</h2>

Node.js provides a script for CentOS/Fedora/RHEL based distributions, which checks
your operating system and adds the corresponding RPM repository for `yum`, the standard package manager:

{{< highlight bash >}}
# Install Node.js 7.x repository
curl -sL https://rpm.nodesource.com/setup_7.x | bash -

# Install Node.js and npm
yum install nodejs
{{< / highlight >}}

The content of the script can be found here: [https://rpm.nodesource.com/setup_7.x](https://rpm.nodesource.com/setup_7.x).

<hr class="spaced">

For feedback, ideas and recommendations, contact me [on Twitter](https://twitter.com/metachris).

See also:

* [How to install Node.js v6.x Long-Term Support (LTS) on Centos and Ubuntu](/2017/01/how-to-install-nodejs-6-lts-on-ubuntu-and-centos/)
