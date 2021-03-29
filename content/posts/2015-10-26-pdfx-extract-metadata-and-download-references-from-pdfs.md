---
boldLinks: true
date: 2015-10-26T00:00:00Z
tags:
- Python
- PDFx
title: PDFx v1.0 - Extract metadata and URLs from PDFs, and download all referenced PDFs
url: /2015/10/pdfx-extract-metadata-and-download-references-from-pdfs/
---

I just released [PDFx version 1.0](https://pypi.python.org/pypi/pdfx), a Python tool and library
to extract metadata and URLs from PDFs, and to automatically download all referenced PDFs.
The project is released under the Apache license with the source code [on Github](https://github.com/metachris/pdfx)!

Features
--------

* Extract metadata and PDF URLs from a given PDF (file or URL)
* Download all PDFs referenced in the original PDF
* Works with local and online pdfs
* Use as command-line tool or Python package
* Compatible with Python 2 and 3

Quick Start
-----------

Grab a copy of pdfx with easy_install or pip and run it:

{{< highlight bash >}}
$ easy_install -U pdfx
...
$ pdfx <pdf-file-or-url>
{{< / highlight >}}

Run ``pdfx -h`` to see the help output:

{{< highlight bash >}}
$ pdfx -h
usage: pdfx [-h] [-d OUTPUT_DIRECTORY] [-j] [-v] [--debug] [--version] pdf

Get infos and links from a PDF, and optionallydownload all referenced PDFs.
See http://www.metachris.com/pdfx for more information.

positional arguments:
  pdf                   Filename or URL of a PDF file

optional arguments:
  -h, --help            show this help message and exit
  -d OUTPUT_DIRECTORY, --download-pdfs OUTPUT_DIRECTORY
                        Download all referenced PDFs into specified directory
  -j, --json            Output infos as json (instead of plain text)
  -v, --verbose         Print all urls (instead of only PDF urls)
  --debug               Output debug infos
  --version             show program's version number and exit
{{< / highlight >}}

By default `pdfx` only prints the information. If you add the `-d` flag, it
downloads all referenced PDFs to the specified location:


{{< highlight bash >}}
$ pdfx https://weakdh.org/imperfect-forward-secrecy.pdf -d ./
Document infos:
- CreationDate = D:20150821110623-04'00'
- Creator = LaTeX with hyperref package
- ModDate = D:20150821110805-04'00'
- PTEX.Fullbanner = This is pdfTeX, Version 3.1415926-2.5-1.40.14 (TeX Live 2013/Debian) kpathsea version 6.1.1
- Pages = 13
- Producer = pdfTeX-1.40.14
- Title = Imperfect Forward Secrecy: How Diffie-Hellman Fails in Practice
- Trapped = False

17 PDF URLs:
- http://cr.yp.to/factorization/smoothparts-20040510.pdf
- http://www.spiegel.de/media/media-35671.pdf
- http://www.spiegel.de/media/media-35529.pdf
- http://cryptome.org/2013/08/spy-budget-fy13.pdf
- http://www.spiegel.de/media/media-35514.pdf
- http://www.spiegel.de/media/media-35509.pdf
- http://www.spiegel.de/media/media-35515.pdf
- http://www.spiegel.de/media/media-35533.pdf
- http://www.spiegel.de/media/media-35519.pdf
- http://www.spiegel.de/media/media-35522.pdf
- http://www.spiegel.de/media/media-35513.pdf
- http://www.spiegel.de/media/media-35528.pdf
- http://www.spiegel.de/media/media-35526.pdf
- http://www.spiegel.de/media/media-35517.pdf
- http://www.spiegel.de/media/media-35527.pdf
- http://www.spiegel.de/media/media-35520.pdf
- http://www.spiegel.de/media/media-35551.pdf

Downloading 17 pdfs to './'...
All done!
{{< / highlight >}}

To do
-----

* https://github.com/metachris/pdfx/issues

---

Reach out to me on Twitter [@metachris](https://twitter.com/metachris)

---

References
----------

* [https://pypi.python.org/pypi/pdfx](https://pypi.python.org/pypi/pdfx)
* [https://github.com/metachris/pdfx](https://github.com/metachris/pdfx)
* [http://www.metachris.com/pdfx](http://www.metachris.com/pdfx)

---
