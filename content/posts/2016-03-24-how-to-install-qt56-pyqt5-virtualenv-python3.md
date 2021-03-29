---
boldLinks: true
date: 2016-03-24T00:00:00Z
description: A simple guide on installing the latest Qt (currently 5.6) and PyQt5
  on Mac OS X 10.11 (El Capitan) and Linux with Python 3.4, inside a virtual environment.
image: images/posts/qt/logo-python-qt.jpg
tags:
- How-To
- Python
- PyQt
title: How to install Qt 5.6 and PyQt5 in a Python 3.4 virtual environment on Mac
  OS X and Linux
twitterTags:
- Python
- Qt
- PyQt
twitterTitle: How to install Qt 5.6 and PyQt5 in a Python 3.4 virtual environment
url: /2016/03/how-to-install-qt56-pyqt5-virtualenv-python3/
---

<img src="/images/posts/qt/python-qt-codeless.jpg" style="height:120px; margin: 0 0 10px 30px; float:right;" />

This is a simple guide on installing the latest [Qt](http://www.qt.io/) (currently 5.6) and [PyQt5](https://riverbankcomputing.com/software/pyqt/intro) on Mac OS X 10.11 (El Capitan) and Linux with Python 3.4, inside a virtual environment.

**Installation Steps**

* Python 3
* Xcode and command-line tools
* Qt libraries
* Virtual environment
* SIP Python package
* PyQt5 Python package

## Python 3

First of all, make sure that **Python 3** is available on your system. You can easily check this by opening the terminal and entering the command `python3`. If you need to install it, check out the [Python homepage](https://www.python.org/), or install it with [homebrew](http://brew.sh/) (`brew install python3`) on OS X or your favorite Linux package manager.


## Install Xcode and command-line tools

If you are using OS X, [download Xcode](https://developer.apple.com/xcode/downloads/) and install it. Then [install the command-line tools](http://osxdaily.com/2014/02/12/install-command-line-tools-mac-os-x/) by entering the following command in the terminal: `xcode-select --install`. This adds a number of tools to your system, such as `make`, `git`, `gcc`, `c++` and `g++`.


## Install Qt Libraries

First we need to download and install the Qt libraries:

* [http://www.qt.io/download-open-source/](http://www.qt.io/download-open-source/)

I'd recommend to install Qt into the directory `/opt/qt`. The installation requires about 14 GB of disk space, and includes a number of apps and utilities:

* `Qt Creator.app` - a complete IDE with a graphical GUI designer and code editor ([more](http://qmlbook.github.io/en/ch03/index.html))
* `5.6/clang_64/bin/Designer.app` - the GUI designer
* `5.6/clang_64/bin/pixeltool.app` - a tool to inspect the pixels around the mouse cursor
* `5.6/clang_64/bin/qmlscene` - execute scenes from .QML files
* `5.6/clang_64/bin/qtdiag` - Prints diagnostic output about the Qt library
* Various others such as `qmllint`, `qmlmin`, `qmlplugindump`, `qmlprofiler`, `qmlscene`, `qmltestrunner`

Furthermore the Qt installation includes a number of examples in the `Examples` subdirectory.


## Create a virtualenv for the PyQt5 and SIP libs

For this guide, we create a [virtual environment](https://docs.python.org/3/library/venv.html) with Python 3.4 under the home directory in `~/.venv/qtproject`:

{{< highlight bash >}}
# Create the directory
$ mkdir -p ~/.venv

# Create the virtual environment
$ python3 -m venv ~/.venv/qtproject

# Activate the virtual environment
$ . ~/.venv/qtproject/bin/activate
{{< / highlight >}}

At this point, typing the command `which python3` should output something like `~/.venv/qtproject/bin/python3`.


## Install SIP

PyQt requires to have the SIP module installed. SIP is a tool for automatically generating Python bindings for C and C++ libraries.

* [SIP Docs](http://pyqt.sourceforge.net/Docs/sip4/installation.html)
* [SIP Download](https://riverbankcomputing.com/software/sip/download)

You can either download the .tar.gz file, or install the latest from the source repository with mercurial (`hg`):

{{< highlight bash >}}
# Clone the source code
$ cd /tmp/
$ hg clone http://www.riverbankcomputing.com/hg/sip
$ cd sip

# Generate the build configuration
$ python2.7 build.py prepare  # build.py is a Python 2 script
$ python3.4 configure.py -d ~/.venv/qtproject/lib/python3.4/site-packages

# Make and install
$ make
$ sudo make install
$ sudo make clean
{{< / highlight >}}


## Install PyQt5

Finally we get to install the PyQt5 module.

* [PyQt5 Docs](http://pyqt.sourceforge.net/Docs/PyQt5/installation.html)
* [PyQt5 Download](https://riverbankcomputing.com/software/pyqt/download5)

Start by downloading the tar.gz file, in this case `PyQt-gpl-5.5.1.tar.gz`, and extracting it:

{{< highlight bash >}}
# Extract the tar.gz file
$ tar -xvf PyQt-gpl-5.5.1.tar.gz

# Change into the PyQt source directory
$ cd PyQt-gpl-5.5.1

# Generate the build configuration (make sure to reference 'qmake' from the Qt libs installation directory)
$ python3 configure.py --destdir ~/.venv/qtproject/lib/python3.4/site-packages --qmake /opt/qt/5.6/clang_64/bin/qmake

# Make and install
$ make  # this takes a really long time
$ sudo make install
$ sudo make clean
{{< / highlight >}}


## All Done!

At this point, everything is successfully installed! Now let's check if everything works by importing `PyQt5` from Python 3.4:

{{< highlight bash >}}
~/.venv/qtproject/bin/python3 -c "import PyQt5"
{{< / highlight >}}

And just for the sake of it, let's build a simple hello world Qt application:

{{< highlight python >}}
from PyQt5.QtWidgets import QApplication, QWidget, QLabel


if __name__ == "__main__":
    app = QApplication()

    # Build the window widget
    w = QWidget()
    w.setGeometry(300, 300, 250, 150)  # x, y, w, h
    w.setWindowTitle("My First Qt App")

    # Add a label with tooltip
    label = QLabel("Hello World  🚀", w)
    label.setToolTip("This is a <b>QLabel</b> widget with Tooltip")
    label.resize(label.sizeHint())
    label.move(80, 50)

    # Show window and run
    w.show()
    app.exec_()
{{< / highlight >}}

Save this program as `helloqt.py` and execute it with `python3 helloqt.py` (or, if the virtualenv is not activated, with `~/.venv/qtproject/bin/python3 helloqt.py`), and be greeted with this:

<img src="/images/posts/qt/simple.png" />

🎉 &nbsp;Congratulations&nbsp; 🎉

<hr class="spaced" />

Now have fun with some GUI programming! Here are a few useful next steps:

* [Qt Book](http://qmlbook.github.io/index.html)
* [Qt Documentation](http://doc.qt.io/)
* [First programs in PyQt5](http://zetcode.com/gui/pyqt5/firstprograms/)

<hr class="spaced" />

If you have suggestions or feedback, let me know via <a href="https://twitter.com/@metachris" target="_blank">@metachris</a>

<small>Update 2016-03-25: `python3 -m venv` instead of `virtualenv`</small>
