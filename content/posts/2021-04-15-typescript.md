+++
date = "2021-04-15"
title = "Starting a TypeScript Project in 2021"
images = ["/images/posts/typescript-2021.jpg"]
tags = ["TypeScript", "WebDev"]
keywords = ["TypeScript", "Node.js", "Project", "Setup", "Template", "Boilerplate"]
+++

This is a guide for starting a TypeScript project in 2021 with modern tooling.

* [TypeScript](https://www.typescriptlang.org/) 4
* Optionally [esbuild](https://esbuild.github.io/) - to bundle for browsers and Node.js
* Linting with [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) ([tslint](https://palantir.github.io/tslint/) is deprecated)
* Testing with [Jest](https://jestjs.io/docs/getting-started) (and [ts-jest](https://www.npmjs.com/package/ts-jest))
* Publishing to npm
* Continuous integration ([GitHub Actions](https://docs.github.com/en/actions) / [GitLab CI](https://docs.gitlab.com/ee/ci/))
* Automatic API documentation with [TypeDoc](https://typedoc.org/guides/doccomments/)

<!--more-->

<div class="infobox1">

Take a look at the [example repository](https://github.com/metachris/typescript-boilerplate). You can clone it like this:

```
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


Note: This guide uses `yarn`, but the same commands work with `npm`.


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
        "lint": "tslint -c tslint.json 'src/**/*.ts'",
        "build": "tsc -p tsconfig.json",
        "clean": "rm -rf dist build",
        "ts-node": "ts-node"
    }
}
```

Now you can run `yarn run`, `yarn lint`, `yarn test`, `yarn build` and `yarn ts-node <filename>`.

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

See also the [Jest documentation](https://jestjs.io/docs/getting-started).

---


## esbuild

[esbuild](https://esbuild.github.io/) is an extremely fast JavaScript bundler that
can also compile a [large subset of TypeScript code](https://esbuild.github.io/content-types/#typescript). You can use it to bundle both for Node.js
as well as for browsers.

esbuild is still relatively young and under active / heavy development - see also [esbuild on GitHub](https://github.com/evanw/esbuild).

```bash
# Install esbuild
yarn add -D esbuild
```

---

### Bundling for Node.js

You can bundle code with `esbuild` for Node.js like this:

```bash
# Compile and bundle
./node_modules/.bin/esbuild src/cli.ts --bundle --platform=node --outfile=dist/cli.js

# Same, but minify and sourcemaps
./node_modules/.bin/esbuild src/cli.ts --bundle --platform=node --minify --sourcemap=external --outfile=dist/cli.js

# Run the bundled output
node dist/cli.js
```

Note:

* `esbuild` does currently not support build the `.d.ts` declaration files (see also [this issue](https://github.com/evanw/esbuild/issues/95)).
* The example repository includes the `esbuild` commands as [scripts in package.json](https://github.com/metachris/typescript-boilerplate/blob/master/package.json)

Read more about the esbuild options in the [esbuild documentation](https://esbuild.github.io/getting-started/).

---

### Building a browser-compatible module

You can generate a browser compatible module with esbuild, webpack, parcel or other bundlers. This guide uses [esbuild](https://esbuild.github.io/):

```bash
# Bundle for browsers
./node_modules/.bin/esbuild src/browser.ts --bundle --outfile=dist/browser.js

# Same, but with minification and sourcemaps
./node_modules/.bin/esbuild src/browser.ts --bundle --minify --sourcemap=external --outfile=dist/browser.js
```

###### Accessing DOM properties: `window`, `document`

You can access `window` or `document` in your code when loaded in a browser. You might want to use this to attach parts of your code to the `window` object.

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
./node_modules/.bin/esbuild src/browser.ts --bundle --outfile=dist/browser.js
```

Test the result with a simple website like this: [`browser-test.html`](https://github.com/metachris/typescript-boilerplate/blob/master/browser-test.html)

<div class="infobox1">

* The example repository includes the `esbuild` commands as [scripts in package.json](https://github.com/metachris/typescript-boilerplate/blob/master/package.json)
* If you prefer to use [webpack](https://webpack.js.org/), take a look at this [webpack.config.js](https://github.com/metachris/micropython-ctl/blob/master/webpack.config.js) for inspiration.

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
# Cleanup first
yarn clean

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

There are several CDNs which automatically deliver npm projects, like [jsDelivr](https://www.jsdelivr.com/) or [cdnjs](https://cdnjs.com/).
Without any manual intervention, you can access packages like this:

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


## Continuous integration: GitHub Actions, GitLab CI

You probably want to run the tests and linter on every code push.

**[GitHub Actions](https://docs.github.com/en/actions)**: `.github/workflows/lint-and-test.yml`:

```yml
name: Lint and test

on: [push]

jobs:
  lint_and_test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        nodejs: [10, 12, 14]

    steps:
    - uses: actions/checkout@v2

    # https://github.com/actions/setup-node
    - uses: actions/setup-node@v2-beta
      with:
        node-version: ${{ matrix.nodejs }}

    - run: yarn install
    - run: yarn lint
    - run: yarn test
    - run: yarn build
```

**[GitLab CI](https://docs.gitlab.com/ee/ci/)**: `.gitlab-ci.yml`:

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
    - yarn build
    - yarn test
    - yarn lint
```

---

## API documentation with TypeDoc

You can auto-generate API documentation from the TyoeScript source files using [TypeDoc](https://typedoc.org/guides/doccomments/). The generated documentation can be published to GitHub / GitLab pages through the CI:

* Install [TypeDoc](https://typedoc.org/guides/doccomments/): `yarn add -D typedoc`
* Add `docs` script to `package.json`: `"typedoc --entryPoints src/main.ts"`

Documentation looks like this:

```ts
/**
 * This comment _supports_ [Markdown](https://marked.js.org/)
 */
export class DocumentMe {}
```

Generate the documentation with `yarn docs`. The resulting HTML is saved in `docs/`.

You can use CI to automatically publish the docs to GitHub or GitLab pages:

* [GitHub pages](https://pages.github.com/): Add [`.github/workflows/deploy-gh-pages.yml`](https://github.com/metachris/typescript-boilerplate/blob/master/.github/workflows/deploy-gh-pages.yml) and enable pages in GitHub repo settings
* [GitLab pages](https://docs.gitlab.com/ee/user/project/pages/): add a `pages` task in [`.gitlab-ci.yml`](https://github.com/metachris/typescript-boilerplate/blob/master/.gitlab-ci.yml#L19:L30)

For example this the documentation for the example project: https://metachris.github.io/typescript-boilerplate/

---

## Summary

This post covered a full TypeScript project setup, with tests, esbuild, bundling for Node.js and browsers,
publishing on npm, continuous integration and automatic documentation.


<div class="infobox1">

You can clone the [boilerplate repository](https://github.com/metachris/typescript-boilerplate) like this:

```
git clone https://github.com/metachris/typescript-boilerplate.git
```

</div>

I hope this guide is helpful. Please leave your comments below.

---

## References

* [Example repository](https://github.com/metachris/typescript-boilerplate)
* [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
* [tsconfig docs](https://www.typescriptlang.org/tsconfig)
* [esbuild docs](https://esbuild.github.io/)
* [typescript-eslint docs](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md)
* [Jest docs](https://jestjs.io/docs/getting-started)
* [GitHub Actions](https://docs.github.com/en/actions), [GitLab CI](https://docs.gitlab.com/ee/ci/)

## Notes

* You might be interested in using [Deno](https://deno.land/) instead of Node.js. Deno is a modern V8 runtime with a lot of great features, created by [Ryan Dahl, author of Node.js](https://www.youtube.com/watch?v=M3BM9TB-8yA). It's still somewhat new and experimental though.
* To bootstrap a full web project, you might want to use **hot module replacement** (HMR). This is outside the scope of this post. In the meantime, see the [webpack docs](https://webpack.js.org/guides/hot-module-replacement/) and [parcel docs](https://parceljs.org/hmr.html) about HMR.
* If you want to target both Node.js and browsers, be aware that several APIs are different, most notably `fetch`, `WebSocket`, `Buffer`.


---

Reach out with feedback and ideas:

* [twitter.com/metachris](https://twitter.com/metachris)
* [github.com/metachris/typescript-boilerplate/issues](https://github.com/metachris/typescript-boilerplate/issues)
* Leave a comment below :point_down:
