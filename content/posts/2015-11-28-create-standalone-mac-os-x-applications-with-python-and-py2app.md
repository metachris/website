---
boldLinks: true
date: 2015-11-28T00:00:00Z
tags:
- Python
title: Creating standalone Mac OS X applications with Python and py2app
url: /2015/11/create-standalone-mac-os-x-applications-with-python-and-py2app/
---

In this tutorial we'll be using [py2app](https://pythonhosted.org/py2app/) to create a standalone OSX application from a Python 2 or 3 source code with a
simple [Tkinter](https://wiki.python.org/moin/TkInter) user interface.

<blockquote>"py2app is a Python setuptools command which will allow you to make standalone application bundles and plugins from Python scripts. py2app is similar in purpose and design to py2exe for Windows."</blockquote>

Relevant links about py2app:

* [Documentation](https://pythonhosted.org/py2app/)
* [Source on BitBucket](https://bitbucket.org/ronaldoussoren/py2app/src) (last commit 2015-05-05)
* [Issue Tracker](http://bitbucket.org/ronaldoussoren/py2app/issues),  [Mailing List](http://www.python.org/community/sigs/current/pythonmac-sig/)

This guide is loosely based on the [official tutorial](https://pythonhosted.org/py2app/tutorial.html).
Based on a Python file called `Sandwich.py`, we'll create an application called `Sandwich.app`.

<img src="/images/posts/py2app/app_finder.png" alt="App Icon" style="border:1px solid #CCC;" />

Prerequisites
-------------

Create a custom directory and create a [virtualenv](http://docs.python-guide.org/en/latest/dev/virtualenvs/):

{{< highlight bash >}}
# Create a custom directory
$ mkdir SandwichApp
$ cd SandwichApp

# Use virtualenv to create an isolated environment
$ virtualenv venv
$ . venv/bin/activate
{{< / highlight >}}

Now create a very simple [Tkinter](https://wiki.python.org/moin/TkInter) app with the filename `Sandwich.py`:

{{< highlight python >}}
import sys
if sys.version_info < (3, 0):
    # Python 2
    import Tkinter as tk
else:
    # Python 3
    import tkinter as tk
root = tk.Tk()
root.title("Sandwich")
tk.Button(root, text="Make me a Sandwich").pack()
tk.mainloop()
{{< / highlight >}}

This little app will look like this:

<img src="/images/posts/py2app/app_screen.png" alt="App Screen" />


Install py2app
--------------

The original version of py2app has a bug due to a newer version of ModuleGraph. I
made a fork of the project and fixed this bug [on Github](https://github.com/metachris/py2app).
Install it with pip like this:

{{< highlight bash >}}
$ pip install -U git+https://github.com/metachris/py2app.git@master
{{< / highlight >}}


Create a `setup.py` file
------------------------

py2app includes `py2applet`, a helper which generates a setup.py file for you:

{{< highlight bash >}}
$ py2applet --make-setup Sandwich.py
Wrote setup.py
{{< / highlight >}}

This `setup.py` is a basic definition of the app:

{{< highlight python >}}
from setuptools import setup

APP = ['Sandwich.py']
DATA_FILES = []
OPTIONS = {'argv_emulation': True}

setup(
    app=APP,
    data_files=DATA_FILES,
    options={'py2app': OPTIONS},
    setup_requires=['py2app'],
)
{{< / highlight >}}

If your application uses some data files, like a JSON, text files or images, you should include them in DATA_FILES. For example:

{{< highlight python >}}
DATA_FILES = ['testdata.json', 'picture.png']
{{< / highlight >}}


Build the app for development and testing
-----------------------------------------

py2app builds the standalone application based on the definition in `setup.py`.

For testing and development, py2app provides an "*alias mode*", which builds an
app with symbolic links to the development files:

{{< highlight bash >}}
$ python setup.py py2app -A
{{< / highlight >}}

This creates the following files and directories:

{{< highlight bash >}}
.
├── build
│   └── bdist.macosx-10.10-x86_64
│       └── python2.7-standalone
│           └── app
│               ├── Frameworks
│               ├── collect
│               ├── lib-dynload
│               └── temp
├── Sandwich.py
├── dist
│   └── Sandwich.app
│       └── Contents
│           ├── Info.plist
│           ├── MacOS
│           │   ├── Sandwich
│           │   └── python -> /Users/chris/Projects/chris/python-gui/tkinter/env/bin/../bin/python
│           ├── PkgInfo
│           └── Resources
│               ├── __boot__.py
│               ├── __error__.sh
│               ├── lib
│               │   └── python2.7
│               │       ├── config -> /Users/chris/Projects/chris/python-gui/tkinter/env/bin/../lib/python2.7/config
│               │       └── site.pyc -> ../../site.pyc
│               ├── site.py
│               └── site.pyc
└── setup.py
{{< / highlight >}}

This is not a standalone application, and the applications built in alias mode are not portable to other machines!

The app built with alias mode simply references the original code files, so any changes you make to the original `Sandwich.py` file are instantly available on the next app start.

The resulting development app in `dist/Sandwich.app` can be opened just like any other .app with the Finder
or the open command (`$ open dist/Sandwich.app`). To run your application directly from the Terminal
you can just run:

{{< highlight bash >}}
$ ./dist/Sandwich.app/Contents/MacOS/Sandwich
{{< / highlight >}}


Building for deployment
-----------------------

When everything is tested you can produce a build for deployment with a calling `python setup.py py2app`. Make sure that any old `build` and `dist` directories are removed:

{{< highlight bash >}}
$ rm -rf build dist
$ python setup.py py2app
{{< / highlight >}}

This will assemble your application as `dist/Sandwich.app`. Since this application is self-contained, you will have to run the py2app command again any time you change any source code, data files, options, etc.

The original py2app has a bug which would display "`AttributeError: 'ModuleGraph' object has no attribute 'scan_code'`" or `load_module`. If you encounter this error, take
a look at this [StackOverflow thread](http://stackoverflow.com/a/29449144/5433572) or use my [fork of py2app](https://github.com/metachris/py2app).

The easiest way to wrap your application up for distribution at this point is simply to right-click the application from Finder and choose “Create Archive”.


Adding an icon
--------------

Simply add `"iconfile": "youricon.icns"` to the `OPTIONS` dict:

{{< highlight python >}}
from setuptools import setup

APP = ['Sandwich.py']
DATA_FILES = []
OPTIONS = {
    'argv_emulation': True,
    'iconfile': 'app.icns'
}

setup(
    app=APP,
    data_files=DATA_FILES,
    options={'py2app': OPTIONS},
    setup_requires=['py2app'],
)
{{< / highlight >}}

You can find free icons in icns format around the web (eg. on [IconFinder](https://www.iconfinder.com/search/?q=&price=free) or  [freepik](http://www.freepik.com/free-icons)).

Advanced app settings
---------------------

You can tweak the application information and behaviour with modifications
to the `Info.plist`. The most complete reference for the keys available is [Apple’s Runtime Configuration Guidelines](http://developer.apple.com/documentation/MacOSX/Conceptual/BPRuntimeConfig/index.html).

Here is an example with more modifications:

{{< highlight python >}}
# -*- coding: utf-8 -*-
from setuptools import setup

APP = ['Sandwich.py']
APP_NAME = "SuperSandwich"
DATA_FILES = []

OPTIONS = {
    'argv_emulation': True,
    'iconfile': 'app.icns',
    'plist': {
        'CFBundleName': APP_NAME,
        'CFBundleDisplayName': APP_NAME,
        'CFBundleGetInfoString': "Making Sandwiches",
        'CFBundleIdentifier': "com.metachris.osx.sandwich",
        'CFBundleVersion': "0.1.0",
        'CFBundleShortVersionString': "0.1.0",
        'NSHumanReadableCopyright': u"Copyright © 2015, Chris Hager, All Rights Reserved"
    }
}

setup(
    name=APP_NAME,
    app=APP,
    data_files=DATA_FILES,
    options={'py2app': OPTIONS},
    setup_requires=['py2app'],
)
{{< / highlight >}}

With these settings, the app will have the following infos:

<img src="/images/posts/py2app/get_info.png" alt="Finder Get Info" style="border:1px solid #CCC;" />

<hr class="spaced">

References
----------

* [py2app documentation](https://pythonhosted.org/py2app/), [examples](https://pythonhosted.org/py2app/examples.html)
* [github.com/metachris/py2app](https://github.com/metachris/py2app)
* [Tkinter](https://docs.python.org/3/library/tkinter.html), [Tkinter resource collection](https://wiki.python.org/moin/TkInter), [An Introduction to Tkinter](http://effbot.org/tkinterbook)


See Also
--------

* [Submitting a Python App to the Mac App Store (dafoster.net)](http://dafoster.net/articles/2014/06/24/submitting-a-python-app-to-the-mac-app-store/)
* [PyInstaller](http://www.pyinstaller.org/) - Another tool to create cross-platform standalone apps (libraries like PyQt, Django or matplotlib are fully supported)
* [rumps](https://github.com/jaredks/rumps) - Ridiculously Uncomplicated Mac OS X Python Statusbar Apps
* [py2exe](http://www.py2exe.org/) - same as py2app but for Windows .exe files
* [cx_Freeze](http://cx-freeze.readthedocs.org/en/latest/) - Another packager to create Windows .exe files
* [Discussion of this post on Hacker News](https://news.ycombinator.com/item?id=10644351)


<hr class="spaced">

If you have suggestions, feedback or ideas, please reach out to me <a href="https://twitter.com/metachris" target="_blank">@metachris</a>.
