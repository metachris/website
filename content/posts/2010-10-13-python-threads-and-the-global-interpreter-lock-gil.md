---
boldLinks: true
date: 2010-10-13T00:00:00Z
tags:
- Python
title: Python, Threads and the Global Interpreter Lock (GIL)
url: /2010/10/python-threads-and-the-global-interpreter-lock-gil/
---

This post is about Python, Threads, Multiprocessing, the GIL, and a great talk by
David Beazley titled "Inside the Python GIL".

<h2>Threads</h2>
<p>Threads make it possible to execute multiple pieces of code in parallel, which means either utilizing multiple processors or having the operating system schedule execution time for the threads sequentially on one processor. In contrast to multiprocessing (forking) where multiple separated processes are started, all threads run in a single process and have access to the same resources. Python makes both threading and forking easy with the <a href="http://docs.python.org/library/threading.html">threading</a> and <a href="http://docs.python.org/library/multiprocessing.html">multiprocessing</a> modules.</p>
<h2>Threads and the Python Interpreter</h2>
<p>Since multiple threads access a single Python interpreter process with shared resources, Python uses a <a href="http://wiki.python.org/moin/GlobalInterpreterLock">Global Interpreter Lock</a> (GIL) to schedule access to the interpreter. Each thread has about 100 interpreter instructions before a context switch to the next thread occurs. As a result multiple threads in a single Python process cannot utilize more than one cpu, and cpu intensive code can actually run slower with threads than without. Only the multiprocessing module allows utilization of more cpu&rsquo;s by starting multiple Python interpreter processes (with the downside of a more complicated message passing between the processes).</p>
<h2>Inside the Python GIL</h2>
<p>The 2009 teach talk &ldquo;Inside the Python GIL&rdquo; by David Beazley offers a lot of insight into how the GIL operates and is highly recommended for everyone interested in more details.</p>

<p>
  <iframe width="610" height="430" src="https://www.youtube.com/embed/ph374fJqFPE" frameborder="0" allowfullscreen></iframe>
</p>
<p>Slides: <a href="http://www.dabeaz.com/python/GIL.pdf">http://www.dabeaz.com/python/GIL.pdf</a></p>
