+++
date = "2021-04-15"
title = "Starting a TypeScript Project in 2021"
images = ["/images/posts/typescript-2021.jpg"]
tags = ["TypeScript", "WebDev"]
keywords = ["TypeScript", "esbuild", "Node.js", "browser", "JavaScript", "ES6", "Project", "Setup", "Template", "Boilerplate"]
+++

This is a guide for starting a TypeScript project in 2021 with modern tooling.

* [TypeScript 4](https://www.typescriptlang.org/)
* Optionally [esbuild](https://esbuild.github.io/) to bundle for browsers (and Node.js)
* Linting with [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) ([tslint](https://palantir.github.io/tslint/) is deprecated)
* Testing with [Jest](https://jestjs.io/docs/getting-started) (and [ts-jest](https://www.npmjs.com/package/ts-jest))
* Publishing a package to npm
* Continuous integration ([GitHub Actions](https://docs.github.com/en/actions) / [GitLab CI](https://docs.gitlab.com/ee/ci/))
* Automatic API documentation with [TypeDoc](https://typedoc.org/guides/doccomments/)

<!--more-->

<div class="infobox1">

You can use the [example repository](https://github.com/metachris/typescript-boilerplate) (instead of the manual setup in this guide):

```bash
git clone https://github.com/metachris/typescript-boilerplate.git
```

</div>

---

# Contents

{{< TableOfContents >}}

---

## Basic project setup

The basic setup consists of four steps:

1. Create the project and source directories
1. Create a `package.json`
1. Get a [`.gitignore`](https://github.com/metachris/typescript-boilerplate/blob/master/.gitignore), [`tsconfig.json`](https://github.com/metachris/typescript-boilerplate/blob/master/tsconfig.json), [`.eslintrc.js`](https://github.com/metachris/typescript-boilerplate/blob/master/.eslintrc.js)
1. Install TypeScript & dependencies


Note: This guide uses `yarn`, but if you prefer `npm` it has similar commands.


```bash
# Create project folder
mkdir my-project
cd my-project

# Create source folder and files
mkdir src
touch src/main.ts src/main.test.ts src/cli.ts

# Create a package.json
yarn init

# Install TypeScript, linter and Jest
yarn add -D typescript @types/node ts-node
yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
yarn add -D jest ts-jest @types/jest

# Get a .gitignore
wget https://raw.githubusercontent.com/metachris/typescript-boilerplate/master/.gitignore

# Get a tsconfig.json with some defaults (adapt as needed)
wget https://raw.githubusercontent.com/metachris/typescript-boilerplate/master/tsconfig.json

# Alternatively you can create a fresh tsconfig.json (with extensive docstrings)
tsc --init

# Get a .eslintrc.js
wget https://raw.githubusercontent.com/metachris/typescript-boilerplate/master/.eslintrc.js

# Get a jest.config.json, for ts-jest to run the tests without a separate typescript compile step
wget https://raw.githubusercontent.com/metachris/typescript-boilerplate/master/jest.config.js

# Create a git repo and make the first commit
git init
git add .
git commit -am "initial commit"
```

<div class="infobox1">

Use `src/cli.ts` for code that's run from the command line. This way code from `main.ts` can be included without running the entrypoint code, and allows for easier cross-target building and code branches (eg. Node.js and browsers).

</div>

Add `scripts` to your `package.json`:

```json
{
    "scripts": {
        "cli": "ts-node src/cli.ts",
        "test": "jest",
        "lint": "eslint src/ --ext .js,.jsx,.ts,.tsx",
        "build": "tsc -p tsconfig.json",
        "clean": "rm -rf dist build",
        "ts-node": "ts-node"
    }
}
```

Now you can run `yarn cli`, `yarn test`, `yarn lint`, `yarn build` and `yarn ts-node <filename>`.

<div class="infobox1">

:bulb: In Visual Studio Code you can use the build and test tasks to start scripts with keyboard shortcuts. In the command palette "_Configure Default Build Task_" and "_Configure Default Test Task_" (see the [VS Code docs](https://code.visualstudio.com/docs/editor/tasks)).

</div>

---

## Tests with Jest

You can write [Jest tests](https://jestjs.io/docs/getting-started) [like this](https://github.com/metachris/typescript-boilerplate/blob/master/src/main.test.ts):

```typescript
import { greet } from './main'

test('the data is peanut butter', () => {
  expect(1).toBe(1)
});

test('greeting', () => {
  expect(greet('Foo')).toBe('Hello Foo')
});
```

Run the tests with `yarn test`, no separate compile step is necessary.

* See also the [Jest documentation](https://jestjs.io/docs/getting-started)
* Take a look at other modern test runners such as [ava](https://github.com/avajs/ava), [uvu](https://github.com/lukeed/uvu) and [tape](https://github.com/substack/tape)

---


## esbuild

[esbuild](https://esbuild.github.io/) is an extremely fast JavaScript bundler that
can also compile a [large subset of TypeScript code](https://esbuild.github.io/content-types/#typescript). You can use it to bundle both for Node.js
as well as for browsers. esbuild is still relatively young and under active / heavy development; see also [esbuild on GitHub](https://github.com/evanw/esbuild).

Why use `esbuild` in addition to `tsc`? The TypeScript compiler doesn't bundle well for browsers (developers usually resort to additional bundlers like webpack, parcel or rollup), and it's pretty slow.

**Install esbuild:**

```bash
yarn add -D esbuild
```


### Bundling for Node.js

Additionally to `tsc` (the TypeScript compiler), you can also bundle code with `esbuild` for Node.js like this:

```bash
# Compile and bundle
yarn esbuild src/cli.ts --bundle --platform=node --outfile=dist/esbuild/cli.js

# Same, but minify and sourcemaps
yarn esbuild src/cli.ts --bundle --platform=node --minify --sourcemap=external --outfile=dist/esbuild/cli.js

# Run the bundled output
node dist/esbuild/cli.js
```

Read more about the esbuild options in the [esbuild documentation](https://esbuild.github.io/getting-started/).

Notes:

* When building with esbuild, you can use the [`--watch` option](https://esbuild.github.io/api/#watch) to rebuild whenever a file changed
* `esbuild` does currently not support building `.d.ts` declaration files (see also [this issue](https://github.com/evanw/esbuild/issues/95)). You need to build those with `tsc`.
* The example repository includes the `esbuild` commands as [scripts in package.json](https://github.com/metachris/typescript-boilerplate/blob/master/package.json)


### Building a browser-compatible module

You can generate browser compatible modules with bundlers such as [esbuild](https://esbuild.github.io/), [webpack](https://webpack.js.org/), [parcel](https://parceljs.org/) and others.

This guide uses `esbuild`:

```bash
# Bundle for browsers
yarn esbuild src/browser.ts --bundle --outfile=dist/esbuild/browser.js

# Same, but with minification and sourcemaps
yarn esbuild src/browser.ts --bundle --minify --sourcemap=external --outfile=dist/esbuild/browser.js
```

The code in `browser.ts` will be executed once loaded in the browser.

<div class="infobox1">

esbuild has a `--global-name=xyz` flag, to store the exports from the entry point in a global variable. See also the [esbuild "Global name" docs](https://esbuild.github.io/api/#global-name).

</div>

###### Accessing DOM properties (`window`, `document`)

You can access [`window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) and [`document`](https://developer.mozilla.org/en-US/docs/Web/API/Document) in your code when loaded in a browser. You might want to use this to attach parts of your code to the `window` object.

In `tsconfig.json`, add `DOM` to the [list of libraries](https://www.typescriptlang.org/tsconfig#lib):

```js
"lib": ["ES6", "DOM"]
```

Create `src/browser.ts` as entrypoint for browser builds. There you can attach custom properties to `window` like this:

```js
// Import a function
import { greet } from './main'

// Make it accessible on the window object
(window as any).greet = greet
```

Now bundle with `esbuild`:


```bash
yarn esbuild src/browser.ts --bundle --outfile=dist/esbuild/browser.js
```

Test the result with a simple website like this: [`browser-test.html`](https://github.com/metachris/typescript-boilerplate/blob/master/browser-test.html)

<div class="infobox1">

* The example repository includes the `esbuild` commands as [scripts in package.json](https://github.com/metachris/typescript-boilerplate/blob/master/package.json)
* If you prefer to use [webpack](https://webpack.js.org/), take a look at this [webpack.config.js](https://github.com/metachris/micropython-ctl/blob/master/webpack.config.js) for inspiration
* Rather than casting `window` to `any`, you might want to properly extend the `Window` interface ([see here](https://stackoverflow.com/a/43513740/5433572))

</div>

---

## Publishing to npm

Let's publish the latest code to npm, for use with both Node.js and the browser.

<div class="infobox1">

npm and yarn ignore the files from `.gitignore`. Since `dist` is in there, we need to overwrite the npm ignore settings
using a custom `.npmignore`:

```
wget https://raw.githubusercontent.com/metachris/micropython-ctl/master/.npmignore
```

</div>

Create a build and run `yarn publish`:

```bash
# Build with tsc and esbuild
yarn build-all

# Update the version and publish to npm
yarn publish
```

`build-all` builds the project with both `tsc` to get the type definiton files, and `esbuild` to build for Node.js and browsers.

After running [`yarn publish`](https://classic.yarnpkg.com/en/docs/cli/publish/) the project/new version is live on npm. :tada:

For example the npm package for this boilerplate project:

* https://www.npmjs.com/package/typescript-boilerplate-2021

---

### Using from Node.js

You can install the module with npm:

```bash
npm install typescript-boilerplate-2021

# or with yarn
yarn add typescript-boilerplate-2021
```

Using the module in custom code:

```ts
import { greet } from 'typescript-boilerplate-2021'

greet("World")
```

---

### Using from the browser

There are several CDNs which automatically deliver npm projects, like [jsDelivr](https://www.jsdelivr.com/), [cdnjs](https://cdnjs.com/), [unpkg.com](https://unpkg.com/) or [skypack](https://www.skypack.dev/).

Without any manual intervention, you can access packages on jsDelivr like this:

* https://cdn.jsdelivr.net/npm/typescript-boilerplate-2021
* https://cdn.jsdelivr.net/npm/typescript-boilerplate-2021/
* https://cdn.jsdelivr.net/npm/typescript-boilerplate-2021@0.3.0
* https://cdn.jsdelivr.net/npm/typescript-boilerplate-2021@0.3.0/package.json
* https://cdn.jsdelivr.net/npm/typescript-boilerplate-2021@0.3.0/dist/esbuild/browser.js

You can reference the bundle from HTML like this:

```html
<script src="https://cdn.jsdelivr.net/npm/typescript-boilerplate-2021@0.3.0"></script>
```

Test the result with a simple website like this: [`browser-test.html`](https://github.com/metachris/typescript-boilerplate/blob/master/browser-test.html)

---


## Continuous integration

You probably want to run the tests and linter on every code push. Additionaly you might want to build and deploy the docs from CI too.

### GitHub Actions

See [GitHub Actions docs](https://docs.github.com/en/actions). Create a file `.github/workflows/lint-and-test.yml`:

```yml
name: Lint and test

on: [push, pull_request]

jobs:
  lint_and_test:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        nodejs: [10, 12, 14]

    steps:
    - uses: actions/checkout@v2

    # https://github.com/actions/setup-node
    - uses: actions/setup-node@v2-beta
      with:
        node-version: ${{ matrix.nodejs }}

    - run: yarn install
    - run: yarn test
    - run: yarn lint
    - run: yarn build-all
```

<br>

**Testing in multiple operating systems**

If you want to verify your build / package on various operating systems (Windows, Linux, macOS), you can setup a matrix for a job like this:

```yml
jobs:
  default-version:
    runs-on: ${{ matrix.os }}
    strategy:
      fail-fast: false
      matrix:
        os: [macos-latest, windows-latest, ubuntu-latest]

    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v2-beta
      with:
        node-version: 12
    ...

```

### GitLab CI

See [GitLab CI docs](https://docs.gitlab.com/ee/ci/). Create a file `.gitlab-ci.yml`:

```yml
image: node:12

cache:
  paths:
    - node_modules/

stages:
  - test

lint-and-test:
  stage: test
  script:
    - yarn install
    - yarn test
    - yarn lint
    - yarn build-all
```

---

## API documentation with TypeDoc

You can auto-generate API documentation from the TypeScript source files using [TypeDoc](https://typedoc.org/guides/doccomments/), which builds on JSDoc syntax. The generated documentation can be published to GitHub / GitLab pages through the CI.

* Install [TypeDoc](https://typedoc.org/guides/doccomments/): `yarn add -D typedoc`
* Add `docs` script to `package.json`: `"typedoc --entryPoints src/main.ts"`

Documentation strings look like this:

```ts
/**
 * This comment _supports_ [Markdown](https://marked.js.org/)
 */
export class DocumentMe {}
```

Generate the documentation with `yarn docs`. The resulting HTML is saved in `docs/`.

You can use CI to automatically publish the docs to GitHub or GitLab pages:

* [GitHub pages](https://pages.github.com/): [`.github/workflows/deploy-gh-pages.yml`](https://github.com/metachris/typescript-boilerplate/blob/master/.github/workflows/deploy-gh-pages.yml)
* [GitLab pages](https://docs.gitlab.com/ee/user/project/pages/): [`.gitlab-ci.yml`](https://github.com/metachris/typescript-boilerplate/blob/master/.gitlab-ci.yml)

For example this the documentation for the example project: https://metachris.github.io/typescript-boilerplate/

---

## Summary

This post covered a full TypeScript project setup, with tests, esbuild, bundling for Node.js and browsers,
publishing on npm, continuous integration and automatic documentation.


<div class="infobox1">

You can use the [boilerplate repository](https://github.com/metachris/typescript-boilerplate) like this:

```
git clone https://github.com/metachris/typescript-boilerplate.git
cd typescript-boilerplate

yarn install
yarn test
yarn lint
yarn build-all
```

</div>

---

## References

* [Example repository](https://github.com/metachris/typescript-boilerplate)
* [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
* [tsconfig docs](https://www.typescriptlang.org/tsconfig)
* [esbuild docs](https://esbuild.github.io/)
* [typescript-eslint docs](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md)
* [Jest docs](https://jestjs.io/docs/getting-started)
* [GitHub Actions](https://docs.github.com/en/actions), [GitLab CI](https://docs.gitlab.com/ee/ci/)
* Alternative tools and honorable mentions:
  * Test runners: [ava](https://github.com/avajs/ava), [uvu](https://github.com/lukeed/uvu), [tape](https://github.com/substack/tape), [Mocha](https://mochajs.org/)
  * Bundlers: [webpack](https://webpack.js.org/), [Parcel](https://parceljs.org/), [rollup.js](https://www.rollupjs.org/), [snowpack](https://www.snowpack.dev/)

---

## Notes

* You might be interested in using [Deno](https://deno.land/) instead of Node.js. Deno is a modern V8 runtime with a lot of great features, created by [Ryan Dahl, author of Node.js](https://www.youtube.com/watch?v=M3BM9TB-8yA). It's still somewhat new and experimental though.
* To bootstrap a full web project, you might want to use **hot module replacement** (HMR). This is outside the scope of this post. In the meantime, see the [webpack docs](https://webpack.js.org/guides/hot-module-replacement/) and [parcel docs](https://parceljs.org/hmr.html) about HMR.
* If you want to target both Node.js and browsers, be aware that several APIs are different, most notably `fetch`, `WebSocket`, `Buffer`.
* See also https://github.com/formium/tsdx for a more fully featured TypeScript project boilerplate


---

Reach out with feedback and ideas:

* [twitter.com/metachris](https://twitter.com/metachris)
* [github.com/metachris/typescript-boilerplate/issues](https://github.com/metachris/typescript-boilerplate/issues)
* Leave a comment below :point_down:

Join the [discussion of this post on Hacker News](https://news.ycombinator.com/item?id=26888455).
