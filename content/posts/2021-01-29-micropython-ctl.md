+++
date = "2021-01-29"
title = "MicroPython-Ctl - a TypeScript library for talking to MicroPython devices"
images = ["/images/posts/micropython-ctl/landscape1.jpg"]
tags = ["MicroPython", "WebDev", "Python", "TypeScript"]
hideTags = true
+++

I'm happy to introduce **[MicroPython-Ctl](https://github.com/metachris/micropython-ctl)**: a TypeScript library for talking to [MicroPython](http://micropython.org/) devices (such as [ESP32](https://en.wikipedia.org/wiki/ESP32)/[8266](https://en.wikipedia.org/wiki/ESP8266), [Raspberry Pi Pico](https://www.raspberrypi.org/documentation/pico/getting-started/), [Pyboard](https://pyboard.org/), [WiPy](https://pycom.io/product/wipy-3-0/), and many more).

<div style="float:right; max-width: 200px;">
    <img src="/images/posts/micropython-ctl/portrait1.png" class="top-esp32" />
</div>

Use `micropython-ctl` to quickly build apps that interact with MicroPython devices: Websites / webapps, Node.js programs, [Electron](https://www.electronjs.org/) applications, [Visual Studio Code extensions](https://code.visualstudio.com/api/get-started/your-first-extension), Mobile apps (eg. with [React Native](https://reactnative.dev/)) and more.


* Connect to devices over serial or network interface
* Run Python scripts, receive the output
* Manipulate files and directories
* Terminal (REPL) interaction
* [`mctl`](https://github.com/metachris/micropython-ctl/tree/master/cli) command-line utility
* Mount MicroPython devices locally (with FUSE, experimental)
* Typed and fully async (you can use `await` with any command).
* Works on Linux, macOS and Windows

You can see all the features in the [documentation](https://metachris.github.io/micropython-ctl/index.html), [examples](https://github.com/metachris/micropython-ctl/tree/master/examples) and [`cli/`](https://github.com/metachris/micropython-ctl/blob/master/cli).

### Installation

For Node.js and Electron, install [`micropython-ctl`](https://github.com/metachris/micropython-ctl) from [npm](https://www.npmjs.com/package/micropython-ctl):

```shell
# Install with yarn
$ yarn add micropython-ctl

# or with npm
$ npm install micropython-ctl
```

To use it in the browser, include [`micropython-ctl`](https://github.com/metachris/micropython-ctl) like this:

```html
<script src="https://cdn.jsdelivr.net/npm/micropython-ctl@1.10.0/dist-browser/main.js"></script>
```

### Usage example

```js
const micropython = new MicroPythonDevice()

// Connect to micropython device over network
await micropython.connectNetwork('DEVICE_IP', 'WEBREPL_PASSWORD')

// Or connect to micropython device over serial interface
await micropython.connectSerial('/dev/ttyUSB0')

// Run a Python script and capture the output
const output = await micropython.runScript('print("Hello world")')
console.log('runScript output:', output)  // -> Hello world

// List all files in the root
const files = await micropython.listFiles()
console.log('files:', files)
/* [
  { filename: '/boot.py', size: 31, isDir: false },
  { filename: '/files', size: 0, isDir: true }
] */

// Get information about the board:
const boardInfo = await micropython.getBoardInfo()
console.log(boardInfo)
/* {
    sysname: 'esp32',
    nodename: 'esp32',
    release: '1.13.0',
    version: 'v1.13 on 2020-09-02',
    machine: 'ESP32 module with ESP32',
    uniqueId: 'c44f3312f529',
    memFree: 108736,
    fsBlockSize: 4096,
    fsBlocksTotal: 512,
    fsBlocksFree: 438
} */

// Set a terminal (REPL) data handler, and send data to the REPL
micropython.onTerminalData = (data) => process.stdout.write(data)
micropython.sendData('\x03\x02')  // Ctrl+C and Ctrl+B to enter friendly repl and print version

// Trigger a hard reset of the device
await micropython.reset()
```

See also:

* [Documentation](https://metachris.github.io/micropython-ctl/index.html)
* [Examples](https://github.com/metachris/micropython-ctl/tree/master/examples)
* [`mctl` cli](https://github.com/metachris/micropython-ctl/blob/master/cli)



### mctl

[`mctl`](https://github.com/metachris/micropython-ctl/tree/master/cli) is the accompanying cli tool, to interact with a MicroPython device from your terminal:


```shell
# Install
$ npm install -g micropython-ctl

# Print the help
$ mctl help
Usage: index [options] [command]

Options:
  -t, --tty <device>                            Connect over serial interface (eg. /dev/tty.SLAB_USBtoUART)
  -h, --host <host>                             Connect over network to hostname or IP of device
  -p, --password <password>                     Password for network device

Commands:
  devices                                       List serial devices
  repl                                          Open a REPL terminal
  run <fileOrCommand>                           Execute a Python file or command
  info [options]                                Get information about the board (versions, unique id, space, memory)
  ls [options] [directory]                      List files on a device
  cat <filename>                                Print content of a file on the device
  get <file_or_dirname> [out_file_or_dirname]   Download a file or directory from the device. Download everything with 'get /'
  put <file_or_dirname> [dest_file_or_dirname]  Upload a file or directory onto the device
  edit <filename>                               Edit a file, and if changed upload afterwards
  mkdir <name>                                  Create a directory
  rm [options] <path>                           Delete a file or directory
  mv <oldPath> <newPath>                        Rename a file or directory
  sha256 <filename>                             Get the SHA256 hash of a file
  reset [options]                               Reset the MicroPython device
  mount [targetPath]                            Mount a MicroPython device (over serial or network)
  version                                       Print the version of mctl
  help [command]                                display help for command
```

Examples:

```shell
# List serial devices
$ mctl devices

# Get information about the board
$ mctl info

# Enter the REPL
$ mctl repl

# List files
$ mctl ls -r

# Print contents of boot.py
$ mctl cat boot.py

# Mount the device (experimental, doesn't handle binary files well)
$ mctl mount
```

### Links & References

* [Github: micropython-ctl](https://github.com/metachris/micropython-ctl)
* [Documentation](https://metachris.github.io/micropython-ctl/)
* [npm](https://www.npmjs.com/package/micropython-ctl)
* [Examples](https://github.com/metachris/micropython-ctl/tree/master/examples)
* [`mctl` command line tool](https://github.com/metachris/micropython-ctl/tree/master/cli)

<br>

---

I think MicroPython is a wonderful project, in particular for education and rapid prototyping. I hope this library is a small addition to the MicroPython ecosystem, making it easier
to use build apps that interact with live devices!

bringing everything together as a fully working first release took way longer than I anticipated, and I'm very happy that it's finally arrived.
I hope you enjoy using it for building things! If you do, let me know.

Feel free to reach out: chris@linuxuser.at / [twitter.com/metachris](https://twitter.com/metachris). I'd love hearing from you.

---

### Background

I've playing with [MicroPython](http://micropython.org/) for several small projects in recent months, and wanted a better way to interface with MicroPython over the network,
in particular for websites and Electron applications. I looked into the the official reference [webrepl implementations](https://github.com/micropython/webrepl)
and started writing some code on the off evenings.

And here we are, after a major push around Christmas to wrap the prototyping up into a usable module. As is typical, the "only last few bits" end up being quite a lot of small and medium things, let alone platform compatibility and creating testsuites which in turn discovered a few more issues.

All in all I spent way too much time on this. But the prototype was already so far along, and I wanted to get it to a state so that people can actually use this too.

And now I'm really happy that this point is reached! :)

---

### Rabbit holes & Challenges

There have been various challenges and rabbitholes, and I wanted to give some of them a honorable mention.

##### Implementing the REPL/WebREPL protocol

The primary challenge was implementing the MicroPython protocol, and making the library work with both serial and the network connections.

To start, there are several REPL modes:

1. The friendly REPL that's typically used when connecting to MicroPython. It prints all entered characters and the script output back to you.
2. The RAW REPL: You can enter it with Ctrl+A, send scripts there (characters are not printed back), and then have the script execute.
   The standard output and error output can then be collected. See the [code here](https://github.com/metachris/micropython-ctl/blob/master/src/main.ts#L463).
   The Raw REPL mode is used for executing scripts.
3. There is a [new raw-paste mode](https://github.com/micropython/micropython/blob/master/docs/reference/repl.rst#raw-mode-and-raw-paste-mode) coming that might be interesting to support.

Furthermore there are a number of commands specific to WebREPL connections: `GET_VER`, `PUT_FILE` and `GET_FILE`.

The reference implementations in the [micropython/webrepl repository](https://github.com/micropython/webrepl) were very helpful.

##### Making everything await'able

One of the challenges is making commands (and `runScript(..)`) asynchronous, so users can use `await` to wait for the collected output of the command.
This is accomplished by creating, storing and returning a Promise that is resolved or rejected at a later time when the matching response has been received.

See code [here](https://github.com/metachris/micropython-ctl/blob/master/src/main.ts#L198) and [here](https://github.com/metachris/micropython-ctl/blob/master/src/main.ts#L489).

##### Implementing commands for limited system resources

MicroPython devices have pretty limited resources, in particular memory and a slow network connection.
It's important to work with these constraints when implementing commands:

* Sending scripts in chunks with delays (I've arrived at the correct [chunksize and delays](https://github.com/metachris/micropython-ctl/blob/master/src/main.ts#L581) by trial and error)
* Uploading files: we don't want to send the whole file at once since it may be larger than the available memory. The solution is to write the data in chunks (see [code here](https://github.com/metachris/micropython-ctl/blob/master/src/main.ts#L801))
* Files content is uploaded hex-encoded (in Node: `data.toString('hex')`) and written to the file in binary (Python: `f.write(ubinascii.unhexlify(chunk))`) (see [code here](https://github.com/metachris/micropython-ctl/blob/master/src/main.ts#L800))

It was great to have reference implementations from tools such as [webrepl](https://github.com/micropython/webrepl), [ampy](https://github.com/scientifichackers/ampy/) and [rshell](https://github.com/dhylands/rshell).

##### Creating bundles for Node.js and browsers

I wanted the same codebase to work for both Node.js and browsers. The Node.js module is built using TypeScript ([config file here](https://github.com/metachris/micropython-ctl/blob/master/tsconfig.json)), and the browser module using [webpack](https://webpack.js.org/) ([config file here](https://github.com/metachris/micropython-ctl/blob/master/webpack.config.js)).

Code-wise this had several implications:

* Different WebSocket implementations across browser and Node.js. Solved by using [isomorphic-ws](https://github.com/heineiuo/isomorphic-ws).
* [`Buffer`](https://nodejs.org/api/buffer.html) is not available natively in the browser. Solved by using https://www.npmjs.com/package/buffer.
* Serial interfaces are inaccessible in the browser. Solved by including [`serialport`](http://serialport.io/) conditionally ([code here](https://github.com/metachris/micropython-ctl/blob/master/src/main.ts#L215)) and marking it as an [`external` in webpack](https://webpack.js.org/configuration/externals/) ([code here](https://github.com/metachris/micropython-ctl/blob/master/webpack.config.js#L20)).


##### Mounting the device into the filesystem (using FUSE)

Mounting a virtual filesystem in Node.js is a mess! Using FUSE is generally the way to go, but there are no maintained Node.js bindings :(

* Previously you'd have used https://github.com/mafintosh/fuse-bindings, but this library is neither maintained nor compatible with Node.js > 10.
* Development has officially moved on to https://github.com/fuse-friends/fuse-native
* `fuse-native` works almost well on macOS and Linux, just that it doesn't seem possible to return binary data (only printable string characters work, see [this issue](https://github.com/fuse-friends/fuse-native/issues/30)). And no support for Windows. And doesn't seem actively developed anymore.
* On Windows the most recent development is in https://github.com/direktspeed/node-fuse-bindings, which uses [Dokany](https://github.com/dokan-dev/dokany/wiki/Installation) as FUSE driver. It is possible to mount a virtual filesystem, but for me it crashes on reading from a file (see [this issue](https://github.com/direktspeed/node-fuse-bindings/issues/11)). Also it doesn't seem actively developed anymore.
* You can find the FUSE bindings [code here](https://github.com/metachris/micropython-ctl/blob/master/cli/mount-device.ts).

It was an interesting experiment to mount the MicroPython device on the local filesystem, but ultimately it doesn't seem good enough with the current state of the Node.js FUSE bindings.

An interesting thing here is that I didn't want to include the fuse bindings libraries by default, so whenever `mctl mount` is called, it checks if the bindings are installed, and if not asks to install it then. See [code here](https://github.com/metachris/micropython-ctl/blob/master/cli/fuse-dependencies.ts).

You can experimentally mount the MicroPython device onto your local filesystem with `mctl mount`, see [more here](https://github.com/metachris/micropython-ctl/tree/master/cli). It should work with `.py` files, but
downloading binary files will probably not work.


##### Electron

Electron discourages to use Node.js integration in renderers ([see here](https://www.electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content)).
Therefore the SerialPort module needs to be [preloaded](https://stackoverflow.com/questions/57807459/how-to-use-preload-js-properly-in-electron) and attached as `window.SerialPort` like this (`preload.js`):

```js
window.SerialPort = require('serialport');
```

##### Testing

I invested more and more time in testsuites that can be run automatically to test the major functionality of the library (see [testsuite.ts](https://github.com/metachris/micropython-ctl/blob/master/tests/testsuite.ts)).

To test cross-platform compatibility, I've spun up a few VirtualBox VMs, especially Windows 10 and Ubuntu Linux. I'm mounting the project directory and run the tests in there as well.
Finally this is easy for Windows as well, with the [VM images provided by Microsoft](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines/).

The tests run in about 6 seconds when using the serial interface, and about 50 seconds when using the network connection

I'd like to run the tests in CI, but they need an attached MicroPython device (the local build of MicroPython doesn't support a terminal or webrepl).
A workaround might be to run a telnet server on the MicroPython instance and have MicroPython-Ctl connect to that.

Needs further investigation.

---

Send feedback & comments to [twitter.com/metachris](https://twitter.com/metachris), or create an issue in the [micropython-ctl repository](https://github.com/metachris/micropython-ctl/).

🙏

