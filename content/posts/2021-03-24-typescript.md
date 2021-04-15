+++
date = "2021-03-24"
title = "Starting a TypeScript Project in 2021"
images = ["/images/posts/typescript-nodejs.jpg"]
tags = ["TypeScript", "webdev"]
keywords = ["TypeScript", "Node.js", "Project", "Setup", "Template", "Boilerplate"]
url = "/2021/03/bootstrapping-a-typescript-node.js-project/"
+++

This is a guide for starting a TypeScript project in 2021 using modern tooling:

* TypeScript 4
* Optionally using [esbuild](https://esbuild.github.io/)
* Linting with [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) ([tslint](https://palantir.github.io/tslint/) is deprecated)
* Testing with [Jest](https://jestjs.io/docs/getting-started) (and [ts-jest](https://www.npmjs.com/package/ts-jest))
* Continuous integration ([GitHub Actions](https://docs.github.com/en/actions) / [GitLab CI](https://docs.gitlab.com/ee/ci/))
* Automatic API documentation with [TypeDoc](https://typedoc.org/guides/doccomments/)
* Building for Node.js, and browser-compatible modules (using [esbuild](https://esbuild.github.io/) or [webpack](https://webpack.js.org/))

<div class="infobox1">

You can clone the [example repository](https://github.com/metachris/typescript-nodejs-boilerplate), or follow the manual steps outlined in this post.

```
git clone https://github.com/metachris/typescript-nodejs-boilerplate.git
```

</div>

Notes:

* You might be interested in using [Deno](https://deno.land/) instead of Node.js. Deno is a more modern V8 runtime with a lot of great features, created by [Ryan Dahl, author of Node.js](https://www.youtube.com/watch?v=M3BM9TB-8yA).
* To bootstrap a full web project, you might want to use **hot module replacement** (HMR). This is outside the scope of this post. In the meantime, see the [webpack docs](https://webpack.js.org/guides/hot-module-replacement/) and [parcel docs](https://parceljs.org/hmr.html) about HMR.
* If you want to target both Node.js and browsers, be aware that several APIs are different, most notably `fetch`, `WebSocket`, `Buffer`.

---

# Steps

Project setup:

1. Create the project and source directories
1. Create a `package.json`
1. Get a [`.gitignore`](https://github.com/metachris/typescript-nodejs-boilerplate/blob/master/.gitignore), [`tsconfig.json`](https://github.com/metachris/typescript-nodejs-boilerplate/blob/master/tsconfig.json), [`.eslintrc.js`](https://github.com/metachris/typescript-nodejs-boilerplate/blob/master/.eslintrc.js)
1. Install TypeScript & dependencies
1. Integrate tests with Jest
1. Setup CI tasks (GitHub Actions, Gitlab CI)

Optional:

1. API documentation with [TypeDoc](https://typedoc.org/guides/doccomments/)
1. Using [esbuild](https://esbuild.github.io/) to compile and bundle
1. Building a browser-compatible module for websites

---

# Basic project setup

Create the directories and install the primary dependencies. This guide uses `yarn`, but you
can also substitute it with `npm` if you prefer.


```bash
# Create project folder
mkdir my-project
cd my-project

# Create source folder and files
mkdir src
touch src/main.ts src/lib.ts src/lib.test.ts

# Create a package.json
yarn init

# Install TypeScript, linter and Jest
yarn add -D typescript @types/node ts-node
yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
yarn add -D jest ts-jest @types/jest

# Get a .gitignore
wget https://raw.githubusercontent.com/metachris/typescript-nodejs-boilerplate/master/.gitignore

# Get a tsconfig.json with some defaults (adapt as needed)
wget https://raw.githubusercontent.com/metachris/typescript-nodejs-boilerplate/master/tsconfig.json

# Alternatively you can create a fresh tsconfig.json (with extensive docstrings)
tsc --init

# Get a .eslintrc.js
wget https://raw.githubusercontent.com/metachris/typescript-nodejs-boilerplate/master/.eslintrc.js

# Get a jest.config.json, for ts-jest to run the tests without a separate typescript compile step
wget https://raw.githubusercontent.com/metachris/typescript-nodejs-boilerplate/master/jest.config.js

# Create a git repo and make the first commit
git init
git commit -am "initial commit"
```

<div class="infobox1">

I recommend to use `src/main.ts` just as entrypoint, and put the real code into other files (eg. `src/lib.ts`). This
makes testing easier because the code can be included without running the entrypoint code, and allows for easier cross-target building and code branches (eg. Node.js and web).

</div>

Add `scripts` to your `package.json`:

```json
{
    "scripts": {
        "start": "ts-node src/main.ts",
        "test": "jest",
        "lint": "tslint -c tslint.json 'src/**/*.ts' 'test/**/*.ts'",
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

# Tests with Jest

You can write [Jest tests](https://jestjs.io/docs/getting-started) [like this](https://github.com/metachris/typescript-nodejs-boilerplate/blob/master/src/main.test.ts):

```typescript
import { greet } from './lib'

test('the data is peanut butter', () => {
  expect(1).toBe(1)
});

test('greeting', () => {
  expect(greet('Foo')).toBe('Hello Foo')
});
```

Run the tests with `yarn test`. No separate compile step is necessary.

See also:

* [Jest documentation](https://jestjs.io/docs/getting-started)

---

# Continuous integration: GitHub Actions / GitLab CI

You probably want to run the tests and linter on every code push.

**GitHub Actions**: `.github/workflows/lint-and-test.yml`:

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

**GitLab CI**: `.gitlab-ci.yml`:

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

# API documentation with TypeDoc

You can auto-generate API documentation from the TyoeScript source files using [TypeDoc](https://typedoc.org/guides/doccomments/). The generated documentation can be published to GitHub / GitLab pages through the CI:

* Install [TypeDoc](https://typedoc.org/guides/doccomments/): `yarn add -D typedoc`
* Add `docs` script to `package.json`: `"docs": "typedoc --entryPoints src/lib.ts"`
* You can now generate the documentation with `yarn docs`. The resulting HTML is saved in `docs/`.
* Publish to pages through CI:
  * [GitHub pages](https://pages.github.com/): Add [`.github/workflows/deploy-gh-pages.yml`](https://github.com/metachris/typescript-nodejs-boilerplate/blob/master/.github/workflows/deploy-gh-pages.yml) and enable pages in GitHub repo settings
  * [GitLab pages](https://docs.gitlab.com/ee/user/project/pages/): add a deploy task in [`.gitlab-ci.yml`](https://github.com/metachris/typescript-nodejs-boilerplate/blob/master/.gitlab-ci.yml#L19:L30)


---

# esbuild

[esbuild](https://esbuild.github.io/) is an extremely fast JavaScript bundler that
can also compile a [large subset of TypeScript code](https://esbuild.github.io/content-types/#typescript). It's typically used as a webpack alternative, although it can also be used for many Node.js projects.

Note that esbuild is still young and under active development (see [esbuild on GitHub](https://github.com/evanw/esbuild)).

Install esbuild, compile and bundle:

```bash
# Install esbuild
yarn add -D esbuild

# Compile and bundle
./node_modules/.bin/esbuild src/main.ts --bundle --platform=node --outfile=dist/out.js

# Same, but with minification and sourcemaps
./node_modules/.bin/esbuild src/main.ts --bundle --platform=node --minify --sourcemap=external --outfile=dist/out.js

# Run the bundled output
node dist/out.js
```

Further reading:

* [esbuild documentation](https://esbuild.github.io/)

---

# Building a browser-compatible module

If your code is meant to be used both by Node.js and websites in browsers, you can also generate a browser compatible module with esbuild, webpack or other bundlers.

Using `esbuild`:

```bash
# Bundle browser module
./node_modules/.bin/esbuild src/main.ts --bundle --outfile=dist/browser.js

# Same, but with minification and sourcemaps
./node_modules/.bin/esbuild src/main.ts --bundle --minify --sourcemap=external --outfile=dist/browser.js
```

#### Accessing DOM properties (`window`, `document`)

In `tsconfig.json`, add `DOM` to the [list of libraries](https://www.typescriptlang.org/tsconfig#lib):

```js
"lib": ["ES6", "DOM"]
```

Create a separate entrypoint for browser builds, eg. `src/main-browser.ts`. There you can attach custom properties to `window` like this:

```js
import { greet } from './lib'
(window as any).greet = greet
```

Now simply use that entrypoint with `esbuild` when building for the browser:


```bash
./node_modules/.bin/esbuild src/main-browser.ts --bundle --outfile=dist/browser.js
```

<div class="infobox1">

If you prefer to use [webpack](https://webpack.js.org/), take a look at this [webpack.config.js](https://github.com/metachris/micropython-ctl/blob/master/webpack.config.js) for inspiration.

</div>

---

# References & documentation

* **[Example repository](https://github.com/metachris/typescript-nodejs-boilerplate)**
* [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
* [esbuild docs](https://esbuild.github.io/)
* [tsconfig docs](https://www.typescriptlang.org/tsconfig)
* [typescript-eslint docs](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md)
* [Jest docs](https://jestjs.io/docs/getting-started)
* [GitHub Actions](https://docs.github.com/en/actions), [GitLab CI](https://docs.gitlab.com/ee/ci/)
* [webpack](https://webpack.js.org/)

Reach out with feedback and ideas:

* [twitter.com/metachris](https://twitter.com/metachris)
* [github.com/metachris/typescript-nodejs-boilerplate/issues](https://github.com/metachris/typescript-nodejs-boilerplate/issues)
* Leave a commend below :point_down:
