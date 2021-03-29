---
boldLinks: true
date: 2010-12-27T00:00:00Z
tags:
- Python
title: Unicode and UTF Overview
url: /2010/12/unicode-overview/
---

<p>This post is a brief technival overview of <a href="http://en.wikipedia.org/wiki/Unicode">Unicode</a>, a widely used standard for multilingual character representation, and the family of UTF-x encoding algorithms. First a brief introduction to Unicode:</p>

<blockquote>
<p>Unicode is intended to address the need for a workable, reliable world text encoding.</p>
<p>Unicode could be roughly described as &ldquo;wide-body ASCII&rdquo; that has been stretched to 16 bits to encompass the characters of all the world&rsquo;s living languages. In a properly engineered design, 16 bits per character are more than sufficient for this purpose.</p>
<p><a href="http://www.unicode.org/history/unicode88.pdf">http://www.unicode.org/history/unicode88.pdf</a></p>
</blockquote>
<h2>Character Representation: Code Points and Planes</h2>
<p>The reference to a specific character is called a code-point. ASCII for example uses 8 bit per character, which allows for 2^8 = 256 different characters (code-points).</p>
<p>Unicode uses <strong>16 bits (2 bytes) per code-point</strong> and furthermore associates each code-point with one of 17<a href="http://en.wikipedia.org/wiki/Unicode_plane">planes</a>. Therefore Unicode provides 2^16 = 65,536 unique code-points per plane, with 2^16 * 17 = 1,114,112 maximum total unique code-points.</p>
<p>Currently only 6 of the 17 available planes are used:</p>
<table>
<tbody>
<tr>
<td><strong>Plane &nbsp;&nbsp;&nbsp;</strong></td>
<td><strong>Unicode repr.</strong></td>
<td><strong>Description</strong></td>
</tr>
<tr>
<td>0</td>
<td>U+0000 &hellip; U+FFFF</td>
<td>Basic Multilingual Plane</td>
</tr>
<tr>
<td>1</td>
<td>U+10000 &hellip; U+1FFFF</td>
<td>Supplementary Multilingual Plane</td>
</tr>
<tr>
<td>2</td>
<td>U+20000 &hellip; U+2FFFF</td>
<td>Supplementary Ideographic Plane</td>
</tr>
<tr>
<td>14</td>
<td>U+E0000 &hellip; U+EFFFF</td>
<td>Supplementary Special-purpose Plane</td>
</tr>
<tr>
<td>15-16</td>
<td>U+F0000 &hellip; U+10FFFF&nbsp;&nbsp;&nbsp;</td>
<td>Private Use Area</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>
<div>&nbsp;</div>
<p>Unicode code points of the first plane use two bytes, all other planes require a third byte to indicate the plane (blue color above).</p>
<p>Code points U+0000 to U+00FF (0-255) are identical to the Latin-1 values, so converting between them simply requires converting code points to byte values. In fact any document containing only characters of the first 127 code-points of the <a href="http://www.asciitable.com/">ASCII character map</a> is a perfectly valid UTF-8 encoded Unicode document.</p>
<h2>Character Encoding: UTF-8, 16 and 32</h2>
<p>&nbsp;</p>

{{< highlight python >}}
>>> u = u"€"
>>> u
u'\u20ac'
>>> bytearray(u)
Traceback (most recent call last):
  File "", line 1, in
TypeError: unicode argument without an encoding
>>>
{{< / highlight >}}


<p>This is where Unicode Transformation Formats (UTF) come into play. UTF-8/16/32 encoding stores any given unicode byte-array into either a variable amount of 8 bit blocks, or one or multiple 16 or 32 bit blocks.</p>
<h4>UTF-8</h4>
<p><a href="http://en.wikipedia.org/wiki/UTF-8">UTF-8</a> is a variable-width encoding, with each unicode character represented by one to four bytes. A main advantage of UTF-8 is backward compatibility with the <a href="http://www.asciitable.com/">ASCII charset</a>, allowing us to use the same decoding function for both any ASCII text and any utf-8 encoded unicode text.</p>
<p>If the character is encoded into just one byte, the high-order bit is 0 and the other bits represent the code point (in the range 0..127). If the character is encoded into a sequence of more than one byte, the first byte has as many leading &rsquo;1&prime; bits as the total number of bytes in the sequence, followed by a &rsquo;0&prime; bit, and the succeeding bytes are all marked by a leading &ldquo;10&Prime; bit pattern. The remaining bits in the byte sequence are concatenated to form the Unicode code point value.</p>
<h4>UTF-16</h4>
<p><a href="http://en.wikipedia.org/wiki/UTF-16">UTF-16</a> always uses two bytes for encoding each code-point, and is thereby limited to characters of only the &ldquo;Basic Multilingual Plane&rdquo; (U+0000 to U+FFFF). Unicode code-points of other planes use 3 bytes and UTF-16 converts these into two 16-bit pairs, called a surrogate pair.</p>
<h4>UTF-32</h4>
<p><a href="http://en.wikipedia.org/wiki/UTF-32">UTF-32</a> always uses exactly four bytes for encoding each Unicode code point (if the endianess is specified).</p>
<h4>Summary</h4>
<ul>
<ul>
<li>UTF-8 can encode any code-point of any plane, and compresses lower code-points into fewer bytes (eg. ASCII charset into 1 byte). UTF-8 furthermore shares a common encoding with the first 127 code-points of the ASCII character set. Recommended for everything related to text.</li>
<li>UTF-16 always saves 16 bit blocks without compression. If Unicode character is of a higher plane than 0 it has three bytes, and UTF-16 needs two 16-bit groups to represent it (see the euro &euro; sign example below)</li>
<li>UTF-32 encodes all Unicode code-points, but always saves 32 bit groups with no compression</li>
</ul>
</ul>
<p>.</p>
<h4>Examples</h4>

{{< highlight python >}}
>>> u = u"a"
>>> u
u'a'
>>> repr(u.encode("utf-8"))
"'a'"
>>> repr(u.encode("utf-16"))    # no endianess specified
"'\\xff\\xfea\\x00'"
>>> repr(u.encode("utf-16-le")) # little endian byte order
"'a\\x00'"
>>> repr(u.encode("utf-16-be")) # big endian byte order
"'\\x00a'"
>>> repr(u.encode("utf-32"))
"'\\xff\\xfe\\x00\\x00a\\x00\\x00\\x00'"
>>> repr(u.encode("utf-32-le"))
"'a\\x00\\x00\\x00'"
>>> repr(u.encode("utf-32-be"))
"'\\x00\\x00\\x00a'"

>>> u = u"€"
>>> u
u'\u20ac'
>>> repr(u.encode("utf-8"))
"'\\xe2\\x82\\xac'"
>>> repr(u.encode("utf-16"))
"'\\xff\\xfe\\xac '"
>>> repr(u.encode("utf-16-le"))
"'\\xac '"
>>> repr(u.encode("utf-16-be"))
"' \\xac'"
>>> repr(u.encode("utf-32"))
"'\\xff\\xfe\\x00\\x00\\xac \\x00\\x00'"
>>> repr(u.encode("utf-32-le"))
"'\\xac \\x00\\x00'"
>>> repr(u.encode("utf-32-be"))
"'\\x00\\x00 \\xac'"
{{< / highlight >}}


<div>
<h2>Feedback</h2>
<p>Please leave a comment if you have feedback or questions!</p>
</div>
<h2>Further Reading</h2>
<ul>
<li><a href="http://www.unicode.org/">http://www.unicode.org/</a></li>
<li><a href="http://en.wikipedia.org/wiki/Unicode">http://en.wikipedia.org/wiki/Unicode</a></li>
<li><a href="http://en.wikipedia.org/wiki/Unicode_plane">http://en.wikipedia.org/wiki/Unicode_plane</a></li>
<li><a href="http://en.wikipedia.org/wiki/UTF">http://en.wikipedia.org/wiki/UTF</a></li>
<li><a href="http://en.wikipedia.org/wiki/Character_encoding">http://en.wikipedia.org/wiki/Character_encoding</a></li>
<li><a href="http://docs.python.org/howto/unicode.html">http://docs.python.org/howto/unicode.html</a></li>
</ul>
