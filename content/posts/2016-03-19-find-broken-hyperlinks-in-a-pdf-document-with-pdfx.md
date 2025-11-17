---
boldLinks: true
date: 2016-03-19T00:00:00Z
description: Easily find broken hyperlinks in PDF documents with PDFx, a free tool
  to extract references and metadata from PDFs.
image: images/various/books.jpg
tags:
- Python
- PDFx
title: Find broken hyperlinks in a PDF document with PDFx
twitterTags: None
url: /2016/03/find-broken-hyperlinks-in-a-pdf-document-with-pdfx/
---

[PDFx](https://www.metachris.dev/pdfx/) is a free command-line tool to extract references, links and metadata from PDF files. You can also use it to **find broken links in a PDF file**, using `pdfx -c`:

![PDFx Link Checker](https://www.metachris.dev/pdfx/images/pdfx-links-check-broken.gif)

For each URL and PDF reference, pdfx performs a HEAD request and checks the status code. It there are broken links, PDFx print the link with the page number where the link was found in the original pdf:

{{< highlight bash >}}
$ pdfx https://weakdh.org/imperfect-forward-secrecy.pdf -c
Document infos:
- CreationDate = D:20150821110623-04'00'
...

Summary of link checker:
33 working
1 broken (reason: 303)
  - http://www.nytimes.com/interactive/2013/11/23/us/politics/23nsa-sigint-strategy-document.html (page 13)
1 broken (reason: 403)
  - http://www.nytimes.com/interactive/2013/11/23/us/ (page 13)
1 broken (reason: 404)
  - https://github.com/bumptech/stud/blob/ (page 13)
{{< / highlight >}}

---

## Installing PDFx

You can simply install PDFx with `easy_install` or `pip` and run it like this:

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
referenced PDFs. Visit https://www.metachris.dev/pdfx for more information.

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

For more examples and infos, take a look at the [PDFx project page](https://www.metachris.dev/pdfx/).
You can find the code on [Github](https://github.com/metachris/pdfx), the code is released under the Apache license.

<hr class="spaced">

Feedback, ideas and pull requests are welcome! You can also reach me on Twitter via [@metachris](https://twitter.com/metachris).
