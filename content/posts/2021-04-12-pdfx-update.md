+++
draft = false
date = "2021-04-12"
title = "PDFx update and new version release (v1.4.1)"
images = ["/images/various/books.jpg"]
tags = ["Python", "PDFx"]
keywords = ["Python", "PDF", "pdfx"]
# hideTags = true
# disableComments = true
# hideInPostlist = true
+++

---

[PDFx](https://github.com/metachris/pdfx) is a tool to extract text, links, references and metadata from PDF files and URLs. Thanks to [several contributors](https://github.com/metachris/pdfx/graphs/contributors) the project received a thorough update and was brought into 2021. The new release of today is [PDFx v1.4.1](https://pypi.org/project/pdfx/) :tada:

PDFx works like this:

<!--more-->

```bash
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
...
```

It's is written in Python and can be used as cli and as a library. It includes a bunch of features - json output, checking links, downloading references, and more. Check out the [GitHub project](https://github.com/metachris/pdfx) and [introduction blog post](/pdfx).

---

## What is in the update

* Python compatibility from 2.7 to 3.10-dev
* Switch to [pdfminer.six](https://github.com/pdfminer/pdfminer.six), a community-maintained fork of pdfminer
* Linting & static checks with [flake8](https://flake8.pycqa.org/en/latest/), [pylint](https://pylint.org/) and [mypy](http://mypy-lang.org/)
* Tests: [pytest](https://docs.pytest.org/en/stable/), [coverage](https://coverage.readthedocs.io/en/coverage-5.5/)
* [black](https://pypi.org/project/black/) for code formatting
* GitHub workflows:
  * Testing and linting (using Python versions 3.6 to 3.10): [dashboard](https://github.com/metachris/pdfx/actions/workflows/lint-and-test.yml), [`lint-and-test.yml`](https://github.com/metachris/pdfx/blob/master/.github/workflows/lint-and-test.yml)
  * Publishing a new version to PyPI: [dashboard](https://github.com/metachris/pdfx/actions/workflows/publish-to-pypi.yml), [`publish-to-pypi.yml`](https://github.com/metachris/pdfx/blob/master/.github/workflows/publish-to-pypi.yml)
* `README.rst` -> `README.md` (inital conversion from rst to markdown with [pandoc](https://pandoc.org/))
* Detects pdf URLs that end with parameters (e.g. `?dl=1` on dropbox)
* Include tests in PyPI tarball
* Partly inspiratied by [How to make an awesome Python package in 2021](https://antonz.org/python-packaging/)


## Try it out

```bash
# Install pdfx
pip install -U pdfx

# Run it with an URL
pdfx https://weakdh.org/imperfect-forward-secrecy.pdf
```

### Options

```bash
$ pdfx -h
usage: pdfx [-h] [-d OUTPUT_DIRECTORY] [-c] [-j] [-v] [-t] [-o OUTPUT_FILE] [--version] pdf

Extract metadata and references from a PDF, and optionally download all referenced PDFs. Visit
https://www.metachris.dev/pdfx for more information.

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
  ```

## Links & References

* GitHub project: https://github.com/metachris/pdfx
* PyPI: https://pypi.org/project/pdfx/

---

Feedback and ideas are appreciated!

Please leave a comment below (or reach out via [twitter.com/metachris](https://twitter.com/metachris))  :point_down:

