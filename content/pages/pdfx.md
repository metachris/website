---
type: page
socialSharing: true
title: PDFx - Extract references and metadata from PDF documents, and download all referenced PDFs
description: PDFx is a tool to extract infos and URLs from a PDF, and to easily download all referenced PDFs
bold-links: true
url: /pdfx/
---

<img src="/images/various/books.jpg" />

Reading over <a href="https://weakdh.org/imperfect-forward-secrecy.pdf">this paper</a> and its references recently, I thought it would be great to be able to download all the references at once... This inspired me to write a little tool to do just that, and now it's done and released under the Apache open source license:

[https://github.com/metachris/pdfx](https://github.com/metachris/pdfx)

**Features**

* Extract references and metadata from a given PDF
* Detects pdf, url, arxiv and doi references
* **Fast, parallel download of all referenced PDFs**
* **Find broken hyperlinks (using the ``-c`` flag)** ([more](/2016/03/find-broken-hyperlinks-in-a-pdf-document-with-pdfx/))
* Output as text or JSON (using the ``-j`` flag)
* Extract the PDF text (using the ``--text`` flag)
* Use as command-line tool or Python package
* Compatible with Python 2 and 3
* Works with local and online pdfs


Getting Started
---------------

Grab a copy of pdfx with easy_install or pip and run it:

{{< highlight bash >}}
$ sudo easy_install -U pdfx
...
$ pdfx <pdf-file-or-url>
{{< / highlight >}}

Run ``pdfx -h`` to see the help output:

{{< highlight bash >}}
$ pdfx -h
usage: pdfx [-h] [-d OUTPUT_DIRECTORY] [-c] [-j] [-v] [-t] [-o OUTPUT_FILE]
            [--version]
            pdf

Extract metadata and references from a PDF, and optionally download all
referenced PDFs. Visit https://www.metachris.com/pdfx for more information.

positional arguments:
  pdf                   Filename or URL of a PDF file

optional arguments:
  -h, --help            show this help message and exit
  -d OUTPUT_DIRECTORY, --download-pdfs OUTPUT_DIRECTORY
                        Download all referenced PDFs into specified directory
  -c, --check-links     Check for broken links
  -j, --json            Output infos as JSON (instead of plain text)
  -v, --verbose         Print all references (instead of only PDFs)
  -t, --text            Only extract text (no metadata or references)
  -o OUTPUT_FILE, --output-file OUTPUT_FILE
                        Output to specified file instead of console
  --version             show program's version number and exit
{{< / highlight >}}


Examples
--------

Lets examine this paper: [https://weakdh.org/imperfect-forward-secrecy.pdf](https://weakdh.org/imperfect-forward-secrecy.pdf)

{{< highlight bash >}}
$ pdfx https://weakdh.org/imperfect-forward-secrecy.pdf
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
{{< / highlight >}}


You can use the ``-v`` flag to **output all references** instead of just the PDFs.

**Download all referenced pdfs** with ``-d`` (for ``download-pdfs``) to the specified directory (eg. ``/tmp/``):

{{< highlight bash >}}
$ pdfx https://weakdh.org/imperfect-forward-secrecy.pdf -d /tmp/
Document infos:
- CreationDate = D:20150821110623-04'00'
- Creator = LaTeX with hyperref package
- ModDate = D:20150821110805-04'00'
- PTEX.Fullbanner = This is pdfTeX, Version 3.1415926-2.5-1.40.14 (TeX Live 2013/Debian) kpathsea version 6.1.1
- Pages = 13
- Producer = pdfTeX-1.40.14
- Title = Imperfect Forward Secrecy: How Diffie-Hellman Fails in Practice
- Trapped = False
- dc = {'title': {'x-default': 'Imperfect Forward Secrecy: How Diffie-Hellman Fails in Practice'}, 'creator': [None], 'description': {'x-default': None}, 'format': 'application/pdf'}
- pdf = {'Keywords': None, 'Producer': 'pdfTeX-1.40.14', 'Trapped': 'False'}
- pdfx = {'PTEX.Fullbanner': 'This is pdfTeX, Version 3.1415926-2.5-1.40.14 (TeX Live 2013/Debian) kpathsea version 6.1.1'}
- xap = {'CreateDate': '2015-08-21T11:06:23-04:00', 'ModifyDate': '2015-08-21T11:08:05-04:00', 'CreatorTool': 'LaTeX with hyperref package', 'MetadataDate': '2015-08-21T11:08:05-04:00'}
- xapmm = {'InstanceID': 'uuid:4e570f88-cd0f-4488-85ad-03f4435a4048', 'DocumentID': 'uuid:98988d37-b43d-4c1a-965b-988dfb2944b6'}

References: 36
- URL: 18
- PDF: 18

PDF References:
- http://www.spiegel.de/media/media-35533.pdf
- http://www.spiegel.de/media/media-35513.pdf
- http://www.spiegel.de/media/media-35509.pdf
- http://www.spiegel.de/media/media-35529.pdf
- http://www.spiegel.de/media/media-35527.pdf
- http://cr.yp.to/factorization/smoothparts-20040510.pdf
- http://www.spiegel.de/media/media-35517.pdf
- http://www.spiegel.de/media/media-35526.pdf
- http://www.spiegel.de/media/media-35519.pdf
- http://www.spiegel.de/media/media-35522.pdf
- http://cryptome.org/2013/08/spy-budget-fy13.pdf
- http://www.spiegel.de/media/media-35515.pdf
- http://www.spiegel.de/media/media-35514.pdf
- http://www.hyperelliptic.org/tanja/SHARCS/talks06/thorsten.pdf
- http://www.spiegel.de/media/media-35528.pdf
- http://www.spiegel.de/media/media-35671.pdf
- http://www.spiegel.de/media/media-35520.pdf
- http://www.spiegel.de/media/media-35551.pdf

Downloading 18 pdfs to '/tmp/'...
Created directory '/tmp/imperfect-forward-secrecy.pdf-referenced-pdfs'
Downloaded 'http://www.spiegel.de/media/media-35514.pdf' to '/tmp/imperfect-forward-secrecy.pdf-referenced-pdfs/media-35514.pdf'
Downloaded 'http://www.spiegel.de/media/media-35533.pdf' to '/tmp/imperfect-forward-secrecy.pdf-referenced-pdfs/media-35533.pdf'
Downloaded 'http://www.spiegel.de/media/media-35513.pdf' to '/tmp/imperfect-forward-secrecy.pdf-referenced-pdfs/media-35513.pdf'
Downloaded 'http://www.spiegel.de/media/media-35520.pdf' to '/tmp/imperfect-forward-secrecy.pdf-referenced-pdfs/media-35520.pdf'
Downloaded 'http://www.spiegel.de/media/media-35526.pdf' to '/tmp/imperfect-forward-secrecy.pdf-referenced-pdfs/media-35526.pdf'
Downloaded 'http://www.hyperelliptic.org/tanja/SHARCS/talks06/thorsten.pdf' to '/tmp/imperfect-forward-secrecy.pdf-referenced-pdfs/thorsten.pdf'
Downloaded 'http://cryptome.org/2013/08/spy-budget-fy13.pdf' to '/tmp/imperfect-forward-secrecy.pdf-referenced-pdfs/spy-budget-fy13.pdf'
Downloaded 'http://www.spiegel.de/media/media-35528.pdf' to '/tmp/imperfect-forward-secrecy.pdf-referenced-pdfs/media-35528.pdf'
Downloaded 'http://www.spiegel.de/media/media-35509.pdf' to '/tmp/imperfect-forward-secrecy.pdf-referenced-pdfs/media-35509.pdf'
Downloaded 'http://www.spiegel.de/media/media-35522.pdf' to '/tmp/imperfect-forward-secrecy.pdf-referenced-pdfs/media-35522.pdf'
Downloaded 'http://www.spiegel.de/media/media-35519.pdf' to '/tmp/imperfect-forward-secrecy.pdf-referenced-pdfs/media-35519.pdf'
Downloaded 'http://cr.yp.to/factorization/smoothparts-20040510.pdf' to '/tmp/imperfect-forward-secrecy.pdf-referenced-pdfs/smoothparts-20040510.pdf'
Downloaded 'http://www.spiegel.de/media/media-35527.pdf' to '/tmp/imperfect-forward-secrecy.pdf-referenced-pdfs/media-35527.pdf'
Downloaded 'http://www.spiegel.de/media/media-35529.pdf' to '/tmp/imperfect-forward-secrecy.pdf-referenced-pdfs/media-35529.pdf'
Downloaded 'http://www.spiegel.de/media/media-35671.pdf' to '/tmp/imperfect-forward-secrecy.pdf-referenced-pdfs/media-35671.pdf'
Downloaded 'http://www.spiegel.de/media/media-35517.pdf' to '/tmp/imperfect-forward-secrecy.pdf-referenced-pdfs/media-35517.pdf'
Downloaded 'http://www.spiegel.de/media/media-35551.pdf' to '/tmp/imperfect-forward-secrecy.pdf-referenced-pdfs/media-35551.pdf'
Downloaded 'http://www.spiegel.de/media/media-35515.pdf' to '/tmp/imperfect-forward-secrecy.pdf-referenced-pdfs/media-35515.pdf'
All done!
{{< / highlight >}}


To **extract text**, you can use the ``-t`` flag::

{{< highlight bash >}}
# Extract text to console
$ pdfx https://weakdh.org/imperfect-forward-secrecy.pdf -t

# Extract text to file
$ pdfx https://weakdh.org/imperfect-forward-secrecy.pdf -t -o pdf-text.txt
{{< / highlight >}}

To **check for broken links** use the ``-c`` flag::

{{< highlight bash >}}
$ pdfx https://weakdh.org/imperfect-forward-secrecy.pdf -c
{{< / highlight >}}

See a [live example on video here](/2016/03/find-broken-hyperlinks-in-a-pdf-document-with-pdfx/).


Usage as Python library
-----------------------

{{< highlight python >}}
>>> import pdfx
>>> pdf = pdfx.PDFx("filename-or-url.pdf")
>>> metadata = pdf.get_metadata()
>>> references_list = pdf.get_references()
>>> references_dict = pdf.get_references_as_dict()
>>> pdf.download_pdfs("target-directory")
{{< / highlight >}}

You can find the code here on Github:
[https://github.com/metachris/pdfx](https://github.com/metachris/pdfx). Feedback, ideas and pull requests are welcome! Reach out to me on Twitter: [@metachris](https://twitter.com/metachris)

