---
type: page
title: Most Simple Ajax Chat Ever
bold-links: true
url: /projects/most-simple-ajax-chat-ever/
---

**Most Simple Ajax Chat Ever**

A fun little project from January 2006. Back then ajax just started becoming popular, but with very few tools around. jQuery came out later that year, Github just two years later, in 2008.

* [Original code on Github](https://github.com/metachris/most-simple-ajax-chat-ever)
* [Original site on web.archive.org](https://web.archive.org/web/20080213154015/http://www.linuxuser.at/index.php?title=Most_Simple_Ajax_Chat_Ever)
* [Featured on Wired](https://web.archive.org/web/20161222202258/https://www.wired.com/2006/02/simple_ajax_chat/) in February 2006<br>
  <a href="http://www.wired.com/2006/02/simple_ajax_chat"><img src="/images/logos/wired.jpg" alt="wired" width="140" /></a>

**Features**

* Super simple
* Efficient spam filter (thanks to some live 'hackers' at launch)
* Only 2 files needed (`index.html`, `w.php`)
* No libraries at all (using pure `XMLHttpRequest`)
* CSS styles & usernames

**How it works**

* `index.html` reads the content & sends your message to `w.php`
* `w.php` writes the content and prunes it to `$maxlines` lines
* Content stored as text in `chat.txt`
* 2 http_requests: 1 for checking content, 1 for sending your message

**Setup in 2 Steps**

* Copy `index.html` and `w.php` in a directory of your choice
* Create a file called `chat.txt` (writeable for php)

**License: MIT**

### Source

[Code on Github](https://github.com/metachris/most-simple-ajax-chat-ever)

`w.php`

{{< highlight php >}}
<?php
    /**
     * Author: chris at linuxuser.at
     * Licence: MIT
     */

    $fn = "chat.txt";
    $maxlines = 20;

    $nick_maxlength = 10;

    /* Set this to a minimum wait time between posts (in sec) */
    $waittime_sec = 0;

    /* spam keywords */
    $spam[] = "cum";
    $spam[] = "dick";

    /* IP's to block */
    $blockip[] = "72.60.167.89";

    /* spam, if message IS exactly that string */
    $espam[] = "ajax";

    $msg = $_REQUEST["m"];
    $n = $_REQUEST["n"];

    if ($waittime_sec > 0) {
        $lastvisit = $_COOKIE["lachatlv"];
        setcookie("lachatlv", time());

        if ($lastvisit != "") {
            $diff = time() - $lastvisit;
            if ($diff < $waittime_sec) { die(); }
        }
    }

    if ($msg != "") {
        if (strlen($msg) < 2) { die(); }
        if (strlen($msg) > 3) {
            /* Smilies are ok */
            if (strtoupper($msg) == $msg) { die(); }
        }
        if (strlen($msg) > 150) { die(); }
        if (strlen($msg) > 15) {
            if (substr_count($msg, substr($msg, 6, 8)) > 1) { die(); }
        }

        foreach ($blockip as $a) {
            if ($_SERVER["REMOTE_ADDR"] == $a) { die(); }
        }

        $mystring = strtoupper($msg);
        foreach ($spam as $a) {
             if (strpos($mystring, strtoupper($a)) === false) {
                 /* Everything Ok Here */
             } else {
                 die();
             }
        }

        foreach ($espam as $a) {
            if (strtoupper($msg) == strtoupper($a)) { die(); }
        }

        $handle = fopen ($fn, 'r');
        $chattext = fread($handle, filesize($fn)); fclose($handle);

        $arr1 = explode("\n", $chattext);

        if (count($arr1) > $maxlines) {
            /* Pruning */
            $arr1 = array_reverse($arr1);
            for ($i=0; $i<$maxlines; $i++) { $arr2[$i] = $arr1[$i]; }
            $arr2 = array_reverse($arr2);
        } else {
            $arr2 = $arr1;
        }

        $chattext = implode("\n", $arr2);

        // Last spam filter: die if message has already been in the chat history
        if (substr_count($chattext, $msg) > 2) { die(); }

        $spaces = "";
        if (strlen($n) > $nick_maxlength-1) $n = substr($n, 0, $nick_maxlength-1);
        for ($i=0; $i<($nick_maxlength - strlen($n)); $i++) $spaces .= " ";

        $out = $chattext . $n . $spaces . "| " . $msg . "\n";
        $out = str_replace("\'", "'", $out);
        $out = str_replace("\\\"", "\"", $out);

        $handle = fopen ($fn, 'w'); fwrite ($handle, $out); fclose($handle);
    }
?>
{{< / highlight >}}
