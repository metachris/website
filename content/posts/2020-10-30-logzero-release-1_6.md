+++
date = "2020-10-30"
title = "A new version of logzero is released (v1.6) 🎉"
description = "logzero is a simple and effective logging library for Python, supporting colors, logfiles, syslog, JSON logs and much more."
images = ["/images/projects/logzero/logo_1000x500.png"]
tags = ["Python"]
+++

logzero is a simple and effective logging library for Python, with colored stream output, logfile, syslog, JSON formatting and much more: https://github.com/metachris/logzero

{{< figure src="/images/projects/logzero/demo-output-with-beaver.png" alt="logzero logo" >}}

After a really busy period with my second 🐣, I start to find a little bit of time here and there for fun projects. Recently I've enjoyed a few evenings maintaining [logzero](https://github.com/metachris/logzero), culminating in a small release today: [logzero v1.6](https://pypi.org/project/logzero/) 🎉

logzero v1.6 has several improvements:

* JSON formatting (with integrated [python-json-logger](https://github.com/madzak/python-json-logger))
* Easily change colors to custom color codes
* Allow creating of root loggers
* Allow file logging with lower loglevel than stream
* Project readme and history was converted to markdown and displays nicely on [PyPI](https://pypi.org/project/logzero/)
* Deprecation of Travis CI
  * Running tests with GitHub Actions, with Python versions up to 3.9
  * Deploying to PyPI with GitHub Actions
* Documentation update: https://logzero.readthedocs.io/
* Python 3 native, but still supports Python 2

---

## Getting started

Install logzero with `pip`:

```bash
python3 -m pip install logzero
```

Use it like this:

```python
# Import the `logzero.logger` instance
from logzero import logger

# Start logging
logger.debug("hello")
logger.info("info")
logger.warning("warn")
logger.error("error")

# Log exceptions
try:
    raise Exception("this is a demo exception")
except Exception as e:
    logger.exception(e)

# JSON logging
import logzero

logzero.json()
logger.info("JSON test")

# Start writing into a logfile
logzero.logfile("/tmp/logzero-demo.log")
```

This is the output:

{{< figure src="/images/projects/logzero/demo-output3.png" width="740px" alt="logzero example output" >}}

This is the logged JSON object:
```json
{
  "asctime": "2020-10-21 10:43:40,765",
  "filename": "test.py",
  "funcName": "test_this",
  "levelname": "INFO",
  "levelno": 20,
  "lineno": 9,
  "module": "test",
  "message": "info",
  "name": "logzero",
  "pathname": "_tests/test.py",
  "process": 76204,
  "processName": "MainProcess",
  "threadName": "MainThread"
}
```

Exceptions logged with `logger.exception(e)` have these additional JSON fields:

```json
{
  "levelname": "ERROR",
  "levelno": 40,
  "message": "this is a demo exception",
  "exc_info": "Traceback (most recent call last):\n  File \"_tests/test.py\", line 15, in test_this\n    raise Exception(\"this is a demo exception\")\nException: this is a demo exception"
}
```

---

Give logzero a try yourself:

```shell
# Create and activate a virtualenv in ./venv/
python3 -m venv venv
. venv/bin/activate

# Install logzero
python -m pip install logzero

# Download demo.py
wget https://raw.githubusercontent.com/metachris/logzero/master/examples/demo.py
python demo.py
```

---

You can find more information in the [GitHub repository](https://github.com/metachris/logzero) and [documentation](https://logzero.readthedocs.io):

* https://github.com/metachris/logzero
* https://logzero.readthedocs.io

If you have feedback, issues or ideas, reach out by [creating a GitHub issue](https://github.com/metachris/logzero/issues) or through [Twitter](https://twitter.com/metachris).

<br>
{{< figure src="/images/projects/logzero/beaver.png" width="200px" link="https://github.com/metachris/logzero" alt="logzero small logo" >}}
