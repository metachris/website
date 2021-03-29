---
date: 2017-01-06T00:00:00Z
image: images/posts/typescript-fire.jpg
tags: 
- Node.js
- TypeScript
- JavaScript
title: Custom Errors in TypeScript 2.1
url: /2017/01/custom-errors-in-typescript-2.1/
---

TypeScript 2.1 introduced a number of [breaking changes](https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md),
among them that "<b>[Extending built-ins like Error, Array, and Map may no longer work](https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work)</b>".

<img src="/images/posts/typescript-fire.jpg" />

For a subclass like the following:

{{< highlight javascript >}}
class FooError extends Error {
    constructor(m: string) {
        super(m);
    }
    sayHello() {
        return "hello " + this.message;
    }
}
{{< / highlight >}}

* methods may be undefined on objects returned by constructing these subclasses, so calling sayHello will result in an error.
* `instanceof` will be broken between instances of the subclass and their instances, so (`new FooError()) instanceof FooError` will return `false`.

The suggested solution of manually adjusting the prototype with `Object.setPrototypeOf(this, FooError.prototype)` might not work
due to `Object.setPrototypeOf(..)` being missing.

## The Solution

After trying several approaches, the solution [presented here](https://gist.github.com/justmoon/15511f92e5216fa2624b) seems to be the way which reliably works,
including with promises (native and bluebird):

{{< highlight javascript >}}
import * as util from "util";

// Custom Error 1
const CustomError1 = function(message) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
};
util.inherits(CustomError1, Error);

// Custom Error 2
const CustomError2 = function(message) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
};
util.inherits(CustomError2, Error);

// Tests
let e = new CustomError1("Foo");
console.log("instanceof error: ", e instanceof Error);  // true
console.log("instanceof own class: ", e instanceof CustomError1);  // true
console.log("instanceof other error class: ", e instanceof CustomError2);  // false
{{< / highlight >}}

<hr class="spaced">

If you have suggestions or feedback, let me know via [@metachris](https://twitter.com/@metachris).
