---
boldLinks: true
date: 2015-12-14T00:00:00Z
description: Let's Encrypt is a new certificate authority backed by Mozilla, Akamai,
  EFF, Facebook and others, which provides free SSL/TLS certificates. This is an overview
  and comparison of 10 popular clients.
image: images/logos/le-logo-lockonly.png
jQuery: true
tags:
- Server
title: Comparison of 10 ACME / Let's Encrypt Clients
twitterTags: letsencrypt
url: /2015/12/comparison-of-10-acme-lets-encrypt-clients/
---

![Let's Encrypt Logo](/images/posts/letsencrypt/letsencrypt-logo-horizontal.svg)

[Let's Encrypt](https://letsencrypt.org) is a new certificate authority backed
by Mozilla, Akamai, EFF, Facebook and others, which provides <strong>free, automated
SSL/TLS certificates</strong>. The [public beta](https://letsencrypt.org/2015/12/03/entering-public-beta.html) started on December 3, 2015 and a whole lot of certificates [have been issued](https://letsencrypt.org/stats/) already:

![Let's Encrypt Daily Activity](/images/posts/letsencrypt/le-activity.png)

Several clients to automate issuing, renewing and revoking certificates have been released both by the community and the Let's Encrypt team. This post is an overview and comparison of 10 popular Let's Encrypt clients:

* [letsencrypt-auto](#client-lets-encrypt), the official Let's Encrypt client
* [acme-tiny](#client-acme-tiny), a tiny semi-automatic Python implementation
* [gethttpsforfree.com](#client-gethttpsforfree), a static website to assist the manual process
* [simp_le](#client-simp_le), another Python implementation
* [letsencrypt-nosudo](#client-le_nosudo), the predecessor of acme-tiny and gethttpsforfree
* [acmetool](#client-acmetool), an ACME client in Go
* [lego](#client-lego), an ACME client and library written in Go
* [letsencrypt.sh](#client-letsencrypt.sh), a Bash ACME client implemenation
* [acme](#client-acme-client), ACME implementation in PHP
* [lescript](#client-lescript), a PHP library

Background
==========

ACME
----

The [Automated Certificate Management Environment (ACME)](https://letsencrypt.github.io/acme-spec/)
protocol defines a way of automatically obtaining trusted certificates
without human intervention. First, the control of a domain has to be proven,
then the agent can request, renew and revoke certificates:

![ACME Challenge](/images/posts/letsencrypt/howitworks_challenge.png)

Certificates issued by Let's Encrypt are valid for [90 days](https://letsencrypt.org/2015/11/09/why-90-days.html), and are expected to be renewed automatically. More background information can be found on the [Let's Encrypt - How It Works](https://letsencrypt.org/howitworks/technology/) page.

At the time of writing, these [rate limits](https://community.letsencrypt.org/t/beta-program-announcements/1631/6) has been in place:

* 10 Registrations per IP per 3 hours
* 5 Certificates per Domain per 7 days (incl. subdomains)


SSL Certificates &amp; Signing
------------------------------

Obtaining a valid [SSL certificate](https://en.wikipedia.org/wiki/Public_key_certificate) generally includes the following steps:

1. You create a private and public key pair on the server.
2. You create a [Certificate Signing Request (CSR)](https://en.wikipedia.org/wiki/Certificate_signing_request) which includes the domain name, organization name, the public key, and other information. The CSR is signed with your private key.
3. You send the CSR to the [certificate authority](https://en.wikipedia.org/wiki/Certificate_authority) (in this case Let's Encrypt).
4. The certificate authority signs the request, thus producing a public certificate.
5. You use the public certificate in your webserver.

<a name="ssl_config"></a>For more information on configuring a webserver with certificates, check out these links:

* [cipherli.st](https://cipherli.st/) - Example configuration for Apache, nginx and Lighttpd
* [Mozilla SSL Config Generator](https://mozilla.github.io/server-side-tls/ssl-config-generator)
* [Qualsys SSL Labs SSL Server Test](https://www.ssllabs.com/ssltest/)
* [SSL Decoder](https://ssldecoder.org/)

---

Client Analysis
===============

These tests are going to obtain a certificate for a domain such as `www.example.com`
and setting up automatic certificate renewal.

Domain ownership verification requires the ACME server being able to access a specific file
on the domain. To accomplish this, we assume a webserver is running and serves
files from `/var/www/htdocs/` (the webroot) and it's subdirectories. For instance, a file at `/var/www/htdocs/.well-known/acme-challenge/8303` should be accessible via `www.example.com/.well-known/acme-challenge/8303`.

---

<a name="client-lets-encrypt"></a>

Official Let's Encrypt Client
----------------------------

* [github.com/letsencrypt/letsencrypt](https://github.com/letsencrypt/letsencrypt)
  * ![Github Stars](/images/posts/letsencrypt/github-letsencrypt-letsencrypt-stars.svg) ![Github Forks](/images/posts/letsencrypt/github-letsencrypt-letsencrypt-forks.svg)
  * 4,355 commits, 131 contributors
* Mode: Automatic / Interactive / Manual
* License: Apache 2.0
* Language: Python
* Lines of code: 8,612 (core), ~16,000 (total)
* Dependencies: many
* [Documentation](https://letsencrypt.readthedocs.org/en/latest/)

The [official Let's Encrypt client](http://letsencrypt.readthedocs.org/en/latest/using.html), `letsencrypt-auto`, is
a heavyweight, fully automated Python program with various modes of operation and installers (for instance to automagically update Apache and nginx configurations).

The standard client automatically installs various system dependencies via the standard package manager (see the [source code](https://github.com/letsencrypt/letsencrypt/blob/master/letsencrypt-auto) and [/bootstrap/](https://github.com/letsencrypt/letsencrypt/tree/master/bootstrap)), and sets up a virtualenv with
a number of Python dependencies. The client is also available as a [Docker image](http://letsencrypt.readthedocs.org/en/latest/using.html#running-with-docker),
which avoids the necessity to install packages system-wide.

In case of an error (eg. the ACME server is not reachable), the official client gracefully terminates with an info message.

The official Let's Encrypt client also supports config files, which may be
easier to automate with a cronjob (see [this post](https://gist.github.com/xrstf/581981008b6be0d2224f)
for more infos).

<ul style="list-style: none;">
<li><i class="fa fa-plus" style="color: green;"></i>&nbsp; Official client, active community</li>
<li><i class="fa fa-plus" style="color: green;"></i>&nbsp; Well documented, and well tested</li>
<li><i class="fa fa-plus" style="color: green;"></i>&nbsp; Can do a lot of things, including server configs (experimental!)</li>
<li><i class="fa fa-plus" style="color: green;"></i>&nbsp; Accessible for non-technical users</li>
<li><i class="fa fa-minus" style="color: red;"></i>&nbsp; Complex program, many moving parts, hard to review</li>
<li><i class="fa fa-minus" style="color: red;"></i>&nbsp; Runs as root and installs dependencies without asking</li>
</ul>

**Standard Installation**

{{< highlight bash >}}
$ git clone https://github.com/letsencrypt/letsencrypt
$ cd letsencrypt
$ ./letsencrypt-auto --help
{{< / highlight >}}

<a href="javascript:void(0)" onclick="$('#letsencrypt-output1').toggle();" class="nobold">⇾ show output</a>

<div class="highlight" id="letsencrypt-output1" style="display:none;"><pre><code>$ ./letsencrypt-auto --help
Updating letsencrypt and virtual environment dependencies.......
Running with virtualenv: /root/.local/share/letsencrypt/bin/letsencrypt --help

 letsencrypt [SUBCOMMAND] [options] [-d domain] [-d domain] ...

The Let's Encrypt agent can obtain and install HTTPS/TLS/SSL certificates.  By
default, it will attempt to use a webserver both for obtaining and installing
the cert. Major SUBCOMMANDS are:

 (default) run        Obtain & install a cert in your current webserver
 certonly             Obtain cert, but do not install it (aka "auth")
 install              Install a previously obtained cert in a server
 revoke               Revoke a previously obtained certificate
 rollback             Rollback server configuration changes made during install
 config_changes       Show changes made to server config during installation
 plugins              Display information about installed plugins

Choice of server plugins for obtaining and installing cert:

 --apache          Use the Apache plugin for authentication & installation
 --standalone      Run a standalone webserver for authentication
 (nginx support is experimental, buggy, and not installed by default)
 --webroot         Place files in a server's webroot folder for authentication

OR use different plugins to obtain (authenticate) the cert and then install it:

 --authenticator standalone --installer apache

More detailed help:

 -h, --help [topic]    print this message, or detailed help on a topic;
                       the available topics are:

  all, automation, paths, security, testing, or any of the subcommands or
  plugins (certonly, install, nginx, apache, standalone, webroot, etc)
</code></pre></div>

**Obtaining a certificate**

To obtain a certificate without stopping a running webserver, we are going to use the **webroot method**, which
only requires write access for the webroot to save the authentication file.

{{< highlight bash >}}
$ sudo ./letsencrypt-auto certonly \
    --webroot --webroot-path /var/www/htdocs/ \
    --email admin@example.com \
    -d www.example.com
{{< / highlight >}}

This command creates the private and public keys, generate a certificate signing request, get the challenge from the ACME server, saves it to the webroot, and downloads the signed certificate in `/etc/letsencrypt/live/example.com/`. The process
is fully automated and results in the certificate and private key, ready to be [used by your webserver](#ssl_config).

<a href="javascript:void(0)" onclick="$('#letsencrypt-result1').toggle();" class="nobold">⇾ show list of generated files</a>

<div class="highlight" id="letsencrypt-result1" style="display:none;"><pre><code>$ tree /etc/letsencrypt/
.
├── accounts
│   └── acme-v01.api.letsencrypt.org
│       └── directory
│           └── 69e7ae92b1a61252a6989403c95a10c8
│               ├── meta.json
│               ├── private_key.json
│               └── regr.json
├── archive
│   └── www.example.com
│       ├── cert1.pem
│       ├── cert2.pem
│       ├── cert3.pem
│       ├── chain1.pem
│       ├── chain2.pem
│       ├── chain3.pem
│       ├── fullchain1.pem
│       ├── fullchain2.pem
│       ├── fullchain3.pem
│       ├── privkey1.pem
│       ├── privkey2.pem
│       └── privkey3.pem
├── csr
│   ├── 0000_csr-letsencrypt.pem
│   ├── 0001_csr-letsencrypt.pem
│   ├── 0002_csr-letsencrypt.pem
│   └── 0003_csr-letsencrypt.pem
├── keys
│   ├── 0000_key-letsencrypt.pem
│   ├── 0001_key-letsencrypt.pem
│   ├── 0002_key-letsencrypt.pem
│   └── 0003_key-letsencrypt.pem
├── live
│   └── www.example.com
│       ├── cert.pem -> ../../archive/www.example.com/cert3.pem
│       ├── chain.pem -> ../../archive/www.example.com/chain3.pem
│       ├── fullchain.pem -> ../../archive/www.example.com/fullchain3.pem
│       └── privkey.pem -> ../../archive/www.example.com/privkey3.pem
└── renewal
    └── www.example.com.conf
</code></pre></div>

Alternatively the offial Let's Encrypt client includes a [manual plugin](http://letsencrypt.readthedocs.org/en/latest/using.html#manual), which
can generate a certificate from another computer than the webserver
(akin to [gethttpsforfree.com](#client-gethttpsforfree) or [letsencrypt-nosudo](#client-le_nosudo)).
You can run this plugin with the command `./letsencrypt-auto certonly --manual`.

**Renewal**

To renew certificates automatically, simply add the `--renew` parameter to the above command:

{{< highlight bash >}}
$ sudo ./letsencrypt-auto certonly \
    --renew \
    --webroot --webroot-path /var/www/htdocs/ \
    --email admin@example.com \
    -d www.example.com
{{< / highlight >}}


---

<a name="client-acme-tiny"></a>

acme-tiny
---------

* [github.com/diafygi/acme-tiny](https://github.com/diafygi/acme-tiny)
    * ![Github Stars](/images/posts/letsencrypt/github-diafygi-acme-tiny-stars.svg) ![Github Forks](/images/posts/letsencrypt/github-diafygi-acme-tiny-forks.svg)
  * 55 commits, 11 contributors
* Mode: Automatic / Semi-Automatic
* License: MIT
* Language: Python
* Lines of code: ~200
* Dependencies: None
* [Show HN](https://news.ycombinator.com/item?id=10676685)

Acme-tiny is a tiny Python script which assists with issuing and renewing certificates. You generate
the private key and create a certificate signing request (CSR) manually, and `acme-tiny` handles the rest (submitting the CSR
to the ACME server, receiving the authentication files, putting it in the acme-challenge folder and receiving the final certificate). The output of this script is the signed certificate.

<ul style="list-style: none;">
<li><i class="fa fa-plus" style="color: green;"></i>&nbsp; Documentation (in the README)</li>
<li><i class="fa fa-plus" style="color: green;"></i>&nbsp; Super simple, no dependencies</li>
<li><i class="fa fa-plus" style="color: green;"></i>&nbsp; Easy to embed in custom Python application</li>
</ul>

**Installation**

{{< highlight bash >}}
# Get a copy of acme-tiny
$ cd /opt
$ git clone https://github.com/diafygi/acme-tiny.git
$ cd acme-tiny
$ python acme_tiny.py --help
{{< / highlight >}}

<a href="javascript:void(0)" onclick="$('#acme-tiny-output1').toggle();" class="nobold">⇾ show output</a>

<div class="highlight" id="acme-tiny-output1" style="display:none;"><pre><code>$ python acme_tiny.py --help
usage: acme_tiny.py [-h] --account-key ACCOUNT_KEY --csr CSR --acme-dir
                    ACME_DIR [--quiet] [--ca CA]

This script automates the process of getting a signed TLS certificate from
Let's Encrypt using the ACME protocol. It will need to be run on your server
and have access to your private account key, so PLEASE READ THROUGH IT! It's
only ~200 lines, so it won't take long.

===Example Usage===
python acme_tiny.py --account-key ./account.key --csr ./domain.csr --acme-dir /usr/share/nginx/html/.well-known/acme-challenge/ > signed.crt
===================

===Example Crontab Renewal (once per month)===
0 0 1 * * python /path/to/acme_tiny.py --account-key /path/to/account.key --csr /path/to/domain.csr --acme-dir /usr/share/nginx/html/.well-known/acme-challenge/ > /path/to/signed.crt 2>> /var/log/acme_tiny.log
==============================================

optional arguments:
  -h, --help            show this help message and exit
  --account-key ACCOUNT_KEY
                        path to your Let's Encrypt account private key
  --csr CSR             path to your certificate signing request
  --acme-dir ACME_DIR   path to the .well-known/acme-challenge/ directory
  --quiet               suppress output except for errors
  --ca CA               certificate authority, default is Let's Encrypt
</code></pre></div>

**Obtaining a certificate**

{{< highlight bash >}}
# Create a directory for the keys and cert
mkdir -p /etc/letsencrypt/www.example.com
cd /etc/letsencrypt/www.example.com

# Generate a private key
openssl genrsa 4096 > account.key

# Generate a domain private key (if you haven't already)
openssl genrsa 4096 > domain.key

# Create a CSR for www.example.com
openssl req -new -sha256 -key domain.key -subj "/CN=www.example.com" > domain.csr

# Create the challenge folder in the webroot
mkdir -p /var/www/htdocs/.well-known/acme-challenge/

# Get a signed certificate with acme-tiny
python /opt/acme-tiny/acme_tiny.py --account-key ./account.key --csr ./domain.csr --acme-dir /var/www/htdocs/.well-known/acme-challenge/ > ./signed.crt

# Append the Let's Encrypt intermediate cert to your cert
wget -O - https://letsencrypt.org/certs/lets-encrypt-x1-cross-signed.pem > intermediate.pem
cat signed.crt intermediate.pem > chained.pem
{{< / highlight >}}

<a href="javascript:void(0)" onclick="$('#acme-tiny-output2').toggle();" class="nobold">⇾ show output</a>

<div class="highlight" id="acme-tiny-output2" style="display:none;"><pre><code># openssl genrsa 4096 > account.key
Generating RSA private key, 4096 bit long modulus
...................................................................................................................++
.........................................................................................................++
e is 65537 (0x10001)
# openssl genrsa 4096 > domain.key
Generating RSA private key, 4096 bit long modulus
........................................++
.........................................................................................................................................................................................................................................................................................................................................................................................++
e is 65537 (0x10001)
# openssl req -new -sha256 -key domain.key -subj "/CN=www.example.com" > domain.csr
# mkdir -p /var/www/htdocs/.well-known/acme-challenge/
# python /opt/acme-tiny/acme_tiny.py --account-key ./account.key --csr ./domain.csr --acme-dir /var/www/htdocs/.well-known/acme-challenge/ > ./signed.crt
Parsing account key...
Parsing CSR...
Registering account...
Already registered!
Verifying www.example.com...
www.example.com verified!
Signing certificate...
Certificate signed!
</code></pre></div>

At this point `chained.pem` contains the signed certificate chain and, along with `domain.key`, can be used to run a http server
([more infos](https://github.com/diafygi/acme-tiny#step-5-install-the-certificate)).

Renewal simply requires running this script again with the same parameters.

---

<a name="client-gethttpsforfree"></a>

gethttpsforfree.com
-------------------

* [github.com/diafygi/gethttpsforfree](https://github.com/diafygi/gethttpsforfree)
  * ![Github Stars](/images/posts/letsencrypt/github-diafygi-gethttpsforfree-stars.svg) ![Github Forks](/images/posts/letsencrypt/github-diafygi-gethttpsforfree-forks.svg)
  * 70 commits, 10 contributors
* Mode: Semi-Manual
* License: MIT
* Language: HTML &amp; JavaScript
* Lines of code: 1228 JS, 443 HTML

[gethttpsforfree.com](https://gethttpsforfree.com/) is a website which helps users to manually generate all the necessary information to create a certificate signing request (CSR), guiding a user through the whole ACME process:

1. Manually create a public and private key.
2. Manually create a certificate signing request (CSR).
3. Manually sign a number of requests with the private key.
4. Manually verify ownership by serving the signed requests (either through an existing webserver or a simple Python webserver).
5. The website tells the ACME server to check for the verifications, and in case of success provides you with the signed certificate.

The website provides OpenSSL commands at each step, and waits for the output of the commands to be pasted back into the website to verify the success. The website never asks for any kind of private key. It can be saved and used locally without any server side logic.

<ul style="list-style: none;">
<li><i class="fa fa-plus" style="color: green;"></i>&nbsp; Works as advertised</li>
<li><i class="fa fa-plus" style="color: green;"></i>&nbsp; Static site allows to save and use later</li>
</ul>

---

<a name="client-simp_le"></a>

simp_le
-------

* [github.com/kuba/simp_le](https://github.com/kuba/simp_le)
  * ![Github Stars](/images/posts/letsencrypt/github-kuba-simp_le-stars.svg) ![Github Forks](/images/posts/letsencrypt/github-kuba-simp_le-forks.svg)
  * 112 commits, 9 contributors
* Mode: Fully or Semi-Automatic
* License: GPLv3
* Language: Python
* Lines of code: 775 Python, 126 Shell Script, 41 YAML
* Dependencies: Some

`simp_le` is an ACME client written in Python. It works similar to `acme-tiny`, but can
also generate the private key and CSR automatically. Requires a small number of dependencies to be installed.

**Installation**

{{< highlight bash >}}
$ cd /opt
$ git clone https://github.com/kuba/simp_le
$ cd simp_le

# Setup dependencies and run
$ ./bootstrap.sh
$ ./venv.sh
$ ./venv/bin/simp_le --help
{{< / highlight >}}

<a href="javascript:void(0)" onclick="$('#simp_le-output1').toggle();" class="nobold">⇾ show output</a>

<div class="highlight" id="simp_le-output1" style="display:none;"><pre><code>$ ./venv/bin/simp_le --help
Simple Let's Encrypt client.

  -v, --verbose         Increase verbosity of the logging. (default: False)

  -h, --help            Show this help message and exit.
  --version             Display version and exit.
  --revoke              Revoke existing certificate (default: False)
  --test                Run tests and exit. (default: False)

Webroot manager:
  This client is just a sophisticated manager for $webroot/.well-known/acme-
  challenge. You can (optionally) specify `--default_root`, and override
  per-vhost with `-d example.com:/var/www/other_html` syntax.

  -d DOMAIN:PATH, --vhost DOMAIN:PATH
                        Domain name that will be included in the certificate.
                        Must be specified at least once. (default: None)
  --default_root PATH   Default webroot path. (default: None)

Certificate data files:
  -f PLUGIN             Input/output plugin of choice, can be specified
                        multiple times and, in fact, it should be specified as
                        many times as it is necessary to cover all components:
                        key, certificate, chain. Allowed values:
                        account_key.json, cert.der, cert.pem, chain.der,
                        chain.pem, external_pem.sh, fullchain.der,
                        fullchain.pem, key.der, key.pem. (default: [])
  --cert_key_size BITS  Certificate key size. Fresh key is created for each
                        renewal. (default: 4096)
  --valid_min SECONDS   Minimum validity of the resulting certificate.
                        (default: 2592000)
  --reuse_key           Reuse private key if it was previously persisted.
                        (default: False)

Registration:
  This client will automatically register an account with the ACME CA
  specified by `--server`.

  --account_key_public_exponent BITS
                        Account key public exponent value. (default: 65537)
  --account_key_size BITS
                        Account key size in bits. (default: 4096)
  --tos_sha256 HASH     SHA-256 hash of the contents of Terms Of Service URI
                        contents. (default: 33d233c8ab558ba6c8ebc370a509acdded
                        8b80e5d587aa5d192193f35226540f)
  --email EMAIL         Email address. CA is likely to use it to remind about
                        expiring certificates, as well as for account
                        recovery. Therefore, it's highly recommended to set
                        this value. (default: None)

HTTP:
  Configure properties of HTTP requests and responses.

  --user_agent NAME     User-Agent sent in all HTTP requests. Override with
                        --user_agent "" if you want to protect your privacy.
                        (default: simp_le/0)
  --server URI          Directory URI for the CA ACME API endpoint. (default:
                        https://acme-v01.api.letsencrypt.org/directory)

See https://github.com/kuba/simp_le for more info.
</code></pre></div>

**Obtaining a certificate**

{{< highlight bash >}}
$ ./venv/bin/simp_le \
    -f account_key.json -f key.pem -f cert.pem -f fullchain.pem \
    --email admin@example.com \
    -d www.example.com:/var/www/htdocs/
{{< / highlight >}}

On success, this command produces 4 files: `account_key.json`, `cert.pem`, `fullchain.pem` and `key.pem`,
which can be used from your webserver's SSL configuration (see [here](https://blog.heckel.xyz/2015/12/04/lets-encrypt-5-min-guide-to-set-up-cronjob-based-certificate-renewal) for an example integration in Apache).

Renewal works by using the same command.

Exit codes:

* 0 if certificate data was created or updated;
* 1 if renewal not necessary;
* 2 in case of errors.

---

<a name="client-le_nosudo"></a>

letsencrypt-nosudo
------------------

* [github.com/diafygi/letsencrypt-nosudo](https://github.com/diafygi/letsencrypt-nosudo)
  * ![Github Stars](/images/posts/letsencrypt/github-diafygi-letsencrypt-nosudo-stars.svg) ![Github Forks](/images/posts/letsencrypt/github-diafygi-letsencrypt-nosudo-forks.svg)
  * 45 commits, 5 contributors
* Mode: Manual (assisted)
* License: AGPL
* Language: Python
* Lines of code: 400
* Dependencies: None

This program is a predecessor of acme-tiny and functionally equivalent to gethttpsforfree.com (made by the same author). The script guides you through the whole process and ask you do run all the necessary commands in the terminal.

You generate a private key and certificate signing request (CSR), then run `sign_csr.py` to get the signed certificate. The script goes through the ACME protocol with the Let's Encrypt certificate authority and outputs the signed certificate to stdout.

**Installation**

{{< highlight bash >}}
$ cd /opt
$ git clone https://github.com/diafygi/letsencrypt-nosudo
$ cd letsencrypt-nosudo
$ python sign_csr.py -h
{{< / highlight >}}

<a href="javascript:void(0)" onclick="$('#lenosudo-output1').toggle();" class="nobold">⇾ show output</a>

<div class="highlight" id="lenosudo-output1" style="display:none;"><pre><code>$ python sign_csr.py -h
usage: sign_csr.py [-h] -p PUBLIC_KEY [-e EMAIL] [-f] csr_path

Get a SSL certificate signed by a Let's Encrypt (ACME) certificate authority and
output that signed certificate. You do NOT need to run this script on your
server and this script does not ask for your private keys. It will print out
commands that you need to run with your private key or on your server as root,
which gives you a chance to review the commands instead of trusting this script.

NOTE: YOUR ACCOUNT KEY NEEDS TO BE DIFFERENT FROM YOUR DOMAIN KEY.

Prerequisites:
* openssl
* python

Example: Generate an account keypair, a domain key and csr, and have the domain csr signed.
--------------
$ openssl genrsa 4096 > user.key
$ openssl rsa -in user.key -pubout > user.pub
$ openssl genrsa 4096 > domain.key
$ openssl req -new -sha256 -key domain.key -subj "/CN=example.com" > domain.csr
$ python sign_csr.py --public-key user.pub domain.csr > signed.crt
--------------

positional arguments:
  csr_path              path to your certificate signing request

optional arguments:
  -h, --help            show this help message and exit
  -p PUBLIC_KEY, --public-key PUBLIC_KEY
                        path to your account public key
  -e EMAIL, --email EMAIL
                        contact email, default is webmaster@&gt;shortest_domain>
  -f, --file-based      if set, a file-based response is used
</code></pre></div>


**Obtaining a certificate**

{{< highlight bash >}}
$ openssl genrsa 4096 > user.key
$ openssl rsa -in user.key -pubout > user.pub
$ openssl genrsa 4096 > domain.key
$ openssl req -new -sha256 -key domain.key -subj "/CN=example.com" > domain.csr
$ python sign_csr.py --public-key user.pub domain.csr > signed.crt
{{< / highlight >}}

<a href="javascript:void(0)" onclick="$('#lenosudo-cmd1').toggle();" class="nobold">⇾ show output</a>

<div class="highlight" id="lenosudo-cmd1" style="display:none;"><pre><code>user@hostname:~$ openssl genrsa 4096 > user.key
Generating RSA private key, 4096 bit long modulus
.............................................................................................................................................................................++
....................................................++
e is 65537 (0x10001)
user@hostname:~$ openssl rsa -in user.key -pubout > user.pub
writing RSA key
user@hostname:~$ openssl genrsa 4096 > domain.key
Generating RSA private key, 4096 bit long modulus
.................................................................................................................................................................................++
...........................................++
e is 65537 (0x10001)
user@hostname:~$ openssl req -new -sha256 -key domain.key -subj "/CN=www.example.com" > domain.csr
user@hostname:~$ python sign_csr.py --public-key user.pub domain.csr > signed.crt
Reading pubkey file...
Found public key!
Reading csr file...
Found domains www.example.com
STEP 1: What is your contact email? (webmaster@www.example.com)
Building request payloads...
STEP 2: You need to sign some files (replace 'user.key' with your user private key).

openssl dgst -sha256 -sign user.key -out register_KN2ihH.sig register_ABUO4T.json
openssl dgst -sha256 -sign user.key -out domain_BbpWG4.sig domain_rSKa5G.json
openssl dgst -sha256 -sign user.key -out challenge_fo6_ib.sig challenge_e3gHzd.json
openssl dgst -sha256 -sign user.key -out cert_36OUdW.sig cert_3IZULZ.json

Press Enter when you've run the above commands in a new terminal window...
Registering daniel@roesler.cc...
Already registered. Skipping...
Requesting challenges for www.example.com...
STEP 3: You need to sign some more files (replace 'user.key' with your user private key).

openssl dgst -sha256 -sign user.key -out response_ATE3Yu.sig response_P87LMt.json

Press Enter when you've run the above commands in a new terminal window...
STEP 4: You need to run this command on www.example.com (don't stop the python command until the next step).

sudo python -c "import BaseHTTPServer; \
    h = BaseHTTPServer.BaseHTTPRequestHandler; \
    h.do_GET = lambda r: r.send_response(200) or r.end_headers() or r.wfile.write('dKsTWOsqGuOIBep_DYGpXOFqc_aLMu8HiXKMZ8xvsww.1Gt_C6ImtCNs62Zb5YArtvUOnWTp6MkprcNt88ZgUp8'); \
    s = BaseHTTPServer.HTTPServer(('0.0.0.0', 80), h); \
    s.serve_forever()"

Press Enter when you've got the python command running on your server...
Requesting verification for www.example.com...
Waiting for www.example.com challenge to pass...
Passed www.example.com challenge!
Requesting signature...
Certificate signed!
You can stop running the python command on your server (Ctrl+C works).
user@hostname:~$ cat signed.crt
-----BEGIN CERTIFICATE-----
MIIGJTCCBQ2gAwIBAgISATBRUGjFwTtjF4adpF7zd/5qMA0GCSqGSIb3DQEBCwUA
MEoxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MSMwIQYDVQQD
ExpMZXQncyBFbmNyeXB0IEF1dGhvcml0eSBYMTAeFw0xNTEwMjQwOTU4MDBaFw0x
NjAxMjIwOTU4MDBaMCoxKDAmBgNVBAMTH2xldHNlbmNyeXB0LmRheWxpZ2h0cGly
YXRlcy5vcmcwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQC2Ac7twhMz
AxreQxmlY0gBq20zrriMOCLTwwdJ3sfv9bNxo+iG7eidu9imLI0FNjZkxtpyJeG/
+4OnvTgChHiTEKtD0Q3SoeSOu3Bl73d4bVBfTsvj0yEoMrF4Y89VvqbH7HP+2evv
Uraj2Qv0EUor3KAsOJW4hiSQedmz69+3IVZHWdpyYTtC1HjO9C5DqPgD7hlrtRrP
k0SL4j048NIiDvMm36pzn/UM+HxuavVxIyQ7BigDk7Hev6jXH2BqQk0ADtR0CycI
nJeS5gk+i6ImDeOsrhPrXvub02aRbol/paoSknskAOJKe4628dd873QfMXnQz1JT
aggaFQA1S8M2DY9l574/gOH39BudXdvOGzln7MeDJoi7Tybih2FJJbj8tQPV2zwh
ArbKLHPJibM1HP8jc7QQcrWnNf3H2N5FhP8uvEVchdYk3zV2tJPqlQnsHctOjNrV
18WRsl+JpUNLclRWQ3JLYZL+waIaJvsAsjp58J3XK1PI1s7QPuJpI3u7hlu4zz2e
TMF8OqAEy+rkHML5j+ncB+ctxhgNgirwpCUQ3NL9rslte0OmO+kzjrVfJ7o5D6zt
Hn5xg2WTgNoCdXbIruEzC43SqkPIH8VeFkzjPCqGajQsXXmdbDyoNkJ+SK0Fz0hI
3alW4kaOSe0aeto22sKtOjsIy7GF6qDw4QIDAQABo4ICIzCCAh8wDgYDVR0PAQH/
BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMBAf8E
AjAAMB0GA1UdDgQWBBSpGhk6yOALnLPWzrncMA/wnd6nNzAfBgNVHSMEGDAWgBSo
SmpjBH3duubRObemRWXv86jsoTBwBggrBgEFBQcBAQRkMGIwLwYIKwYBBQUHMAGG
I2h0dHA6Ly9vY3NwLmludC14MS5sZXRzZW5jcnlwdC5vcmcvMC8GCCsGAQUFBzAC
hiNodHRwOi8vY2VydC5pbnQteDEubGV0c2VuY3J5cHQub3JnLzAqBgNVHREEIzAh
gh9sZXRzZW5jcnlwdC5kYXlsaWdodHBpcmF0ZXMub3JnMIIBAAYDVR0gBIH4MIH1
MAoGBmeBDAECATAAMIHmBgsrBgEEAYLfEwEBATCB1jAmBggrBgEFBQcCARYaaHR0
cDovL2Nwcy5sZXRzZW5jcnlwdC5vcmcwgasGCCsGAQUFBwICMIGeDIGbVGhpcyBD
ZXJ0aWZpY2F0ZSBtYXkgb25seSBiZSByZWxpZWQgdXBvbiBieSBSZWx5aW5nIFBh
cnRpZXMgYW5kIG9ubHkgaW4gYWNjb3JkYW5jZSB3aXRoIHRoZSBDZXJ0aWZpY2F0
ZSBQb2xpY3kgZm91bmQgYXQgaHR0cHM6Ly9sZXRzZW5jcnlwdC5vcmcvcmVwb3Np
dG9yeS8wDQYJKoZIhvcNAQELBQADggEBADQ2nWJa0jSOgStC7luKLmNOiNZTbiYP
ITFetj6WpRIsAHwz3vTwDIWFtczrhksWRTU9mCIwaxtqflZrirc3mE6jKugeSUHr
1yqTXZ097rDNAnMvUtvoET/UBkAU+gUDn8zRFtKOePuWX7P8qHq8QqjNqMC0vb5s
ncyFqSSZl1j9e5l+Kpj/GeTCwkwck5U75Ry44kPbnu5JLd70P724gBnyEi6IxXHB
txXZEUmI0R1Ee3Kw/5N6JfeWNE1KEmM47VVFomRitruxBj9nlXtIILvkPCTWkDua
pr1OmFi/rUcaHw+Txbs8aBmZEBkxy9HPSfgqqlYqEd0ipGqFtqaFJEI=
-----END CERTIFICATE-----
user@hostname:~$
</code></pre></div>

---

<a name="client-acmetool"></a>

acmetool
--------

* [github.com/hlandau/acme](https://github.com/hlandau/acme)
  * ![Github Stars](/images/posts/letsencrypt/github-hlandau-acme-stars.svg) ![Github Forks](/images/posts/letsencrypt/github-hlandau-acme-forks.svg)
  * 103 commits, 1 contributors
* Mode: Automatic / Interactive
* License: MIT
* Language: Go
* Lines of code: ~6,000
* Dependencies: None (Binary Release)

`acmetool` is an ACME client written in Go, supporting automatic domain verification with webroot and standalone methods as well as an interactive wizard. acmetool stores credentials and certificates at `/var/lib/acme/live/HOSTNAME/{cert,chain,fullchain,privkey}` by default and includes support to import certificates from the official client.

acmetool furthermore provides a `reconcile` option which makes sure all desired hostnames
have valid certificates which don't expire soon.

**Installation**

You can either get a [binary release](https://github.com/hlandau/acme/releases), or build from source as described in the Readme:

{{< highlight bash >}}
$ wget https://github.com/hlandau/acme/releases/download/v0.0.22/acmetool-v0.0.22-linux_amd64.tar.gz
$ tar -xvf acmetool-v0.0.22-linux_amd64.tar.gz
$ cd acmetool-v0.0.22-linux_amd64
$ bin/acmetool --help
{{< / highlight >}}


<a href="javascript:void(0)" onclick="$('#acmetool-o1').toggle();" class="nobold">⇾ show output</a>

<div class="highlight" id="acmetool-o1" style="display:none;"><pre><code>$ bin/acmetool help
usage: acmetool [&lt;flags>] &lt;command> [&lt;args> ...]

Flags:
  --help                         Show context-sensitive help (also try --help-long and --help-man).
  --state=/var/lib/acme          Path to the state directory (env: ACME_STATE_DIR)
  --hooks=/usr/lib/acme/hooks    Path to the notification hooks directory (env: ACME_HOOKS_DIR)
  --batch                        Do not attempt interaction; useful for cron jobs
  --stdio                        Don't attempt to use console dialogs; fall back to stdio prompts
  --response-file=RESPONSE-FILE  Read dialog responses from the given file
  --version                      Print version information
  --xlog.facility=XLOG.FACILITY  syslog facility to use
  --xlog.syslog                  log to syslog?
  --xlog.syslogseverity=XLOG.SYSLOGSEVERITY
                                 syslog severity limit
  --xlog.journal                 log to systemd journal?
  --xlog.journalseverity=XLOG.JOURNALSEVERITY
                                 systemd journal severity limit
  --xlog.severity=XLOG.SEVERITY  log severity (any syslog severity name or number)
  --xlog.file=XLOG.FILE          log to filename
  --xlog.fileseverity=XLOG.FILESEVERITY
                                 file logging severity limit
  --xlog.stderr                  log to stderr?
  --xlog.stderrseverity=XLOG.STDERRSEVERITY
                                 stderr logging severity limit
  --service.cpuprofile=SERVICE.CPUPROFILE
                                 Write CPU profile to file
  --service.debugserveraddr=SERVICE.DEBUGSERVERADDR
                                 Address for debug server to listen on (do not specify a public address) (default: disabled)
  --service.uid=SERVICE.UID      UID to run as (default: don't drop privileges)
  --service.gid=SERVICE.GID      GID to run as (default: don't drop privileges)
  --service.daemon               Run as daemon? (doesn't fork)
  --service.chroot=SERVICE.CHROOT
                                 Chroot to a directory (must set UID, GID) ("/" disables)
  --service.pidfile=SERVICE.PIDFILE
                                 Write PID to file with given filename and hold a write lock
  --service.fork                 Fork? (implies -daemon)

Commands:
  help [&lt;command>...]
    Show help.

  reconcile*
    Reconcile ACME state

  want &lt;hostname>...
    Add a target with one or more hostnames

  quickstart [&lt;flags>]
    Interactively ask some getting started questions (recommended)

  redirector [&lt;flags>]
    HTTP to HTTPS redirector with challenge response support

  test-notify [&lt;hostname>...]
    Test-execute notification hooks as though given hostnames were updated

  import-jwk-account &lt;provider-url> &lt;private-key-file>
    Import a JWK account key

  import-key &lt;private-key-file>
    Import a certificate private key

  import-le [&lt;le-state-path>]
    Import a Let's Encrypt client state directory
</code></pre></div>

**Obtaining a certificate**

You need to set the webroot to `/var/run/acme/acme-challenge` as described
in [the docs](https://github.com/hlandau/acme/blob/master/_doc/WSCONFIG.md), or use the proxy method. The command `acmetool want` tries all available methods.

{{< highlight bash >}}
$ sudo acmetool want www.example.com
{{< / highlight >}}

---

<a name="client-lego"></a>

lego
----

* [github.com/xenolf/lego](https://github.com/xenolf/lego)
  * ![Github Stars](/images/posts/letsencrypt/github-xenolf-lego-stars.svg) ![Github Forks](/images/posts/letsencrypt/github-xenolf-lego-forks.svg)
  * 162 commits, 4 contributors
* Mode: Automatic
* License: MIT
* Language: Go
* Lines of code: ~2,000
* Dependencies: None (Binary Release)
* [Show HN](https://news.ycombinator.com/item?id=10682971)

Lego is an ACME library and standalone application written in Go. It can be downloaded as
a [binary release](https://github.com/xenolf/lego/releases) or build by yourself.

Running the standalone version requires the permission to bind to port 80 and 443,
which conflicts with a webserver which is already running.

**Installation**

{{< highlight bash >}}
$ wget https://github.com/xenolf/lego/releases/download/v0.1.0/lego_linux_amd64.tar.gz
$ tar -xvf lego_linux_amd64.tar.gz
lego
LICENSES.txt
README.txt
$ ./lego help
{{< / highlight >}}

<a href="javascript:void(0)" onclick="$('#lego-o1').toggle();" class="nobold">⇾ show output</a>

<div class="highlight" id="lego-o1" style="display:none;"><pre><code># ./lego help
NAME:
   lego - Let's encrypt client to go!

USAGE:
   ./lego [global options] command [command options] [arguments...]

VERSION:
   0.1.0

COMMANDS:
   run		Register an account, then create and install a certificate
   revoke	Revoke a certificate
   renew	Renew a certificate
   help, h	Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --domains, -d [--domains option --domains option]			Add domains to the process
   --server, -s "https://acme-v01.api.letsencrypt.org/directory"	CA hostname (and optionally :port). The server certificate must be trusted in order to avoid further modifications to the client.
   --email, -m 								Email used for registration and recovery contact.
   --rsa-key-size, -B "2048"						Size of the RSA key.
   --path "/opt/le5-lego/dl/.lego"					Directory to use for storing the data
   --port 								Challenges will use this port to listen on. Please make sure to forward port 443 to this port on your machine. Otherwise use setcap on the binary
   --help, -h								show help
   --version, -v							print the version
</code></pre></div>

**Obtaining a certificate**

{{< highlight bash >}}
$ sudo ./lego --email="admin@example.com" --domains="www.example.com" run
{{< / highlight >}}

<a href="javascript:void(0)" onclick="$('#lego-o2').toggle();" class="nobold">⇾ show output</a>

<div class="highlight" id="lego-o2" style="display:none;"><pre><code>$ sudo ./lego --email="admin@example.com" --domains="www.example.com" run
2015/12/13 17:32:25 No key found for account admin@example.com. Generating a 2048 bit key.
2015/12/13 17:32:26 Saved key to /opt/le5-lego/dl/.lego/accounts/acme-v01.api.letsencrypt.org/admin@example.com/keys/admin@example.com.key
2015/12/13 17:32:26 [INFO] acme: Registering account for admin@example.com
2015/12/13 17:32:27 !!!! HEADS UP !!!!
2015/12/13 17:32:27
		Your account credentials have been saved in your Let's Encrypt
		configuration directory at "/opt/le5-lego/dl/.lego/accounts/acme-v01.api.letsencrypt.org/admin@example.com".
		You should make a secure backup	of this folder now. This
		configuration directory will also contain certificates and
		private keys obtained from Let's Encrypt so making regular
		backups of this folder is ideal.
2015/12/13 17:32:27 Please review the TOS at https://letsencrypt.org/documents/LE-SA-v1.0.1-July-27-2015.pdf
2015/12/13 17:32:27 Do you accept the TOS? Y/n
Y
2015/12/13 17:32:30 [INFO] acme: Obtaining bundled SAN certificate for www.example.com
2015/12/13 17:33:02 [INFO] acme: Trying to solve TLS-SNI-01
2015/12/13 17:33:04 The server validated our request
2015/12/13 17:33:04 [INFO] acme: Validations succeeded; requesting certificates
2015/12/13 17:33:05 [INFO] acme: Requesting issuer cert from https://acme-v01.api.letsencrypt.org/acme/issuer-cert
2015/12/13 17:33:05 [www.example.com] Server responded with a certificate.
</code></pre></div>


---

<a name="client-letsencrypt.sh"></a>

letsencrypt.sh
--------------

* [github.com/lukas2511/letsencrypt.sh](https://github.com/lukas2511/letsencrypt.sh)
  * ![Github Stars](/images/posts/letsencrypt/github-lukas2511-letsencrypt.sh-stars.svg) ![Github Forks](/images/posts/letsencrypt/github-lukas2511-letsencrypt.sh-forks.svg)
  * 111 commits, 6 contributors
* Mode: Automatic
* License: Unspecified
* Language: Shell Script (Bash)
* Lines of code: ~600 (Bash)
* Dependencies: None / OpenSSL, curl, sed
* [Show HN](https://news.ycombinator.com/item?id=10681851)

<!--
<ul style="list-style: none;">
<li><i class="fa fa-plus" style="color: green;"></i>&nbsp; Plus</li>
<li><i class="fa fa-minus" style="color: red;"></i>&nbsp; Minus</li>
</ul> -->


**Installation**

{{< highlight bash >}}
$ git clone https://github.com/lukas2511/letsencrypt.sh
$ ./letsencrypt.sh --help
{{< / highlight >}}

<a href="javascript:void(0)" onclick="$('#lesh-o1').toggle();" class="nobold">⇾ show output</a>

<div class="highlight" id="lesh-o1" style="display:none;"><pre><code>$ ./letsencrypt.sh --help
Usage: ./letsencrypt.sh [-h] [command [argument]] [parameter [argument]] [parameter [argument]] ...

Default command: cron

Commands:
 --cron (-c)                      Sign/renew non-existant/changed(TODO)/expiring certificates.
 --sign (-s) domain.tld           Force-sign specific certificate from domains.txt, even if not yet expiring or changed.
 --revoke (-r) path/to/cert.pem   Revoke specified certificate
 --help (-h)                      Show help text

Parameters:
 --config (-f) path/to/config.sh  Use specified config file
 --privkey (-p) path/to/key.pem   Use specified private key instead of account key (useful for revocation)
</code></pre></div>


**Obtaining a certificate**

Create a file called `domains.txt` which contains the domains and subdomains you want to
generate certificates for:

{{< highlight bash >}}
example.com www.example.com
example.net www.example.net wiki.example.net
{{< / highlight >}}

This requests two certificates, for example.com and example.net. The other domains in the corresponding line are their alternative names.

`letsencrypt.sh` writes the challenge files by default into the directory `"${SCRIPTDIR}/.acme-challenges"`. To adjust this to your webroot, you need to create a config file (`config.sh`) with another `$WELLKNOWN` path (see [config.sh.example](https://github.com/lukas2511/letsencrypt.sh/blob/master/config.sh.example)):

{{< highlight bash >}}
WELLKNOWN="${SCRIPTDIR}/.well-known/acme-challenge"
{{< / highlight >}}

Then simply run `letsencrypt.sh` (<a href="javascript:void(0)" onclick="$('#lesh-o2').toggle();" class="nobold">⇾ show output</a>).

<div class="highlight" id="lesh-o2" style="display:none;"><pre><code>$ ./letsencrypt.sh
Using config file /opt//letsencrypt.sh/config.sh
Processing www.example.com
 + Signing domains...
 + Generating private key...
 + Generating signing request...
 + Requesting challenge for www.example.com...
 + Responding to challenge for www.example.com...
 + Challenge is valid!
 + Requesting certificate...
 + Checking certificate...
 + Creating fullchain.pem...
 + Done!

$ ./letsencrypt.sh
Using config file /opt//letsencrypt.sh/config.sh
+ Found existing cert...
+ Valid till Mar 12 22:42:00 2016 GMT (Longer than 14 days). Skipping!
</code></pre></div>

<!--
<a href="javascript:void(0)" onclick="$('#lenosudo-output1').toggle();" class="nobold">⇾ show output</a>

<div class="highlight" id="lenosudo-output1" style="display:none;"><pre><code>
</code></pre></div> -->

---

<a name="client-acme-client"></a>

acme-client
-----------

* [github.com/kelunik/acme-client](https://github.com/kelunik/acme-client)
  * ![Github Stars](/images/posts/letsencrypt/github-kelunik-acme-client-stars.svg) ![Github Forks](/images/posts/letsencrypt/github-kelunik-acme-client-forks.svg)
  * 3 commits, 1 contributors
* Mode: Automatic
* License: MIT
* Language: PHP (7)
* Lines of code: ~400
* Dependencies: Few

`acme-client` is an ACME client written in PHP, built on top of the [acme PHP library](https://github.com/kelunik/acme) by the same author.

It requires **PHP 7** and [composer](https://getcomposer.org) to install it's dependencies.

**Installation**

{{< highlight bash >}}
$ git clone https://github.com/kelunik/acme-client
$ cd acme-client
$ composer install
{{< / highlight >}}

**Obtaining a certificate**

{{< highlight bash >}}
# Register the Let's Encrypt account
$ sudo bin/acme register \
    --server acme-v01.api.letsencrypt.org/directory \
    --email me@example.com

# Issue the certificate
$ sudo bin/acme issue \
    --server acme-v01.api.letsencrypt.org/directory \
    --domains example.com,www.example.com \
    --path /var/www/example.com/htdocs
{{< / highlight >}}

---

<a name="client-lescript"></a>

lescript
-----------

* [github.com/analogic/lescript](https://github.com/analogic/lescript)
  * ![Github Stars](/images/posts/letsencrypt/github-analogic-lescript-stars.svg) ![Github Forks](/images/posts/letsencrypt/github-analogic-lescript-forks.svg)
  * 3 commits, 1 contributors
* Mode: Automatic
* License: BSD
* Language: PHP
* Lines of code: ~450
* Dependencies: PHP 5.4.8+ with OpenSSL and curl extension
* [Show HN](https://news.ycombinator.com/item?id=10709678)

`lescript` is a very simplistic PHP ACME client library, with an example CLI wrapper.

**Installation**

{{< highlight bash >}}
$ git clone https://github.com/analogic/lescript.git
$ cd lescript
{{< / highlight >}}

**Obtaining a certificate**

Use the library as shown in [_example.php](https://github.com/analogic/lescript/blob/master/_example.php).

---


Summary
=======

<table>
    <thead>
    <tr>
        <th>Client</th>
        <th>User Mode</th>
        <th title="Dependencies">Deps.</th>
        <th>Language</th>
        <th title="Lines of Code">LOC</th>
        <th>License</th>
        <th>Capabilities</th>
        <th>Domain Authentication</th>
    </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://github.com/letsencrypt/letsencrypt">Official Let's Encrypt Client</a> (<a href="http://letsencrypt.readthedocs.org/en/latest">Docs</a>)</td>
            <td>Automatic / Interactive / Manual</td>
            <td>Many</td>
            <td>Python</td>
            <td>~8.600</td>
            <td>Apache 2.0</td>
            <td>Issue, Renew, Revoke, Server Config</td>
            <td>Webroot, Standalone, Manual</td>
        </tr>
        <tr>
            <td><a href="https://github.com/diafygi/acme-tiny">acme-tiny</a></td>
            <td>Automatic / Semi-Automatic</td>
            <td>None</td>
            <td>Python</td>
            <td>~200</td>
            <td>MIT</td>
            <td>Issue, Renew</td>
            <td>Webroot</td>
        </tr>
        <tr>
            <td><a href="https://gethttpsforfree.com/">gethttpsforfree<br>.com</a> (<a href="https://github.com/diafygi/gethttpsforfree">Source</a>)</td>
            <td>Semi-Manual</td>
            <td>None</td>
            <td>HTML/JS</td>
            <td>~1200</td>
            <td>MIT</td>
            <td>Issue, Renew</td>
            <td>Webroot</td>
        </tr>
        <tr>
            <td><a href="https://github.com/kuba/simp_le">simp_le</a></td>
            <td>Automatic / Semi-Automatic</td>
            <td>Some</td>
            <td>Python</td>
            <td>~800</td>
            <td>GPLv3</td>
            <td>Issue, Renew, Revoke</td>
            <td>Webroot</td>
        </tr>
        <tr>
            <td><a href="https://github.com/diafygi/letsencrypt-nosudo">letsencrypt-nosudo</a></td>
            <td>Manual (assisted)</td>
            <td>None</td>
            <td>Python</td>
            <td>~400</td>
            <td>AGPL</td>
            <td>Issue, Renew, Revoke</td>
            <td>Standalone</td>
        </tr>
        <tr>
            <td><a href="https://github.com/hlandau/acme">acmetool</a></td>
            <td>Automatic / Interactive</td>
            <td>None</td>
            <td>Go</td>
            <td>~6,000</td>
            <td>MIT</td>
            <td>Issue, Renew</td>
            <td>Webroot, Standalone</td>
        </tr>
        <tr>
            <td><a href="https://github.com/xenolf/lego">lego</a></td>
            <td>Automatic</td>
            <td>None</td>
            <td>Go</td>
            <td>~2,000</td>
            <td>MIT</td>
            <td>Issue, Renew, Revoke</td>
            <td>Standalone</td>
        </tr>
        <tr>
            <td><a href="https://github.com/lukas2511/letsencrypt.sh">letsencrypt.sh</a></td>
            <td>Automatic</td>
            <td>None</td>
            <td>Bash</td>
            <td>~600</td>
            <td>?</td>
            <td>Issue, Renew, Revoke</td>
            <td>Webroot</td>
        </tr>
        <tr>
            <td><a href="https://github.com/kelunik/acme-client">acme-client</a></td>
            <td>Semi-Automatic</td>
            <td>Some (incl. PHP 7)</td>
            <td>PHP</td>
            <td>~400</td>
            <td>MIT</td>
            <td>Issue, Renew, Revoke</td>
            <td>Webroot</td>
        </tr>
        <tr>
            <td><a href="https://github.com/analogic/lescript">lescript</a></td>
            <td>Semi-Automatic</td>
            <td>None</td>
            <td>PHP</td>
            <td>~450</td>
            <td>BSD</td>
            <td>Issue, Renew</td>
            <td>Webroot</td>
        </tr>
    </tbody>
</table>

<hr class="spaced">

If you have suggestions or feedback, please let me know via <a href="https://twitter.com/@metachris" target="_blank">@metachris</a>.
