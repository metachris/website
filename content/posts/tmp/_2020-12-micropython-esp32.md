+++
draft = true
date = "2020-12-19"
title = "Introduction to MicroPython and ESP32 devices"
images = ["/images/posts/micropython-esp/esp32-2.jpg"]
+++

<!--
TODO:
* https://rdggeeknight.files.wordpress.com/2020/12/micropythondeepleepetc2.pdf
* https://docs.google.com/presentation/d/e/2PACX-1vQ-eWdos_D0nwbduJVJ6GkXIboDLqRBfReDTmjlxtgQp_OBI_GSOMdvLGC5YrENtKVxnFrpKyqham-n/pub?start=false&loop=false&delayms=3000&slide=id.ga903bf5973_1_64
* https://melbournemicropythonmeetup.github.io/July-News-Roundup/
-->
{{< load-photoswipe >}}

<style type="text/css">
/* Styles for all thumbnails on the page */
.box .img img {
    border-radius: 4px;
    border: 1px solid #eaeaea;
    /* padding: 10px; */
    background: white;
}

/* Styles for image box */
.imagebox-1 {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 20px;
    margin-bottom: 20px;
}

.imagebox-1 img {
    max-height: 300px;
}

.top-esp32 {
    float: right;
    max-width: 140px;
    margin-left: 10px !important;
    background: none;
    padding: 0px !important;
}
.top-esp32 .img img {
    background: none;
    border: 0px solid black !important;
}
</style>

{{< figure src="/images/posts/micropython-esp/logo.png" class="top-esp32"  >}}

This is a quickstart guide for MicroPython on ESP32 devices, and a comprehensive introduction to the MicroPython ecosystem.

The [ESP32](https://en.wikipedia.org/wiki/ESP32) from Espressif is an Arduino-compatible microcontroller which packs a lot of features:  Wi-Fi (802.11 b/g/n), Bluetooth (LE 5.0), a 240 MHz dual-core CPU and 520kb SRAM, and you can get for less than $8 (see [Amazon](https://www.amazon.com/ESP32/s?k=ESP32), [AliExpress](https://www.aliexpress.com/w/wholesale-esp32.html)).

[MicroPython](http://micropython.org/) is a small Python implementation for microcontrollers, allowing users to write code in Python (rather than C). This is great in particular for prototyping, teaching and learning.

Example projects you can do:

1. A physical button to toggle a LED
1. Read sensor data: temperature, humidity, light, noise, etc.
1. Control motors, lights and other connected peripherals
1. Connect to a wifi network
1. API and web interface on the device
1. Access point with captive portal

---

# Contents

{{< TableOfContents >}}

---

## The ESP32

[Espressif ESP modules](https://www.espressif.com/en/products/modules) are ca family of devices developed by the Chinese company [Espressif Systems](https://www.espressif.com/), manufactured by TSMC, and first released in 2016. The ESP32 is the successor to the ESP8266, and you can purchase a devkit for about $5 at [Amazon](https://www.amazon.com/ESP32/s?k=ESP32), [AliExpress](https://www.aliexpress.com/w/wholesale-esp32.html) and elsewhere.

I would recommend using the [ESP32-DevKitC](https://www.espressif.com/en/products/devkits/esp32-devkitc) (see [technical docs here](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/hw-reference/modules-and-boards.html#esp32-devkitc-v4)). A devkit includes the controller, broken out pins, LEDs and buttons (reset) and additionally an USB to UART bridge so you can communicate with the built-in serial interface over USB.

<div class="imagebox-1">
    {{< figure src="/images/posts/micropython-esp/esp32-2.jpg" height="300px" caption="ESP32 devkit"  >}}
    {{< figure src="/images/posts/micropython-esp/esp32-pinout.jpg" height="300px" caption="ESP-WROOM-32 example pinout" >}}
</div>

There are several different ESP modules offered by Espressif, with varying capabilities and features:

* [**ESP32 Series**](https://www.espressif.com/en/products/modules/esp32): has one or two LX6 processors (with adjustable clock frequency, ranging from 80 MHz to 240 MHz), Bluetooth LE, a deep-sleep coprocessor, Hall sensor, low-noise sense amplifiers, SD card interface, Ethernet, high-speed SPI, UART, I2S and I2C.
* [**ESP32-S2 Series**](https://www.espressif.com/en/products/socs/esp32-s2): like a lightweight ESP32, featuring a single-core LX7 processor, no bluetooth, ultra-low-power support and more RAM,
* TODO: S3 (new) https://www.espressif.com/en/news/ESP32_S3 - dual-core XTensa LX7 MCU, capable of running at 240 MHz, larger, high-speed octal SPI flash, and PSRAM with configurable data and instruction cache
* [**ESP32-C3 Series**](https://www.espressif.com/en/products/socs/esp32-c3): features a single-core RISC-V processor (up to 160MHz), Wi-Fi, Bluetooth LE 5.0

For getting started and quick prototyping, the standard ESP32 series is a solid choice.

---

<img src="/images/logos/micropython.svg" style="float:right; max-width: 200px;">

## MicroPython

[MicroPython](https://micropython.org) is a minimal Python implementation for embedded systems, allowing users to write microcontroller code in Python. This is particularly great for teaching, workshops, children, people new
to software development and prototyping.

MicroPython was [started](https://www.kickstarter.com/projects/214379695/micro-python-python-for-microcontrollers) in 2014 by Australian programmer Damien George and is actively developed by the MicroPython community
(special shoutout to [Matt Trentini](https://twitter.com/matt_trentini) and [Jim Mussared](https://twitter.com/jim_mussared) who significantly contribute to a vibrant community and development).

Primary references:

* [Homepage](https://micropython.org/), [Downloads](https://micropython.org/download/), [Wikipedia](https://en.wikipedia.org/wiki/MicroPython)
* [Github](https://github.com/micropython/micropython), [Forum](https://forum.micropython.org/index.php), [Slack](http://micropython.slack.com) ([auto invite](https://slack-micropython.herokuapp.com/))
* Awesome MicroPython: [list 1](https://github.com/mcauser/awesome-micropython), [list 2](https://github.com/pfalcon/awesome-micropython)
* [Documentation](http://docs.micropython.org/en/latest/index.html):
  * [Built-in Libraries](http://docs.micropython.org/en/latest/library/index.html)
  * [Quick reference for ESP32](http://docs.micropython.org/en/latest/esp32/quickref.html)

Code sample:

```python
import esp32
from machine import Pin
from time import sleep

LED = Pin(1)

while True:
    LED.on(); sleep(1)
    LED.off(); sleep(1)

    hall_level = esp32.hall_sensor()  # read the internal hall sensor
    print("hall:", hall_level)
```

There's two particularly notable, active forks of MicroPython:

* [CircuitPython by Adafruit](https://github.com/adafruit/circuitpython) which is shipped on most Adafruit devices. Has a pretty active community. (See also this [post about the history of CircuitPython](http://pyfound.blogspot.com/2019/05/scott-shawcroft-history-of-circuitpython.html))
* [pycopy by pfalcon](https://github.com/pfalcon/pycopy)  (Paul Sokolovsky, one of the early contributors to MicroPython). The reason for this fork seems to be disagreements with
  the creator of MicroPython (Damien P. George) about the implementation of uasyncio (read more about it [here](https://github.com/micropython/micropython/issues/2622), [here](http://www.pagema.net/micropython-fork-wars.html) and [here](https://forum.micropython.org/viewtopic.php?t=85&start=100)).

This guide uses the standard MicroPython, but most of it is transferrable to CircuitPython and pycopy.

---

## Flashing the ESP32 with MicroPython

In this step, we download MicroPython and flash it onto the ESP device.

Download it from [micropython.org/download/esp32](https://micropython.org/download/esp32), for instance [`esp32-idf3-20200902-v1.13.bin`](https://micropython.org/resources/firmware/esp32-idf3-20200902-v1.13.bin).

Install [esptool](https://pypi.org/project/esptool/), a command line utility to communicate with the ROM bootloader in Espressif ESP8266 & ESP32 microcontrollers. We will use it to erase the flash and to write MicroPython onto the device.

```
$ pip install –upgrade esptool
$ esptool.py -h
```

Now connect your ESP device with USB to your computer, and find the serial interface. Make sure to use a good USB cable; there are various bad cables that can lead to various issues or devices not being found.

 (Note: ESP32 devkits use a [CP210x USB to UART bridge](https://www.silabs.com/interface/usb-bridges/classic/device.cp2102) to access the serial interface via USB. You might need to install drivers [drivers from here](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers)).

- On macOS, the interface is `/dev/tty.SLAB_USBtoUART`
- On Linux this would be `/dev/ttyUSB0` or similar
- On Windows: ???

You can use [`serialport-list`](https://serialport.io/docs/guide-cli#serialport-list) to find available interfaces:

```shell
$ npm install -g @serialport/list
$ serialport-list
/dev/tty.SLAB_USBtoUART         Silicon Labs
```

We can use `esptool` to learn more about the chip:

~~~bash
$ esptool.py --port /dev/tty.SLAB_USBtoUART chip_id
esptool.py v3.0
Serial port /dev/tty.SLAB_USBtoUART
Connecting........__
Detecting chip type... ESP32
Chip is ESP32-D0WD (revision 1)
Features: WiFi, BT, Dual Core, 240MHz, VRef calibration in efuse, Coding Scheme None
Crystal is 40MHz
MAC: c4:4f:33:12:f5:29
Uploading stub...
Running stub...
Stub running...
Warning: ESP32 has no Chip ID. Reading MAC instead.
MAC: c4:4f:33:12:f5:29
Hard resetting via RTS pin...
~~~

Three commands to download firmware, erase flash and write MicroPython firmware on it:

```
wget https://micropython.org/resources/firmware/esp32-idf3-20200902-v1.13.bin
esptool.py --port /dev/tty.SLAB_USBtoUART erase_flash
esptool.py --port /dev/tty.SLAB_USBtoUART --chip esp32 write_flash -z 0x1000 esp32-idf3-20200902-v1.13.bin
```

At this point, you have a working MicroPython firmware on your ESP32 device, and you can connect to the REPL through the serial interface!

## Connecting to the REPL over the serial port (via USB)

REPL stands for *read–eval–print loop*. You can enter Python commands, they are executed and the output is printed (see also: [MicroPython REPL docs](http://docs.micropython.org/en/latest/esp8266/tutorial/repl.html)).

Use can use `screen`, `picocom` or any other serial terminal to connect to the serial interface:

```python
screen /dev/tty.SLAB_USBtoUART 115200

>>>
MicroPython v1.13 on 2020-09-02; ESP32 module with ESP32
Type "help()" for more information.
```

🎉 Congratulations, you are now in the MicroPython REPL!

Tips:

* You might need to press enter, and perhaps Ctrl+C to see the REPL prompt
* You can terminate the screen interface by pressing Ctrl+a and then 'k'

`help()` is a good starting point:

```python
>>> help()
Welcome to MicroPython on the ESP32!

For generic online docs please visit http://docs.micropython.org/

For access to the hardware use the 'machine' module:

import machine
pin12 = machine.Pin(12, machine.Pin.OUT)
pin12.value(1)
pin13 = machine.Pin(13, machine.Pin.IN, machine.Pin.PULL_UP)
print(pin13.value())
i2c = machine.I2C(scl=machine.Pin(21), sda=machine.Pin(22))
i2c.scan()
i2c.writeto(addr, b'1234')
i2c.readfrom(addr, 4)

Basic WiFi configuration:

import network
sta_if = network.WLAN(network.STA_IF); sta_if.active(True)
sta_if.scan()                             # Scan for available access points
sta_if.connect("<AP_name>", "<password>") # Connect to an AP
sta_if.isconnected()                      # Check for successful connection

Control commands:
  CTRL-A        -- on a blank line, enter raw REPL mode
  CTRL-B        -- on a blank line, enter normal REPL mode
  CTRL-C        -- interrupt a running program
  CTRL-D        -- on a blank line, do a soft reset of the board
  CTRL-E        -- on a blank line, enter paste mode

For further help on a specific object, type help(obj)
For a list of available modules, type help('modules')
```

Ctrl+D performs a soft reboot, which retains the last network configuration:

```python
>>>
MPY: soft reboot
network config: ('10.12.50.25', '255.255.255.0', '10.12.50.1', '45.90.28.71')
WebREPL daemon started on ws://10.12.50.25:8266
Started webrepl in normal mode
MicroPython v1.13 on 2020-09-02; ESP32 module with ESP32
Type "help()" for more information.
```

---

## Experimenting with the REPL

Here are some examples of what you can do in the REPL:

```python
>>> print("Hello world")
Hello world

# List files on the device:
>>> import os
>>> os.listdir()
['boot.py', 'main.py']

# Print content of boot.py and main.py:
>>> print(open("boot.py").read())
>>> print(open("main.py").read())

# Print Wi-Fi status
>>> import network
>>> wifi = network.WLAN(network.STA_IF)
>>> wifi.isconnected()
>>> wifi.ifconfig()
```

You can find more code in the ESP32 MicroPython docs:

* [ESP32 Quick Reference](http://docs.micropython.org/en/latest/esp32/quickref.html)
* [Pins & GPIO](http://docs.micropython.org/en/latest/esp32/quickref.html#pins-and-gpio)
* [Networking](http://docs.micropython.org/en/latest/esp32/quickref.html#networking)
* [NeoPixels (WS2812 LEDs)](http://docs.micropython.org/en/latest/esp8266/tutorial/neopixel.html)


Notes:

* To copy & paste code into the REPL, enter paste mode with Ctrl+D
* Any code entered in the REPL is not persistent, and will be lost after a reboot.

---

## Persisting code: `boot.py` and `main.py`

There are two important files that MicroPython looks for, which contain MicroPython code that will be executed whenever the board is powered up or reset:

* `/boot.py` - This file is run first on power up/reset and should contain low-level code that sets up the board to finish booting.  You typically don't need to modify boot.py unless you're customizing or modifying MicroPython itself.  However it's interesting to look at the contents of the file to see what happens when the board boots up.
* `/main.py` - If this file exists it's run after `boot.py` and should contain any main script that you want to run when the board is powered up or reset.

Simply put your code into `main.py`, and if needed import other modules from there.

The next chapter covers uploading files.


---

## Development Tools & IDEs

The REPL is only good for simple interaction and experiments, but already copy and pasting is a bit cumbersome. This is the point where we want to switch to better tools.

There's currently three IDEs:

* [MU Editor](https://codewith.mu/) from Adafruit
* [Visual Studio Code](https://code.visualstudio.com/) with the [Pymakr plugin](https://marketplace.visualstudio.com/items?itemName=pycom.Pymakr)
* [PyCharm](https://www.jetbrains.com/pycharm/download) with [MicroPython plugin](https://blog.jetbrains.com/pycharm/2018/01/micropython-plugin-for-pycharm/)

And a couple command-line tools to list and copy files, and to execute scripts from the terminal:

* [webrepl](https://github.com/micropython/webrepl) for communicating over the network.
* [ampy](https://github.com/scientifichackers/ampy) by Adafruit

For beginners, I would recommend to start with the MU Editor for the first interactions and experiments, and then switching to Visual Studio Code with the Pymakr plugin. (VS Code is a great IDE, but the Pymakr plugin can be a bit tricky to configure.)

Listing and copying files with `ampy`:

```
$ pip install adafruit-ampy
$ ampy --port /dev/tty.SLAB_USBtoUART ls
/boot.py
/main.py

# Get content of boot.py
$ ampy --port /dev/tty.SLAB_USBtoUART get boot.py

# Upload a file to the device
$ ampy --port /dev/tty.SLAB_USBtoUART put main.py
```


---

## Wi-Fi Network & Bluetooth

The device can join any Wi-Fi network, or act as a Wi-Fi access point.

Check if it is already connected:

```python
>>> import network
>>> wifi = network.WLAN(network.STA_IF)
>>> wifi.isconnected()
True
>>> wifi.ifconfig()
('10.12.50.25', '255.255.255.0', '10.12.50.1', '45.90.28.71')
```

Scan for wifi networks:

```python
>>> wifi.active(True)
>>> wifi.scan()
```

Connect to a wifi network (with a 10 second timeout, uasyncio compatible):

```python
def wifi_connect(ssid, password, devicename=None, timeout_sec=10):
    import network, time, uasyncio
    wifi = network.WLAN(network.STA_IF)
    if not wifi.isconnected():
        print('connecting to wifi network %s...' % ssid)
        wifi.active(True)
        wifi.connect(ssid, password)
        if devicename: wifi.config(dhcp_hostname=devicename)
        time_started = time.time()
        while not wifi.isconnected():
            if time.time() - time_started > timeout_sec:
                wifi.active(False)
                return False
            uasyncio.sleep_ms(1000)
    print('network config:', wifi.ifconfig())
    return True
```

Or create an access point:

```python
wifi = network.WLAN(network.STA_IF)
wifi.config(essid='ESP-AP') # set the ESSID of the access point
wifi.config(max_clients=10) # set how many clients can connect to the network
wifi.active(True)           # activate the interface
```

In access point mode you might want to have a [captive portal](https://en.wikipedia.org/wiki/Captive_portal) pop up. For working code see [github.com/metachris/micropython-captiveportal](https://github.com/metachris/micropython-captiveportal).


<strong class="subheader">Bluetooth</strong>

Read more about Bluetooth communication here:

* Docs: https://docs.micropython.org/en/latest/library/ubluetooth.html
* Examples: https://github.com/micropython/micropython/tree/master/examples/bluetooth

---

## Writing Programms

Relevant MicroPython docs:

- [Python standard libraries and micro-libraries](http://docs.micropython.org/en/latest/library/index.html)
- [Internal filesystem](http://docs.micropython.org/en/latest/esp8266/tutorial/filesystem.html), [network configuration](http://docs.micropython.org/en/latest/esp8266/tutorial/network_basics.html)
- [GPIO & pins](http://docs.micropython.org/en/latest/esp8266/tutorial/pins.html), [PWM](http://docs.micropython.org/en/latest/esp8266/tutorial/pwm.html), [ADC](http://docs.micropython.org/en/latest/esp8266/tutorial/adc.html)
- [Power control & deep sleep](http://docs.micropython.org/en/latest/esp8266/tutorial/powerctrl.html)
- [neopixel (WS2812 LEDs)](http://docs.micropython.org/en/latest/esp8266/tutorial/neopixel.html)
- [1-wire devices](http://docs.micropython.org/en/latest/esp8266/tutorial/onewire.html), [APA102 LEDs](http://docs.micropython.org/en/latest/esp8266/tutorial/apa102.html#controlling-apa102-leds), [DHT](http://docs.micropython.org/en/latest/esp8266/tutorial/dht.html)

### Running a webserver

With a webserver the device can provide an API (and a web interface to users). There are a number of MicroPython web frameworks; I recommend [tinyweb](https://github.com/belyalov/tinyweb) (in particular the fork at [github.com/metachris/tinyweb](https://github.com/metachris/tinyweb)):

```python
import tinyweb
app = tinyweb.webserver()

@app.route('/')
def index(request, response):
    await response.html('<html><body><h1>Hello, world!</h1></html>\n')

# Catch all requests with an invalid URL
@app.catchall()
def catchall_handler(request, response):
    response.code = 404
    await response.html('<html><body><h1>My custom 404</h1></html>\n')

# HTTP redirection
@app.route('/redirect')
def redirect(request, response):
    await response.redirect('/')

app.run(host='0.0.0.0', port=8081)
```

You can download the `tinyweb` module like this:

```shell
wget https://raw.githubusercontent.com/metachris/tinyweb/master/tinyweb/server.py -O tinyweb.py
```

### Running `micropython` on the dev computer

You can run `micropython` on the dev computer, which can simnplify development and allows testing code without uploading them to a device (also good for unit tests). It also provides the [`upip` package manager](https://github.com/micropython/micropython-lib/blob/master/upip/upip.py).

On macOS you can install it with [Homebrew](https://brew.sh/): `brew install micropython`. On Linux you might need to build it yourself as described here: https://github.com/micropython/micropython/wiki/Getting-Started#unix

### Advanced libraries & `upip` package manager

[micropython-lib](https://github.com/micropython/micropython-lib/) contains a large collection of curated MicroPython modules (typically modelled very closely after the CPython equivalent). The individual packages are published on PyPI with a `micropython-` prefix and can be installed with the built-in `upip` package installer:

```
$ micropython -m upip install logging
```

The downloaded libraries are stored in `~/.micropython/lib/`.


### Doing things in parallel: `uasyncio`

To do several things in parallel (like reading sensor data and listening for web requests) we need to make the code asynchronous, using [`uasyncio`](http://docs.micropython.org/en/latest/library/uasyncio.html). Since there are no threads, if we'd use `time.sleep(..)` anywhere in the code it would block other parts of the program to get executed.

```python
import uasyncio
from machine import Pin

async def blink(led, delay_ms=500):
    while True:
        led.on()
        await uasyncio.sleep_ms(delay_ms)
        led.off()
        await uasyncio.sleep_ms(delay_ms)

uasyncio.run(blink(Pin(1)))
```

`uasyncio` documentation:

* http://docs.micropython.org/en/latest/library/uasyncio.html
* https://github.com/peterhinch/micropython-async/blob/master/v3/docs/TUTORIAL.md

### A note on multiple `uasyncio` versions

It's important to note that three versions of `uasyncio` are in circulation, and asynchronous code might not be compatible between them:

1. uasyncio v3 in MicroPython 1.13+ ([docs](http://docs.micropython.org/en/latest/library/uasyncio.html), [tutorial](https://github.com/peterhinch/micropython-async/blob/master/v3/docs/TUTORIAL.md)): built-in in MicroPython 1.13+
1. uasyncio v2 for MicroPython <=1.12: [`uasyncio`](https://github.com/micropython/micropython-lib/tree/master/uasyncio), [`uasyncio.core`](https://github.com/micropython/micropython-lib/tree/master/uasyncio.core)
1. pycopy uasyncio ([docs](https://pycopy.readthedocs.io/en/latest/library/uasyncio.html)]: it's made specifically for pycopy (seems to be the reason for the fork from MicroPython), but you'll get it if you use `upip` with `micropython -m upip install micropython-uasyncio`.

I recommend to simply use MicroPython 1.13 with it's built-in uasyncio v3.

But since there are breaking changes with older uasyncio versions, asynchronous libraries and code for MicroPython 1.12 might not work with MicroPython 1.13.

You can check if you are using uasyncio v3 like this:

```python
import uasyncio
IS_UASYNCIO_V3 = hasattr(uasyncio, "__version__") and uasyncio.__version__ >= (3,)
```

### Soft and hard reset in code

**Soft reset**: clears the state of the MicroPython virtual machine, but leaves hardware peripherals unaffected:

```python
>>> import sys
>>> sys.exit()
```

**Hard reset**: same as performing a power cycle to the board:

```python
>>> import machine
>>> machine.reset()
```

---

## WebREPL

[WebREPL](https://github.com/micropython/webrepl) is used to connect a REPL over the network. You need to enable it in the serial REPL and then restart:

```python
>> import webrepl_setup
WebREPL daemon auto-start status: disabled

Would you like to (E)nable or (D)isable it running on boot?
(Empty line to quit)
> E
To enable WebREPL, you must set password for it
New password (4-9 chars): test
Confirm password: test
Changes will be activated after reboot
Would you like to reboot now? (y/n) y
```

Access the WebREPL:

* Either using the MicroPython web interface: http://micropython.org/webrepl/
* Or the `webreplcmd` command line interface: https://pypi.org/project/webrepl/

Install and run `webreplcmd`:

```shell
$ pip3 install --upgrade webrepl
$ webreplcmd --help
$ webreplcmd --host 10.12.50.101 --password test ls
[i] Listing
import os; os.listdir()
['boot.py', 'webrepl_cfg.py']
```

`webreplcmd` uses the environment variables `WEBREPL_HOST` and `WEBREPL_PASSWORD`:

```shell
export WEBREPL_HOST=10.0.1.10
export WEBREPL_PASSWORD=test
```

Copy files over the network:

```shell
# Print file content
$ webreplcmd cat main.py

# Download a file
$ webreplcmd get main.py

# Upload a file
$ webreplcmd put main.py main.py
```

Trigger a soft / hard reset:

```bash
# Soft reset
webreplcmd cmd 'import sys; sys.exit()'

# Hard reset
webreplcmd cmd 'import machine; machine.reset()'
```

---

## Example code: `main.py` boilerplate template

Example typical `main.py` template (using `uasyncio`):

```python
import gc
import time
import network
import uasyncio


def wifi_connect(ssid, password, devicename=None, timeout_sec=10):
    wifi = network.WLAN(network.STA_IF)
    if not wifi.isconnected():
        print('Connecting to wifi network %s...' % ssid)
        wifi.active(True)
        wifi.connect(ssid, password)
        if devicename: wifi.config(dhcp_hostname=devicename)
        time_started = time.time()
        while not wifi.isconnected():
            if time.time() - time_started > timeout_sec:
                wifi.active(False)
                return False
            uasyncio.sleep_ms(1000)
    print('Network config:', wifi.ifconfig())
    return True


def main():
    """
    This main() function is executed on every device restart, after boot.py.
    Put your custom code here :)
    """
    wifi_connect('YOUR_SSID', 'WIFI_PASSWORD')


# Run garbage collector and then the main function
gc.collect()
main()
```


## Example code: **webserver and captive portal**

This is an example `main.py` file which opens an access point with captive portal and an API that provides the ESP32 temperature and hall sensor data:

```python
import network
import uasyncio
import esp32
import tinyweb

ACCESSPOINT_SERVER_IP = '10.0.0.1'
SERVER_SSID = 'ESP32-AP'  # max 32 characters

def start_wifi_access_point():
    print("wifi: starting access point...")
    wifi = network.WLAN(network.AP_IF)
    wifi.active(True)
    wifi.ifconfig((ACCESSPOINT_SERVER_IP, '255.255.255.0', ACCESSPOINT_SERVER_IP, ACCESSPOINT_SERVER_IP))
    wifi.config(essid=SERVER_SSID, authmode=network.AUTH_OPEN)
    print('wifi: network config for %s:' % SERVER_SSID, wifi.ifconfig())

webserver = tinyweb.webserver()

@webserver.route('/')
@webserver.catchall()
def index(request, response):
    await response.send_file('index.html')

@webserver.route('/api')
def api_get_data(request, response):
    await response.json({
        'esp32_hall': esp32.hall_sensor(),
        'esp32_temp_f': esp32.raw_temperature()
    })

def run():
    # First of all, start the AP
    start_wifi_access_point()

    # asyncio task 1: DNS server
    loop = uasyncio.get_event_loop()
    loop.create_task(run_dns_server())

    # asyncio task 2: Webserver
    webserver.run(host='0.0.0.0', port=80, loop_forever=False)

    # loop forever
    print('Looping forever...')
    loop.run_forever()

run()
```

`index.html` can contain any HTML, CSS and JavaScript code you like:

```html
<html>
    <body>
        Hello World

        <script>
            fetch('/api')
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                })
        </script>
    </body>
</html>
```

---

I hope you found this guide useful! You can reach me via [twitter.com/metachris](https://twitter.com/metachris)

---

Notes:

