---
boldLinks: true
date: 2016-04-11T00:00:00Z
image: images/posts/thumbnail-python-threadpools.jpg
tags:
- Python
title: Python Thread Pool
url: /2016/04/python-threadpool/
---

> A thread pool is a group of pre-instantiated, idle threads which stand ready to be given work.
These are often preferred over instantiating new threads for each task when there is a large number of (short) tasks to be done rather than a small number of long ones.

Suppose you want do download 1000s of documents from the internet, but only have resources for downloading 50 at a time. The solution is to utilize is a thread pool, spawning a fixed number of threads to download all the URLs from a queue, 50 at a time.

In order to use thread pools, Python 3.x includes the [ThreadPoolExecutor](https://docs.python.org/dev/library/concurrent.futures.html#threadpoolexecutor) class, and both Python 2.x and 3.x have `multiprocessing.dummy.ThreadPool`. [`multiprocessing.dummy`](https://docs.python.org/3/library/multiprocessing.html#module-multiprocessing.dummy) replicates the API of [multiprocessing](https://docs.python.org/3/library/multiprocessing.html#module-multiprocessing) but is no more than a wrapper around the [threading](https://docs.python.org/3/library/threading.html#module-threading) module. 

The downside of `multiprocessing.dummy.ThreadPool` is that in Python 2.x, it is not possible to exit the program with eg. a KeyboardInterrupt before all tasks from the queue have been finished by the threads.

In order to achieve an interruptable thread queue in Python 2.x and 3.x (for use in [PDFx](/pdfx)), I've build this code, inspired by [stackoverflow.com/a/7257510](http://stackoverflow.com/a/7257510). It implements a thread pool which works with Python 2.x and 3.x:

{{< highlight python >}}
import sys
IS_PY2 = sys.version_info < (3, 0)

if IS_PY2:
    from Queue import Queue
else:
    from queue import Queue

from threading import Thread


class Worker(Thread):
    """ Thread executing tasks from a given tasks queue """
    def __init__(self, tasks):
        Thread.__init__(self)
        self.tasks = tasks
        self.daemon = True
        self.start()

    def run(self):
        while True:
            func, args, kargs = self.tasks.get()
            try:
                func(*args, **kargs)
            except Exception as e:
                # An exception happened in this thread
                print(e)
            finally:
                # Mark this task as done, whether an exception happened or not
                self.tasks.task_done()


class ThreadPool:
    """ Pool of threads consuming tasks from a queue """
    def __init__(self, num_threads):
        self.tasks = Queue(num_threads)
        for _ in range(num_threads):
            Worker(self.tasks)

    def add_task(self, func, *args, **kargs):
        """ Add a task to the queue """
        self.tasks.put((func, args, kargs))

    def map(self, func, args_list):
        """ Add a list of tasks to the queue """
        for args in args_list:
            self.add_task(func, args)

    def wait_completion(self):
        """ Wait for completion of all the tasks in the queue """
        self.tasks.join()


if __name__ == "__main__":
    from random import randrange
    from time import sleep

    # Function to be executed in a thread
    def wait_delay(d):
        print("sleeping for (%d)sec" % d)
        sleep(d)

    # Generate random delays
    delays = [randrange(3, 7) for i in range(50)]

    # Instantiate a thread pool with 5 worker threads
    pool = ThreadPool(5)

    # Add the jobs in bulk to the thread pool. Alternatively you could use
    # `pool.add_task` to add single jobs. The code will block here, which
    # makes it possible to cancel the thread pool with an exception when
    # the currently running batch of workers is finished.
    pool.map(wait_delay, delays)
    pool.wait_completion()

{{< / highlight >}}

The queue size is similar to the number of threads (see `self.tasks = Queue(num_threads)`), therefore adding tasks with `pool.map(..)` and `pool.add_task(..)` blocks until a new slot in the Queue is available.

When you issue a KeyboardInterrupt by pressing <kbd>Ctrl</kbd>+<kbd>C</kbd>, the current batch of workers
will finish and the program quits with the exception at the `pool.map(..)` step.

<hr class="spaced" />

If you have suggestions or feedback, let me know via <a href="https://twitter.com/@metachris" target="_blank">@metachris</a>
