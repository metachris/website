+++
draft = true
date = "2020-11-21"
title = "--- TMP --- Resuming work on ESP32 & Micropython & LED control 🤖"
+++

---

Plugging in the ESP32 with Micropthon flashed from last time.

* https://docs.micropython.org/en/latest/esp8266/tutorial/index.html

Does it still connect to network? If not, connect to USB and connect to the serial interface:

    screen /dev/tty.SLAB_USBtoUART 115200

(TODO: How to find out if it is connected / which tty to choose?)


### Check network status in REPL

Once connected, check the network status:

```python
>>> import network
>>> sta_if = network.WLAN(network.STA_IF)
>>> sta_if.isconnected()
True
>>> sta_if.ifconfig()
('10.12.50.101', '255.255.255.0', '10.12.50.1', '10.0.0.1')
```

In this case, the IP is `10.12.50.101`. If WebREPL is enabled, you can now connect with the browser: http://micropython.org/webrepl/?#10.12.50.101:8266/

If there is no network connection, start here:

```python
# Scan for and show available wifi networks
import network
>>> sta_if = network.WLAN(network.STA_IF)
>>> sta_if.active(True)
>>> sta_if.scan()

# Now connect
```

### How to figure out which program is currently running

See the content of `boot.py`, through the REPL:

```python
>>> print(open("boot.py").read())
```

### Enable WebREPL, to access REPL with the web browser, over the network

```
# CTRL+D for soft reboot
import webrepl_setup
```

Websocket URL for REPL over network is ws://10.12.50.101:8266

Webrepl Web UI: http://micropython.org/webrepl/?#10.12.50.101:8266/

Test general websocket connectivity:

```bash
$ telnet 10.12.50.101 8266
```

### Using webreplcmd

webrepl is a Python CLI tool to list and copy files: https://pypi.org/project/webrepl/

On host (dev computer), install `webreplcmd`:

```bash
$ pip install webrepl
```

Use `webreplcmd`:

(note: any web REPL has to be closed)

```bash
$ export WEBREPL_HOST=10.12.50.101
$ export WEBREPL_PASSWORD=test

# list files
$ webreplcmd ls

# get content of boot.py
$ webreplcmd cat boot.py
```


TODO: Is it possible to access REPL from terminal over network, like with screen?


---


pixel code:

```python
import machine, neopixel

np = neopixel.NeoPixel(machine.Pin(23), 100)
# np = neopixel.NeoPixel(machine.Pin(36), 10)

for i in range(np.n):
    np[i] = (255, 0, 0)

np.write()
```

Update `boot.py` to auto-run code, then:

    webreplcmd put boot.py boot.py
    webreplcmd cat boot.py

---

TODO: how to effectively work with MicroPython and the REPL?

WebREPL is hard to paste code into. VS Code extension that runs code on the MicroPython?

---

### Get a terminal REPL over network

Requires a telnet server on the device: https://github.com/cpopp/MicroTelnetServer (download and upload to device)

    import utelnetserver
    utelnetserver.start()

https://github.com/pycom/pymakr-vsc/issues/74
