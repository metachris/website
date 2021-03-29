---
boldLinks: true
date: 2016-12-27T00:00:00Z
image: images/posts/thumbnail-python-utilities-norvig.jpg
tags:
- Python
title: Python Utilities by Peter Norvig
url: /2016/12/peter-norvigs-python-utilities-advent-of-code/
---

<a href="https://en.wikipedia.org/wiki/Peter_Norvig" target="_blank">Peter Norvig</a>, the famous American computer scientist and Director of Research at Google Inc., participated in this year's <a href="http://adventofcode.com/" target="_blank">Advent of Code</a> (a series of small programming puzzles), and shared his experience <a href="http://nbviewer.jupyter.org/url/norvig.com/ipython/Advent%20of%20Code.ipynb">in an interesting blog post</a>.

The post starts with this amazing collection of Python utility functions, which may also be useful for your
next project:

<!--inspiration and many of which should probably be part of the Python standard library:-->

{{< highlight python >}}
# Python 3.x
import re
import numpy as np
import math
import urllib.request

from collections import Counter, defaultdict, namedtuple, deque
from functools   import lru_cache
from itertools   import permutations, combinations, chain, cycle, product
from heapq       import heappop, heappush

def Input(day):
    "Open this day's input file."
    filename = 'advent2016/input{}.txt'.format(day)
    try:
        return open(filename)
    except FileNotFoundError:
        urllib.request.urlopen("http://norvig.com/ipython/" + filename)

def transpose(matrix): return zip(*matrix)

def first(iterable): return next(iter(iterable))

def firsttrue(iterable): return first(it for it in iterable if it)

def counttrue(iterable): return sum(bool(it) for it in iterable)

cat = ''.join

Ø   = frozenset() # Empty set
inf = float('inf')
BIG = 10 ** 999

def grep(pattern, lines):
    "Print lines that match pattern."
    for line in lines:
        if re.search(pattern, line):
            print(line)

def groupby(iterable, key=lambda it: it):
    "Return a dic whose keys are key(it) and whose values are all the elements of iterable with that key."
    dic = defaultdict(list)
    for it in iterable:
        dic[key(it)].append(it)
    return dic

def powerset(iterable):
    "Yield all subsets of items."
    items = list(iterable)
    for r in range(len(items)+1):
        for c in combinations(items, r):
            yield c

# 2-D points implemented using (x, y) tuples
def X(point): return point[0]
def Y(point): return point[1]

def neighbors4(point): 
    "The four neighbors (without diagonals)."
    x, y = point
    return ((x+1, y), (x-1, y), (x, y+1), (x, y-1))

def neighbors8(point): 
    "The eight neifhbors (with diagonals)."
    x, y = point 
    return ((x+1, y), (x-1, y), (x, y+1), (x, y-1),
            (X+1, y+1), (x-1, y-1), (x+1, y-1), (x-1, y+1))

def cityblock_distance(p, q=(0, 0)): 
    "City block distance between two points."
    return abs(X(p) - X(q)) + abs(Y(p) - Y(q))

def euclidean_distance(p, q=(0, 0)): 
    "Euclidean (hypotenuse) distance between two points."
    return math.hypot(X(p) - X(q), Y(p) - Y(q))

def trace1(f):
    "Print a trace of the input and output of a function on one line."
    def traced_f(*args):
        result = f(*args)
        print('{} = {}'.format(_callstr(f, args), result))
        return result
    return traced_f

def trace(f):
    "Print a trace of the call and args on one line, and the return on another."
    def traced_f(*args):
        print(_callstr(f, args))
        trace.indent += 1
        try:
            result = f(*args)
        finally:
            trace.indent -= 1
        print('{} = {}'.format(_callstr(f, args), result))
        return result
    return traced_f
trace.indent = 0

def _callstr(f, args):
    "Return a string representing f(*args)."
    return '{}{}({})'.format('> ' * trace.indent, f.__name__, ', '.join(map(str, args)))
        
def astar_search(start, h_func, move_func):
    "Find a shortest sequence of states from start to a goal state (a state s with h_func(s) == 0)."
    frontier  = [(h_func(start), start)] # A priority queue, ordered by path length, f = g + h
    previous  = {start: None}  # start state has no previous state; other states will
    path_cost = {start: 0}     # The cost of the best path to a state.
    while frontier:
        (f, s) = heappop(frontier)
        if h_func(s) == 0:
            return Path(previous, s)
        for s2 in move_func(s):
            new_cost = path_cost[s] + 1
            if s2 not in path_cost or new_cost < path_cost[s2]:
                heappush(frontier, (new_cost + h_func(s2), s2))
                path_cost[s2] = new_cost
                previous[s2] = s
    return dict(fail=True, front=len(frontier), prev=len(previous))
                
def Path(previous, s): 
    "Return a list of states that lead to state s, according to the previous dict."
    return ([] if (s is None) else Path(previous, previous[s]) + [s])
{{< / highlight >}}

Read the <a href="http://nbviewer.jupyter.org/url/norvig.com/ipython/Advent%20of%20Code.ipynb">full post</a> for more interesting ideas and elegant solutions.