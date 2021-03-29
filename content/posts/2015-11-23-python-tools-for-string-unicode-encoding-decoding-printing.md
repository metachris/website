---
boldLinks: true
date: 2015-11-23T00:00:00Z
tags:
- Python
title: Python Helpers for String/Unicode Encoding, Decoding and Printing
url: /2015/11/python-tools-for-string-unicode-encoding-decoding-printing/
---

String encoding and decoding as well as encoding detection can be a
headache, more so in Python 2 than in Python 3. Here are two little helpers
which are used in [PDFx](https://www.metachris.com/pdfx), the
PDF metadata and reference extractor:

* `make_compat_str` - decode any kind of bytes/str into an unicode object
* `print_to_console` - print (unicode) strings to any kind of console (even windows with cp437, etc.)

All of this code is in the public domain via [The Unlicense](http://choosealicense.com/licenses/unlicense/).

---

<h2>print_to_console</h2>

`print_to_console` detects the output locale and tries to correctly encode the
given (unicode) string. Using this you can safely print to any kind of terminal,
either support UTF-8 or any other encoding (eg. Windows with cp437). Fallback to ascii with backslash-replace:

{{< highlight python >}}
def print_to_console(text):
    # Prints a (unicode) string to the console, encoded depending on the stdout
    # encoding (eg. cp437 on Windows). Works with Python 2 and 3.
    try:
        sys.stdout.write(text)
    except UnicodeEncodeError:
        bytes_string = text.encode(sys.stdout.encoding, 'backslashreplace')
        if hasattr(sys.stdout, 'buffer'):
            sys.stdout.buffer.write(bytes_string)
        else:
            text = bytes_string.decode(sys.stdout.encoding, 'strict')
            sys.stdout.write(text)
    sys.stdout.write("\n")
{{< / highlight >}}

---

<h2>make_compat_str</h2>

`make_compat_str` detects the encoding of a string or bytes object using
[chardet](https://pypi.python.org/pypi/chardet), and returns a standard unicode object. Just throw any kind of bytes / string at it!

{{< highlight python >}}
import sys
import chardet

IS_PY2 = sys.version_info < (3, 0)
if not IS_PY2:
    # Helper for Python 2 and 3 compatibility
    unicode = str

def make_compat_str(in_str):
    """
    Tries to guess encoding of [str/bytes] and decode it into
    an unicode object.
    """
    assert isinstance(in_str, (bytes, str, unicode))
    if not in_str:
        return unicode()

    # Chardet in Py2 works on str + bytes objects
    if IS_PY2 and isinstance(in_str, unicode):
        return in_str

    # Chardet in Py3 works on bytes objects
    if not IS_PY2 and not isinstance(in_str, bytes):
        return in_str

    # Detect the encoding now
    enc = chardet.detect(in_str)

    # Decode the object into a unicode object
    out_str = in_str.decode(enc['encoding'])

    # Cleanup: Sometimes UTF-16 strings include the BOM
    if enc['encoding'] == "UTF-16BE":
        # Remove byte order marks (BOM)
        if out_str.startswith('\ufeff'):
            out_str = out_str[1:]

    # Return the decoded string
    return out_str
{{< / highlight >}}


<hr class="spaced">

If you have suggestions, feedback or ideas, please reach out to <a href="https://twitter.com/metachris" target="_blank">@metachris</a>.
