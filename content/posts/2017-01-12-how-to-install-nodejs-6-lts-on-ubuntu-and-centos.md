---
hideInPostlist: true
boldLinks: true
date: 2017-01-12T00:00:00Z
image: images/posts/nodejs-logo.svg
tags:
- Node.js
thumbnail: images/posts/nodejs-thumb.png
title: How to install Node.js 6.x Long-Term Support (LTS) on Ubuntu/Debian and CentOS
url: /2017/01/how-to-install-nodejs-6-lts-on-ubuntu-and-centos/
---

[Node.js](https://nodejs.org) 6.x is the current [Node.js long-term support (LTS) release](https://github.comnodejs/LTS), with Node.js v6.9.4 being the most recent release as of time of writing. This guide shows a quick and reliable way to install the current Node.js 6.x LTS version (including `npm`) on Ubuntu/Debian and CentOS.

<center>
<img src="/images/posts/nodejs-logo-wide.png" style="max-width: 400px;" />
<div style="clear:both;"></div>
<div class="highlight-bgwhite" style="display:inline-block;">{{< highlight js >}}console.log("Hello World");{{< / highlight >}}</div>
<div style="clear:both;"></div>
</center>

We will use the system package manager (eg. `apt` or `yum`) to install Node.js 6.x, to be able to continually receive security updates without risking a major version jump with possibly breaking changes.

You can jump directly to the installation instructions here:

* [Ubuntu/Debian](#ubuntu-debian)
* [CentOS](#centos)

---

<h2>About Node.js Long-Term Support (LTS)</h2>

> Every major version covered by the LTS plan will be actively maintained for a period of 18 months from the date it enters LTS coverage. Following those 18 months of active support, the major version will transition into "maintenance" mode for 12 additional months.

<small>via [https://github.comnodejs/LTS#lts-schedule](https://github.comnodejs/LTS#lts-schedule)</small>

<br>
<img src="/images/posts/nodejs-lts-schedule.jpg" alt="Node.js LTS Schedule" />

Node.js 6 LTS  will be actively maintained until April 2018, and passively maintained until April 2019, as shown in the image above. It is recommended to use the long-term support version for client projects, in order to be guaranteed a long active maintenance with security updates..

---

<a name="ubuntu-debian"></a>
<h2>Installing Node.js 6.x LTS on Ubuntu and Debian</h2>

This is the [official way](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions) to install Node.js 6.x on Ubuntu, Debian, Linux Mint, Linux Mint Debian Edition (LMDE) and elementaryOS:

{{< highlight bash >}}
# Install Node.js 6.x repository
curl -sL https://deb.nodesource.com/setup_6.x | bash -

# Install Node.js and npm
apt-get install -y nodejs
{{< / highlight >}}

The [setup_6.x bash script](https://deb.nodesource.com/setup_6.x) basically just checks whether your operating system version is suppored and adds the corresponding repository (eg. `https://deb.nodesource.com/node_6.x xenial InRelease`).

---

<a name="centos"></a>
<h2>Installing Node.js 6.x LTS on CentOS 7</h2>

Node.js provides a script for CentOS/Fedora/RHEL based distributions, which checks
your operating system and adds the corresponding RPM repository for `yum`, the standard package manager:

{{< highlight bash >}}
# Install Node.js 6.x repository
curl -sL https://rpm.nodesource.com/setup_6.x | bash -

# Install Node.js and npm
yum install nodejs
{{< / highlight >}}

The content of the script can be found here: [https://rpm.nodesource.com/setup_6.x](https://rpm.nodesource.com/setup_6.x).

<hr class="spaced">

For feedback, ideas and recommendations, contact me [on Twitter](https://twitter.com/metachris).

See also:

* [How to install Node.js 7.x on Ubuntu/Debian and CentOS](/2017/01/how-to-install-nodejs-7-on-ubuntu-and-centos/)
