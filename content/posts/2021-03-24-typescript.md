+++
date = "2021-03-24"
title = "Bootstrapping a TypeScript + Node.js Project"
images = ["/images/posts/typescript-nodejs.jpg"]
tags = ["TypeScript", "webdev"]
keywords = ["TypeScript", "Node.js", "Project", "Setup", "Template", "Boilerplate"]
# hideTags = true
+++

This is a guide for bootstrapping a minimal TypeScript + Node.js project with modern tooling (March 2021).

* TypeScript 4, optionally [esbuild](https://esbuild.github.io/)
* Linting with [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) ([tslint](https://palantir.github.io/tslint/) is deprecated)
* Tests with [Jest](https://jestjs.io/docs/getting-started) (and [ts-jest](https://www.npmjs.com/package/ts-jest))
* CI for testing and linting ([GitHub Actions](https://docs.github.com/en/actions) / [GitLab CI](https://docs.gitlab.com/ee/ci/))
* Automatic API documentation with [typedoc](https://typedoc.org/guides/doccomments/)

<div class="infobox1">

Example repository: [github.com/metachris/typescript-nodejs-boilerplate](https://github.com/metachris/typescript-nodejs-boilerplate)

You can either clone the example repository or follow the individual steps outlined in this post.



</div>

Notes:

* To bootstrap a web project, you probably want to use a template with hot code reloading specific for web projects. I'll write another post that covers this soon. In the meantime, see the [webpack hot reload docs](https://webpack.js.org/guides/hot-module-replacement/).
* There are a couple of gotchas for projects that target
both Node.js and web, since several APIs and available libraries are different (eg. fetch, websockets, Buffer, etc.).

---

## Steps

1. Create a project and source directory
1. Create a `package.json`
1. Get a `.gitignore`, `tsconfig.json`, `tslint.json`
1. Install TypeScript & dependencies
1. Integrate tests with Jest
1. Setup CI tasks
1. Optional: API documentation with typedoc
1. Optional: esbuild
1. [Choose a license](https://opensource.guide/legal/#which-open-source-license-is-appropriate-for-my-project)

---

## Basic project setup

Create the directories and install the primary dependencies. These steps use `yarn`, but you
can also substitute it with `npm` if you prefer.

```bash
# Create project folder
mkdir my-project
cd my-project

# Create source folder and file
mkdir src
touch src/main.ts src/main.test.ts

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

## Tests with Jest

You can write [Jest tests](https://jestjs.io/docs/getting-started) [like this](https://github.com/metachris/typescript-nodejs-boilerplate/blob/master/src/main.test.ts):

```typescript
import { greet } from './main'

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

## Continuous integration: GitHub Actions / GitLab CI

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

## API documentation with typedoc

You can auto-generate API documentation from the TyoeScript source files using [typedoc](https://typedoc.org/guides/doccomments/). The generated documentation can be published to GitHub / GitLab pages through the CI:

* Install [typedoc](https://typedoc.org/guides/doccomments/): `yarn add -D typedoc`
* Add `docs` script to `package.json`: `"docs": "typedoc --entryPoints src/main.ts"`
* You can now generate the documentation with `yarn docs`. The resulting HTML is saved in `docs/`.
* Publish to pages through CI:
  * [GitHub pages](https://pages.github.com/): Add [`.github/workflows/deploy-gh-pages.yml`](https://github.com/metachris/typescript-nodejs-boilerplate/blob/master/.github/workflows/deploy-gh-pages.yml) and enable pages in GitHub repo settings
  * [GitLab pages](https://docs.gitlab.com/ee/user/project/pages/): add a deploy task in [`.gitlab-ci.yml`](https://github.com/metachris/typescript-nodejs-boilerplate/blob/master/.gitlab-ci.yml#L19:L30)


---

## esbuild

[esbuild](https://esbuild.github.io/) is an extremely fast JavaScript bundler that
can also compile a [large subset of TypeScript code](https://esbuild.github.io/content-types/#typescript). It's typically used as a webpack alternative, although it can also be used for many Node.js projects.

Note that esbuild is still young and under active development (see [esbuild on GitHub](https://github.com/evanw/esbuild)).

Install esbuild, compile and bundle:

```bash
# Install esbuild
yarn add -D esbuild

# Compile and bundle
./node_modules/.bin/esbuild src/main.ts --bundle --platform=node --outfile=dist/out.js

# Run the bundled output
node dist/out.js
```

Further reading:

* [esbuild documentation](https://esbuild.github.io/)

---

## References & documentation

* **[Example repository](https://github.com/metachris/typescript-nodejs-boilerplate)**
* [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
* [esbuild docs](https://esbuild.github.io/)
* [tsconfig docs](https://www.typescriptlang.org/tsconfig)
* [typescript-eslint docs](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md)
* [Jest docs](https://jestjs.io/docs/getting-started)
* [GitHub Actions](https://docs.github.com/en/actions), [GitLab CI](https://docs.gitlab.com/ee/ci/)

Reach out with feedback and ideas:

* [twitter.com/metachris](https://twitter.com/metachris)
* [github.com/metachris/typescript-nodejs-boilerplate/issues](https://github.com/metachris/typescript-nodejs-boilerplate/issues)
