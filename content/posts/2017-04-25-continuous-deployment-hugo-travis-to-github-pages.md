---
date: 2017-04-25
draft: false
title: "Continuous Deployment: Hugo + Travis CI → GitHub Pages"
twitterTitle: "Continuous Deployment: @GoHugoIO + @travisci → GitHub Pages"
description: "How to automate building and deployment of Hugo websites to GitHub Pages using Travis CI, triggered by pushing to the Git repository."
thumbnail: images/posts/hugo-travis/thumbnail.jpg
image: images/posts/hugo-travis/ogimage2.jpg
tags:
  - Various
hideTags: true

---
This post shows how to automate building and deployment of [Hugo](https://gohugo.io/) static websites to GitHub Pages using [Travis CI](https://travis-ci.org/). Builds are automatically triggered when pushing to the Git repository, and deployment when a build on the master branch succeeds.

<center><img src="/images/posts/hugo-travis/header-image.jpg" style="max-height: 120px;" alt="Logos: Hugo, Travis, GitHub" /></center>

[Hugo](https://gohugo.io/) is a static website generator written in Go, and only requires a single binary. The easiest way to run Hugo in the Travis CI container is by including the specific hugo binary with which to build the site as part of the repository (eg. in the directory `/binaries`). This way you don't need to download the Hugo release on each build job, which may take several minutes. You can get the latest binary from the [Hugo releases page](https://github.com/spf13/hugo/releases) (use the `hugo_<VERSION>_Linux-64bit.tar.gz` file and include only the `hugo` binary).

For syntax highlighting, you also need [Pygments](http://pygments.org/) installed. In the `.travis.yml` file this is done by specifiying the `python-pygments` package as [apt addon](https://docs.travis-ci.com/user/installing-dependencies/#Installing-Packages-with-the-APT-Addon).

### Configuring Travis CI

On the Travis CI homepage on your [profile page](https://travis-ci.org/profile) you need to enable the GitHub repository you want to build. 

Travis CI also needs write-access to the GitHub repository, to be able to update the `gh-pages` branch. For this we provide a GitHub token environment variable named `GITHUB_TOKEN` in this example. Environment variables can be specified on the Travis CI website in the repository settings (see the [Travis environment variables docs](https://docs.travis-ci.com/user/environment-variables/#Defining-Variables-in-Repository-Settings)). You can generate this token in your GitHub account settings under "[Personal access tokens
-> Generate new token](https://github.com/settings/tokens/new)" (ensure that the "repo" checkbox is enabled).

<hr class="spaced">

For a content layout [like here](https://github.com/Ghoust-game/website) (Hugo content in `/src/`, theme name `ghoust`, Hugo binary in `/binaries/hugo`), this is the complete `.travis.yml`:

{{< highlight yaml >}}
# Install the apt prerequisites
addons:
  apt:
    packages:
      - python-pygments

# Clean and don't fail
install:
  - rm -rf public || exit 0

# Build the website
script:
  - cd src
  - ../binaries/hugo --theme=ghoust

# Deploy to GitHub pages
deploy:
  provider: pages
  skip_cleanup: true
  local_dir: public
  github_token: $GITHUB_TOKEN # Set in travis-ci.org dashboard
  on:
    branch: master
{{< / highlight >}}

<hr class="spaced">

References:

* [GitHub Pages](https://pages.github.com/)
* [Travis CI Documentation: GitHub Pages Deployment](https://docs.travis-ci.com/user/deployment/pages/)
* [Travis environment variables docs](https://docs.travis-ci.com/user/environment-variables/#Defining-Variables-in-Repository-Settings)
* [Repostiory for a demo Hugo website](https://github.com/Ghoust-game/website)

<hr class="spaced">

<b>Update 2017-04-26</b>: Several people suggested to use [Netlify](https://www.netlify.com/) for hosting the pages instead of GitHub Pages. Netlify has great continuous deployment integration, free SSL certificates, custom redirects, form handling and more.

<hr class="spaced">

Let me know if you have any feedback and/or ideas via [@metachris](https://twitter.com/@metachris).
