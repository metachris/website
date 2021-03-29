---
boldLinks: true
date: 2017-02-01T00:00:00Z
description: This post explains how to use highlight.js for syntax highlighting in a  Vue.js application, allowing highlighting both on creation of an element as well as on updates to the source-code, using a simple v-highlightjs directive.
image: images/posts/vuejs-highlight.jpg
tags:
- WebDev
- Vue.js
thumbnail: images/posts/vuejs-highlight-thumb.jpg
title: Vue.js Syntax Highlighting with highlight.js
twitterTags:
- VueJS
- javascript
url: /2017/02/vuejs-syntax-highlighting-with-highlightjs/
---

Everyone loves a good syntax highlighting. This post explains how to use [highlight.js](https://highlightjs.org/)
for syntax highlighting in a [Vue.js](http://vuejs.org/) application. The method shown here allows syntax highlighting both on original creation of an element
as well as on updates to the source-code, using a simple `v-highlightjs` directive such as this:

{{< highlight html >}}
<pre v-highlightjs><code class="javascript"></code></pre>
{{< / highlight >}}

You can see a live example here: <a href="https://jsfiddle.net/metachris/1vz9oobc/" target="_blank">jsfiddle.net/metachris/1vz9oobc</a>.

To achieve this, we just need to install the `highlight.js` dependency and create a custom `highlightjs` directive. Let's dive straight in!

**Note:** The code from this post is now also published as npm package <b><a href="https://www.npmjs.com/package/vue-highlightjs" target="_blank">vue-highlightjs</a></b>, which you can easily use in your project.

<hr class="spaced" />

## Install the highlight.js dependency

The first step is to install `highlight.js` as a dependency with the `npm` node package manager:

{{< highlight shell >}}
$ npm install --save highlight.js
{{< / highlight >}}

<hr class="spaced" />

## Include the highlight.js CSS file in your HTML

To reference the highlight.js CSS style sheet from the HTML, just include a `<link rel="stylesheet"` tag which points to
 either a [downloaded](https://highlightjs.org/download/) `highlight.css` file or to their CDN URL:

{{< highlight html >}}
<!-- Downloaded and saved in /static/css/highlight.css -->
<link rel="stylesheet" href="/static/css/highlight.css">

<!-- Or if you want to use the stylesheet from the CDN -->
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/default.min.css">
{{< / highlight >}}

highlight.js comes with a number of different styles, which are defined by using a specific stylesheet for each style (we are using the default style here). For other available styles look into the highlight.js <a href="https://github.com/isagalaev/highlight.js/tree/master/src/styles" target="_blank">styles directory</a> (and don't forget to add ".min" before ".css").

<hr class="spaced" />

## A custom Vue.js directive: v-highlightjs

To use `highlight.js` from within Vue.js components, we are going to create a [custom Vue.js directive](https://vuejs.org/v2/guide/custom-directive.html)
called `highlightjs`. You can declare this directive directly in your `main.js` file:

{{< highlight js >}}
import Vue from 'vue'
import hljs from 'highlight.js'

...

Vue.directive('highlightjs', {
  deep: true,
  bind: function (el, binding) {
    // on first bind, highlight all targets
    let targets = el.querySelectorAll('code')
    targets.forEach((target) => {
      // if a value is directly assigned to the directive, use this
      // instead of the element content.
      if (binding.value) {
        target.textContent = binding.value
      }
      hljs.highlightBlock(target)
    })
  },
  componentUpdated: function (el, binding) {
    // after an update, re-fill the content and then highlight
    let targets = el.querySelectorAll('code')
    targets.forEach((target) => {
      if (binding.value) {
        target.textContent = binding.value
        hljs.highlightBlock(target)
      }
    })
  }
})
{{< / highlight >}}

(You can also use the npm package <a href="https://www.npmjs.com/package/vue-highlightjs" target="_blank">`vue-highlightjs`</a> instead of declaring the directive manually.)

<hr class="spaced" />

## Using v-highlightjs

To highlight code (for example JavaScript) which is either hardcoded in a template or stored in a variable (or getter) called `sourcecode`, we can use the `v-highlightjs` directive like this:

{{< highlight html >}}
<pre v-highlightjs><code class="javascript">{{ sourcecode }}</code></pre>
{{< / highlight >}}

#### Reacting to code updates

`highlight.js` replaces the content of the &lt;code&gt; block. If using the directive as shown above, updating the source-code after the initial highlighting does not work anymore. To be able to update the code and highlight it again after an update, pass the variable directly into the `v-highlightjs` directive like this:

{{< highlight html >}}
<pre v-highlightjs="sourcecode"><code class="javascript"></code></pre>
{{< / highlight >}}

<hr class="spaced" />

## Live Example

<script async src="//jsfiddle.net/metachris/1vz9oobc/embed/js,html,result/"></script>

<style type="text/css">
iframe {
	height: 400px;
}
</style>

<hr class="spaced" />

## References

* [highlight.js](https://highlightjs.org/)
* [Vue.js](http://vuejs.org/) / [Custom Directives](https://vuejs.org/v2/guide/custom-directive.html)
* Live demo: <a href="https://jsfiddle.net/metachris/1vz9oobc/" target="_blank">jsfiddle.net/metachris/1vz9oobc</a>
* <a href="https://www.npmjs.com/package/vue-highlightjs" target="_blank">npm package `vue-highlightjs`</a> -- you can use this package instead of manually declaring the `v-highlightjs` directive and importing `highlight.js`

<hr class="spaced" />

You can reach out to me via [@metachris](https://twitter.com/@metachris). Please let me know if you have any feedback or suggestions!
