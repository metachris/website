---
date: 2017-06-29
draft: false
title: logzero - Simplified logging for Python 2 and 3
description: logzero is a simple and effective logging module for Python 2 and 3.
images:
  - /images/posts/logzero/logo-text-wide-og.png

math: true
tags: ["Python"]

# thumbnail: images/posts/logzero/logo-thumbnail2.png
---

I've just published [`logzero`](https://logzero.readthedocs.io/), a small Python package which simplifies logging with Python 2 and 3.
It is easy to use and robust, and heavily inspired by the [Tornado web framework](https://github.com/tornadoweb/tornado). I've recently released [python-boilerplate.com](https://www.python-boilerplate.com) which included this module as a file, and people have been asking for it to be published as a standalone package. Finally I've found some time to do it, and here it is!

<img src="/images/posts/logzero/logo-text-wide-cropped.png" alt="logzero logo" style="width: 100%; max-width: 620px; margin-left: 10px; margin-right: 20px;" />

* https://logzero.readthedocs.io
* https://github.com/metachris/logzero



`logzero` is a simple and effective logging module for Python 2 and 3:

* Easy logging to console and/or file.
* Provides a fully configured standard [Python logger object](https://docs.python.org/2/library/logging.html#module-level-functions).
* Pretty formatting, including level-specific colors in the console.
* Robust against str/bytes encoding problems, works with all kinds of character encodings and special characters.
* Multiple loggers can write to the same logfile (also across multiple Python files).
* Global default logger with `logzero.logger` and custom loggers with `logzero.setup_logger(..)`.
* Compatible with Python 2 and 3.
* All contained in a [single file](https://github.com/metachris/logzero/blob/master/logzero/__init__.py).
* No further Python dependencies.
* Licensed under the MIT license.
* Heavily inspired by the [Tornado web framework](https://github.com/tornadoweb/tornado).

<hr class="spaced">

## Usage

{{< highlight python >}}
from logzero import logger

logger.debug("hello")
logger.info("info")
logger.warn("warn")
logger.error("error")
{{< / highlight >}}

If `logger.info(..)` was called from a file called `demo.py`, the output will look like this:

<img src="/images/posts/logzero/demo_output.png" alt="example output with colors" style="max-width: 320px;" />

{{< highlight shell >}}
[D 170628 09:30:53 demo:4] hello
[I 170628 09:30:53 demo:5] info
[W 170628 09:30:53 demo:6] warn
[E 170628 09:30:53 demo:7] error
{{< / highlight >}}

You can also easily log to a file as well:

{{< highlight python >}}
logzero.setup_default_logger(logfile="/tmp/test.log")
{{< / highlight >}}

This is how you can log variables too:

{{< highlight python >}}
logger.debug("var1: %s, var2: %s", var1, var2)
{{< / highlight >}}

This is how you can set the minimum logging level (default is `DEBUG`):

{{< highlight python >}}
logzero.setup_default_logger(level=logging.INFO)
{{< / highlight >}}

You can also easily [set up rotating log files](https://logzero.readthedocs.io/en/latest/#adding-custom-handlers-eg-rotatinglogfile), custom logger, custom formatter and much more. Just take a look at the [documentation](https://logzero.readthedocs.io/en/latest/#documentation) for
more details and options.

<hr class="spaced">

## Installation

Install `logzero` with `pip`:

{{< highlight shell >}}
$ pip install -U logzero
{{< / highlight >}}

If you don't have `pip` installed, this [Python installation guide](http://docs.python-guide.org/en/latest/starting/installation/) can guide
you through the process. Alternatively you can also install `logzero` from the Github repository with `python setup.py install`.

<hr class="spaced">

Take a look at the full documentation: https://logzero.readthedocs.io

If you have comments, feedback or suggestions, I'm happy to hear from you. Please reach out via <a href="https://twitter.com/@metachris" target="_blank">@metachris</a>!

