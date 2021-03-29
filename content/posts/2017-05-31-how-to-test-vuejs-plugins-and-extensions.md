---
date: 2017-05-31
draft: false
title: "How to test Vue.js plugins and extensions"
thumbnail: images/posts/thumb-vue-tests.png
image: images/posts/og-vue-tests.png

series: ["JavaScript"]

tags: ["WebDev", "Vue.js"]

twitterTags:
  - VueJS
  - javascript

# https://www.reddit.com/r/vuejs/comments/6egvp8/how_to_test_vuejs_plugins_and_extensions/
---

This post shows how to write tests for [Vue.js](https://vuejs.org/) plugins and extensions by creating Vue.js instances, changing state and validating transformation and expected errors, to continuously verify that everything still works after updates, refactorings and merging contributions.

<center><img src="/images/posts/og-vue-tests.png" style="max-height:260px;" /></center>

While building [python-boilerplate.com](https://www.python-boilerplate.com), I recently created a Vue.js plugin for syntax highlighting ([vue-highlightjs](https://github.com/metachris/vue-highlightjs/)), and wanted to add tests. For this I spent some time researching and testing how to properly test Vue.js plugins and extensions, and I wanted to summarize and share what I've learnt.

Some general thoughts to start off with:

* Start early with testing!
* **Create real [Vue.js instances](https://vuejs.org/v2/guide/instance.html) and test with them.**
* You can get a lot of ideas and best practices from the [original Vue.js tests](https://github.com/vuejs/vue/tree/dev/test/unit/features).
* [Jest](http://facebook.github.io/jest/) is a really good testing framework (built by Facebook). The examples in this post use Jest, but you can replace this with any other testing framework of your liking (eg. Mocha/Chai, Karma, etc.).
* Use a linter to automatically detect common code style and syntax problems.
* Beware that some common JavaScript parsers and utilities such as UglifyJS (used by several Vue.js templates) do not yet support ES6 syntax, and building projects which include modules with ES6 may fail. Therefore it is recommended to distribute plugin with ES5 compatible syntax. You have two options to deal with this:
  * Use ES5 syntax, and automatically check vailidity with an appropriate linter (eg. [eslint-config-es5](https://www.npmjs.com/package/eslint-config-es5)).
  * Use ES6 syntax and transpile it to ES5 in a build step, using a tool like [Babel](https://babeljs.io/) (see also [babel-eslint](https://github.com/babel/babel-eslint)).


<hr class="spaced">

Before we start, here is a couple of good tests as reference:

* [Vue.js internal feature tests](https://github.com/vuejs/vue/tree/dev/test/unit/features) - Contain a lot of interesting, high-quality tests of directives, components and everything else (eg. [directives/show.spec.js](https://github.com/vuejs/vue/blob/dev/test/unit/features/directives/show.spec.js)).
* [vue-highlightjs](https://github.com/metachris/vue-highlightjs/blob/master/test/index.test.js) - A custom directive for syntax highlighting.
* [vuetable-2](https://github.com/ratiw/vuetable-2/blob/master/test/unit/specs/Vuetable.spec.js) - Data driven tables, with automatic API requests and more.

<hr class="spaced">

## Installing the dependencies

First of all, install Vue.js and Jest as dev-dependencies:

``` shell
$ npm install --save-dev jest
$ npm install --save-dev vue
```

Next step is adding a `test` script to the `package.json`:

``` js
  ...
  "scripts": {
    "test": "jest"
  },
  ...
```

The command `jest` automatically discovers and executes all files ending with `.test.js`. You can now run the tests with `npm test`.

To setup automatic linting, install and setup `eslint` or another linter and add a `lint` script to `package.json`. See also `ecmaVersion` in the [eslint parser options](http://eslint.org/docs/user-guide/configuring#specifying-parser-options), [this ES5 `.eslintrc`](https://github.com/metachris/vue-highlightjs/blob/master/.eslintrc.js) or [babel-eslint](https://github.com/babel/babel-eslint) for further information.

<hr class="spaced">

## Executing the tests

You can run the tests with `npm test`. This is what the output looks like for the tests of [vue-highlightjs](https://github.com/metachris/vue-highlightjs/blob/master/test/index.test.js):

``` shell
$ npm test

> vue-highlightjs@1.3.1 test /Users/chris/Projects/chris/vue-highlightjs
> jest

 PASS  test/index.test.js
  ✓ highlighting pre-defined code (43ms)
  highlighting dynamic code
    ✓ should highlight initial code (5ms)
    ✓ should highlight code when updating variable (7ms)
    ✓ should updated highlighted block when updating code without any content (4ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        0.812s
Ran all test suites.
```

<hr class="spaced">

## Writing the tests

<h3 style="margin-top:24px;">Importing Vue.js</h3>

Start with importing the compiler-included build (`vue/dist/vue` instead of only `vue`):

{{< highlight javascript >}}
var Vue = require('vue/dist/vue')
{{< / highlight >}}

If you use only `'vue'` it's the build without a template compiler, and you may receive warnings and errors such as this:

{{< highlight javascript >}}
[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
{{< / highlight >}}

<h3 style="margin-top:24px;">Constructing Vue instances</h3>

This is an easy way to create Vue.js instances for tests based on custom templates:

{{< highlight javascript >}}
const vm = new Vue({
    template: '<div><span v-show="foo">hello</span></div>',
    data: { foo: true }
}).$mount()
{{< / highlight >}}

Creating a Vue instance from a custom component is also easy, as per example from the official [unit-testing documentation](https://vuejs.org/v2/guide/unit-testing.html):

{{< highlight javascript >}}
import MyComponent from 'path/to/MyComponent.vue'
const vm = new Vue(MyComponent).$mount()
{{< / highlight >}}

<h3 style="margin-top:24px;">Checking HTML content and transformations</h3>

When you want to check for a certain transformation of the content, you can access the current Vue.js instance and it's DOM with [various methods of the Vue.js instance](https://vuejs.org/v2/api/#Instance-Properties), such as [`vm.$el`](https://vuejs.org/v2/api/#vm-el) or [`vm.$children`](https://vuejs.org/v2/api/#vm-children):

{{< highlight javascript >}}
// vm.$el.firstChild to get the first child
expect(vm.$el.firstChild.style.display).toBe('')

// vm.$el.innerHTML to get the complete HTML content
expect(vm.$el.innerHTML).toEqual(expect.stringContaining('hello'));
{{< / highlight >}}

See also the [Jest expect docs](http://facebook.github.io/jest/docs/en/expect.html#content) for more information about the `expect` syntax.

<h3 style="margin-top:24px;">DOM assertions resulting from a Vue.js state change</h3>

Vue.js performs DOM updates asynchronously, assertions on DOM updates resulting from state change will have to be made in a [`Vue.nextTick`](https://vuejs.org/v2/api/#Vue-nextTick) callback:

{{< highlight javascript >}}
const vm = new Vue(MyComponent).$mount()
vm.message = 'foo'

// wait a "tick" after state change before asserting DOM updates
Vue.nextTick(() => {
    expect(vm.$el.textContent).toBe('foo')
})
{{< / highlight >}}

<h3 style="margin-top:24px;">Full example testing a custom directive</h3>

This is a full example of how you might write one test for a custom directive (assuming the module code
is in `/lib/` and the tests in `/test/`):

{{< highlight javascript >}}
const Vue = require('vue/dist/vue');
const VueCustomDirective = require('../lib');

Vue.use(VueCustomDirective);

test('update content after changing state', () => {
  const template = `
    <div>
      <span v-customdirective="variable"></span>
    </div>`;

  const vm = new Vue({
    template,
    data: { variable: 123 }
  }).$mount();

  // Change state and wait for one tick until checking
  vm.variable = '567';
  Vue.nextTick(function () {
    expect(vm.$el.innerHTML).toEqual(expect.stringContaining('567'));
  });
})

{{< / highlight >}}

<hr class="spaced">

That's it.

References:

* [Vue.js instance properties documentation](https://vuejs.org/v2/api/#Instance-Properties)
* [Vue.js unittesting docs](https://vuejs.org/v2/guide/unit-testing.html)
* [Vue.js internal feature tests](https://github.com/vuejs/vue/tree/dev/test/unit/features)
  * [directives/show.spec.js](https://github.com/vuejs/vue/blob/dev/test/unit/features/directives/show.spec.js)
  * [directives/for.spec.js](https://github.com/vuejs/vue/blob/dev/test/unit/features/directives/for.spec.js)
  * [directives/html.spec.js](https://github.com/vuejs/vue/blob/dev/test/unit/features/directives/html.spec.js)
  * [filter/filter.spec.js](https://github.com/vuejs/vue/blob/dev/test/unit/features/filter/filter.spec.js)
* [vue-highlightjs tests](https://github.com/metachris/vue-highlightjs/blob/master/test/index.test.js)
* [vuetable-2 tests](https://github.com/ratiw/vuetable-2/blob/master/test/unit/specs/Vuetable.spec.js)
* [Jest documentation](http://facebook.github.io/jest/)

<hr class="spaced">

Let me know via <a href="https://twitter.com/@metachris" target="_blank">@metachris</a> if you have feedback, questions or feel there is anything missing.

<hr class="spaced">
