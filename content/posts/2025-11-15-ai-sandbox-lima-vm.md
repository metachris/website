+++
date = "2025-11-22"
title = "Running AI Dev Tools Safely: A Practical VM Sandboxing Guide"
description = "AI coding assistants and npm/pip can steal your credentials and data. Here's how to run them safely in isolated VMs using Lima on macOS/Linux."
images = ["/images/posts/ai-sandbox/cover.jpg"]  # 1200 x 675 px
tags = ["AI", "VM", "Security"]
hideTags = true
+++

{{< load-photoswipe >}}

AI coding assistants, npm, pip, and similar dev tools can run arbitrary code on your machine, and steal SSH keys, API tokens, wallet keys, sensitive credentials and other private data without you noticing.

This guide shows you how to sandbox these tools in isolated VMs using [Lima](https://github.com/lima-vm/lima), to develop freely without risking your data.
[Jump straight to the guide](#lima-vm-introduction), or read on for a bit of personal context.


<style type="text/css">
    .fig1-wrap img {
        border: 1px solid #b5b5b5;
        border-radius: 3px;
    }
</style>

<center class="fig1-wrap" style="max-width: 800px; margin:auto; margin-top: 3.5rem;">
{{< figure src="/images/posts/ai-sandbox/cover.jpg" alt="Cooperation flow for creating a signature" caption="" class="fig1" >}}
</center>

---

# Contents

{{< TableOfContents >}}

---

## Personal Context

I've been having quite a bit of fun with AI assisted coding recently.

I use it for a wide range of things, including discussing architecture, design choices, learning about new tools and libraries I wasn't previously aware of, to quickly cranking out dirty prototypes.

Especially for hobby projects that are not meant to ever go into production, I'm playing with AI tools fast and loose, producing results quickly and not getting slowed down by annoying things such as reading code before running it 🤣.

And yeah... that's obviously unsafe, unless it's all contained in a sandbox!

You should never run potentially dangerous, experimental code on your main machine, since it could steal your passwords, API keys, environment variables, private keys, access to your communication tools, install services, and do all sorts of other nefarious things.

I've learned to isolate all my devtools in a VM, and wanted to put together a guide that shows how to do this. Hope it'll be useful to you, too!

You'll want to run the entire development environment, including the AI tool itself, inside a sandbox. This way it's safe to install dependencies and to execute code, and unlocks other fun features like snapshots before running sketchy code, and reverting if something goes wrong.

And it's not just AI-generated code. Node.js/npm/yarn and Python/pip are particularly troublesome because they allow any package to run arbitrary scripts on your system during installation, and install tons of additional dependencies that can do the same. This attack vector is called "[supply chain attack](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/Supply_chain_attacks)" and [it](https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem) [happens](https://socket.dev/blog/ongoing-supply-chain-attack-targets-crowdstrike-npm-packages) [all](https://semgrep.dev/blog/2025/security-alert-nx-compromised-to-steal-wallets-and-credentials/) [the](https://www.kaspersky.com/about/press-releases/kaspersky-uncovers-year-long-pypi-supply-chain-attack-using-ai-chatbot-tools-as-lure) [time](https://checkmarx.com/zero-post/python-pypi-supply-chain-attack-colorama/).

---


## Why VMs over Docker?

There are two practical methods for isolating development tools from your host operating system: Docker and Virtual Machines (VMs). VMs provide much stronger protection and more flexibility overall, and are better suited for co-developing with AIs.

Docker containers share the host operating system's kernel, which means they're fundamentally running on the same system as your main machine, just with isolated namespaces and resource limits. This creates several security concerns:

- **Kernel vulnerabilities**: If malicious code finds a kernel exploit, it can potentially escape the container and access the host system. These exploits are discovered regularly, and you're betting that your kernel is fully patched and has no zero-days.
- **Shared resources**: Containers share the same kernel, which means they're accessing the same system calls, device drivers, and kernel modules. This expanded attack surface has led to numerous container escape vulnerabilities over the years.
- **Limited isolation**: While Docker provides process and filesystem isolation, it's more of a convenience boundary than a true security barrier. Tools like `docker run --privileged` or mounting host directories can easily weaken or bypass these protections, and AI-generated code might do exactly that without you noticing.

In contrast, a VM runs its own complete operating system with its own kernel. The hypervisor (like QEMU/KVM) creates a much stronger isolation boundary. Even if malicious code completely compromises the VM, it would need to exploit the hypervisor itself to reach your host, a significantly harder target.

Furthermore, a VM enables better concurrency. It can run Docker containers, databases, web servers, multiple build processes, and background services all at once, and the AI tool can interact with everything naturally just like on a normal development machine.


---

## Lima VM Introduction

In this guide, we use [Lima VM](https://lima-vm.io) to sandbox AI and devtools. Lima is a delightful, lightweight virtual machine manager for Linux and macOS which provides easy and quick ways to create and manage VMs.

You interact with Lima through the `limactl` command:

```bash
# List all VM instances
limactl list

# Create a new VM using the "default" template (Ubuntu 25.10 + home directory mount)
limactl start --name dev template:default

# Open a shell
limactl shell dev

# Open a shell with SSH
ssh -F ~/.lima/dev/ssh.config lima-dev

# Restart
limactl restart dev

# Delete a VM instance
limactl delete dev -f

# Show a list of available templates
limactl start --list-templates

# Start an instance using another template and a custom name
limactl start --name dev template:debian
```

**Notes:**
- Lima mounts your entire home directory from the host into the VM by default, which is something we want to avoid to protect our files. The guide below shows how to do that using custom VM templates.
- Lima places all VM related configurations and files into the `~/.lima` directory (specifically `~/.lima/<vm_name>/` and `~/.lima/_config/`).

**About Lima:**

- https://lima-vm.io
- https://github.com/lima-vm/lima (20k stars)
- https://jvns.ca/blog/2023/07/10/lima--a-nice-way-to-run-linux-vms-on-mac
- https://www.youtube.com/watch?v=2SGyhd5OI-c
- Lima is part of Linux Foundation's [Cloud Native Computing Foundation (CNCF)](https://www.cncf.io/)

**Lima Templates:**

VMs are based on templates, which can include (build on) other templates:
- https://github.com/lima-vm/lima/blob/master/templates/default.yaml
- https://github.com/lima-vm/lima/blob/master/templates/ubuntu-25.10.yaml
- https://github.com/lima-vm/lima/blob/master/templates/README.md

### Install Lima

The [Lima VM docs](https://lima-vm.io/docs/installation/) have platform-specific installation guides.

Homebrew is recommended on macOS:

```bash
# Install
brew install lima

# Update
brew upgrade lima
```

On Linux install the binary like this:

```bash
VERSION=$(curl -fsSL https://api.github.com/repos/lima-vm/lima/releases/latest | jq -r .tag_name)
curl -fsSL "https://github.com/lima-vm/lima/releases/download/${VERSION}/lima-${VERSION:1}-$(uname -s)-$(uname -m).tar.gz" | tar Cxzvm /usr/local
curl -fsSL "https://github.com/lima-vm/lima/releases/download/${VERSION}/lima-additional-guestagents-${VERSION:1}-$(uname -s)-$(uname -m).tar.gz" | tar Cxzvm /usr/local
```

Ensure you have an up-to-date version!

```bash
$ limactl --version
limactl version 2.0.1
```

---

## Getting started

Next, we will:

- prepare a shared directory
- setup VM defaults
- kick off our first VM

Let's dive right in!

### Prepare a shared directory

We only want to share very specific host directories with the VM.

Let's create `~/VM-Shared` on the host, which we later mount into the VM at `~/Shared` (with write access):

```bash
mkdir ~/VM-Shared
```

### Setup VM defaults

Defaults for all VMs can be defined in `~/.lima/_config/default.yaml`.

Let's enable the following:
1. Mount `~/VM-Shared` from the host (on `~/Shared` inside the VM).
2. Forward ports from the VM to the host (i.e. the range from 8000 to 9000). Note that after the host machine suspends, port forwarding may stop working and needs a VM restart.

Let's create the default YAML file:

```bash
cat > .lima/_config/default.yaml << EOF
mounts:
- location: "~/VM-Shared"
  mountPoint: "{{.Home}}/Shared"
  writable: true

portForwards:
- guestPortRange: [8000, 9000]
  hostPortRange: [8000, 9000]
EOF
```

Note: You could also mount other existing project directories from your host if/as useful.

### Prepare easy SSH access

Lima conveniently creates default SSH configuration files for all VM instances, which makes it easy to log in with SSH (including using VS Code for a Remote-SSH session).

I recommend using a `~/.ssh/config.d/` directory on the host and have SSH include all configs there by default. That allows us to simply link the Lima-created config files there to use them.

Create the directory:

```bash
mkdir ~/.ssh/config.d
```

Add this as first line in your `~/.ssh/config` file, to make SSH include all configs from there:

```conf
Include config.d/*
```

Great! After creating a new VM, we can now simply create a symlink to the Lima-generated SSH configs and use it to SSH into the instance.


### Start a VM

Let's start an Ubuntu 25.10 VM instance, named `dev`.

To disable the automatic home directory sharing, we use the [`_images/ubuntu-25.10.yaml` template](https://raw.githubusercontent.com/lima-vm/lima/refs/heads/master/templates/_images/ubuntu-25.10.yaml):

```bash
limactl start --name dev -y template:_images/ubuntu-25.10.yaml
```

Note: You can also manually disable home directory sharing by editing the template when starting the VM or afterwards in `~/.lima/<vm_name>/lima.yaml`.

<details>
<summary>Expand for a few useful commands to manage the VM lifecycle.</summary>


```bash
# Restart the VM
limactl restart dev

# Stop the VM
limactl stop dev

# Start the VM
limactl start dev

# Delete the VM
limactl delete dev -f
```

</details>


### SSH into the VM

Create a symlink for the SSH config file and SSH into the VM:

```bash
# Create a symlink for the SSH config file
ln -s ~/.lima/dev/ssh.config ~/.ssh/config.d/lima-dev

# SSH into the VM
ssh lima-dev

# Once inside the VM, look around...
metachris@lima-dev:~$ uname -m
aarch64

metachris@lima-dev:~$ uname -a
Linux lima-dev 6.17.0-5-generic #5-Ubuntu SMP PREEMPT_DYNAMIC Mon Sep 22 09:50:31 UTC 2025 aarch64 GNU/Linux

metachris@lima-dev:~$ ls -alh
total 36K
drwxr-xr-x 7 metachris root      4.0K Nov 19 12:32 .
drwxr-xr-x 3 root      root      4.0K Nov 19 12:31 ..
-rw-r--r-- 1 metachris root       116 Nov 19 12:31 .bashrc
drwx------ 2 metachris metachris 4.0K Nov 19 12:32 .cache
drwxr-xr-x 5 metachris root      4.0K Nov 19 12:32 .config
drwxrwxr-x 3 metachris metachris 4.0K Nov 19 12:32 .local
-rw-r--r-- 1 metachris root       116 Nov 19 12:31 .profile
drwx------ 2 metachris metachris 4.0K Nov 19 12:31 .ssh
-rw-r--r-- 1 metachris root       116 Nov 19 12:31 .zshrc
drwxr-xr-x 3 metachris metachris   96 Nov 19 09:55 Shared
#                the mounted Shared folder is here ^^^^^^
```

🎉 Success!


### Update Services and Setup Bash

Let's update the services on the instance, and configure git:

```bash
# Update the system
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install -y vim screen htop iotop sysstat smem ccze jq build-essential ca-certificates

# Setup git author info
git config --global core.editor "vim"
git config --global user.name "Your Name"
git config --global user.email "you@domain.net"

# Create a .bash_profile file that loads .bashrc (SSH sessions use it)
echo 'if [ -f ~/.bashrc ]; then . ~/.bashrc; fi' >> ~/.bash_profile
```

Now add a few lines to `/etc/bash.bashrc` which drastically improve the bash experience:

```bash
sudo tee -a /etc/bash.bashrc > /dev/null << 'EOF'

# Long bash history!
export HISTSIZE=262144
export HISTFILESIZE=262144

# Path and default editor
export PATH=$PATH:/usr/local/go/bin:~/go/bin/:~/.local/bin
export EDITOR="vim"
unset MAILCHECK

# General aliases
alias ll='ls -alh'
alias htop="htop --sort-key=PERCENT_CPU"
alias sr="screen -d -r"
alias as="apt search"
alias ai="sudo apt-get install"
alias s="systemctl status"
alias j="journalctl -o cat"
alias v="git describe --tags --always --dirty=-dev"
alias myip="curl -4 ifconfig.me/ip"

# Git aliases
alias g="git"
alias gs='git status -sb'
alias gd="git diff"
alias ga='git add'
alias gb='git branch'
alias gc='git commit'
alias gl='git log --pretty=format:"%h %ad | %s%d [%an]" --graph --date=short'
alias ggo="git checkout"
alias gds='git diff --staged'
alias gca="git commit -a --amend"
EOF
```

### Test Port Forwarding

Let's confirm that port forwarding works. We do this using a one-liner Python HTTP server (on port 7777) inside the VM, and accessing it from the host:

```bash
# In the VM
metachris@lima-default:~$ python3 -m http.server 7777
Serving HTTP on 0.0.0.0 port 7777 (http://0.0.0.0:7777/) ...

# On the host
$ curl localhost:7777
<!DOCTYPE HTML>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Directory listing for /</title>
</head>
<body>
<h1>Directory listing for /</h1>
<hr>
<ul>
<li><a href=".bashrc">.bashrc</a></li>
<li><a href=".cache/">.cache/</a></li>
<li><a href=".config/">.config/</a></li>
<li><a href=".local/">.local/</a></li>
<li><a href=".profile">.profile</a></li>
<li><a href=".ssh/">.ssh/</a></li>
<li><a href=".zshrc">.zshrc</a></li>
<li><a href="Shared/">Shared/</a></li>
</ul>
<hr>
</body>
</html>
```

Everything works so far! 🎉

---

## Other Developer Tools

Optionally, install a few other development tools:

### Golang

To install the latest version of Golang in the VM, we download the latest release and extract into `/usr/local/go`:

```bash
# Download latest release
GO_LATEST=$(curl -s 'https://go.dev/dl/?mode=json' | jq -r '.[0].files[] | select(.os=="linux" and .arch=="arm64") | .filename')
curl -L "https://go.dev/dl/$GO_LATEST" -o go.tar.gz

# Extract and cleanup
sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go.tar.gz
rm go.tar.gz
```

The Golang path needs to be in the `PATH` environment variable, which we have [already added before](#update-services-and-setup-bash).

Verify the installation:

```bash
$ go version
go version go1.25.4 linux/arm64
```

### Node.js

A good way to install a current version of Node.js in Ubuntu is by using [nvm, a modern node version manager](https://github.com/nvm-sh/nvm):

```bash
# Install nvm
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh -o nvm-install.sh
bash nvm-install.sh

# Update the environment
source .bashrc

# Install Node.JS long-term support
nvm install --lts
```

Now it's all installed and ready to use! Check the versions like this:

```bash
metachris@lima-default:~$ node -v
v24.11.1
metachris@lima-default:~$ npm -v
11.6.2
```

### Docker

The quickest way to install [Docker](https://docs.docker.com/get-started/get-docker/) is their official [`get-docker.sh`](https://get.docker.com/) script:

```bash
# Download and execute the installation script
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add the VM user to the docker group
sudo usermod -aG docker $USER
```

For the group changes to take effect, exit the shell and re-login (may need a VM restart).

Verify that user is in the 'docker' group:

```bash
$ groups $USER
metachris : metachris docker

# Now you can interact with Docker
$ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

### GitHub CLI

[GitHub CLI](https://cli.github.com/manual/) provides a useful `gh` cli command that let's you easily interact with GitHub and private repositories.

You can install it in the VM following the [Linux installation instructions](https://github.com/cli/cli/blob/trunk/docs/install_linux.md#debian):

```bash
(type -p wget >/dev/null || (sudo apt update && sudo apt install wget -y)) \
	&& sudo mkdir -p -m 755 /etc/apt/keyrings \
	&& out=$(mktemp) && wget -nv -O$out https://cli.github.com/packages/githubcli-archive-keyring.gpg \
	&& cat $out | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
	&& sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
	&& sudo mkdir -p -m 755 /etc/apt/sources.list.d \
	&& echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
	&& sudo apt update \
	&& sudo apt install gh -y
```

Warning: Authorizing GitHub CLI to access private repositories will leave an API key in the VM which could potentially be stolen by unauthorized scripts (which is what we wanted to avoid in first place by running everything in a VM).

Only authorize it with `gh auth login` for private repo access if you accept the risks! I personally avoid having any sensitive credentials in the VM, in particular those that allow access to private GitHub repositories.

---

## Visual Studio Code - Remote-SSH Session

If you prefer an IDE like VS Code, you can use Remote-SSH to start a session inside the instance:

1. Press `Shift + cmd + P` to open the command palette
1. Type `ssh` and choose `Remote-SSH: Connect to Host...`
  {{< figure link="/images/posts/ai-sandbox/vs-code-ssh1.png" width="600px" alt="Command Palette - Remote-SSH" >}}
1. Choose `lima-default` (your SSH targets should automatically show up there)
  {{< figure link="/images/posts/ai-sandbox/vs-code-ssh2.png" width="600px" alt="Choosing lima-default as SSH target" >}}

Now a new VS Code window opens, and sets up VS Code Server:

{{< figure link="/images/posts/ai-sandbox/vs-code-ssh3.png" width="600px" alt="New VS Code window, setting up VS Code Server" >}}

Then you can click "Open" and choose a folder, like `Shared`:

{{< figure link="/images/posts/ai-sandbox/vs-code-ssh4.png" width="600px" alt="Clicking on Open shows a list of available directories" >}}

---

## Claude Code, Codex and Gemini

Before setting up the tools, let's create a "Hello World" directory in the Shared folder as our playground:

```bash
# Create the hello world directory and change into it
mkdir -p ~/Shared/HelloWorld
cd ~/Shared/HelloWorld

# Create an empty README.md
touch README.md
```

### Claude Code

Let's start with installing [Claude Code](https://code.claude.com) in the VM, following the instructions in the [documentation](https://code.claude.com/docs/en/setup):

Install Claude Code CLI:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Start Claude:

```bash
claude
```

On first start, Claude asks you to authorize it. I chose "Anthropic Console account", opened the link in the browser, authorized it, and pasted the auth code into the cli. Alternatively, you can set an Anthropic API key in the `ANTHROPIC_API_KEY` environment variable (in `.bashrc`).

Claude Code CLI is now working in the VM! 🎉

{{< figure link="/images/posts/ai-sandbox/claude1.png" alt="Claude CLI" >}}

Since Claude is running in a VM, it might be permissible to run it in "dangerously skip permissions mode", which makes it bypass all permission checks:

```bash
claude --dangerously-skip-permissions
```

You could also create an alias for it and add it to your `.bashrc`:

```bash
alias claude="claude --dangerously-skip-permissions"
```

#### Claude Code VS Code Extension

Anthropic provides [documentation for using Claude in VS Code](https://code.claude.com/docs/en/vs-code), and also offer a [VS Code Claude extension](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code).

You can install the Claude extension in the VM through the Remote-SSH session window:

{{< figure link="/images/posts/ai-sandbox/vs-code-ssh5.jpg" width="" alt="Clicking on Open shows a list of available directories" >}}

For some reason, the authentication flow doesn't work for me through the user interface :( To work around that issue, I manually get a Claude API key and set it as an environment variable in the VM:

- Add a new key via https://console.anthropic.com/settings/keys
- Edit `.bashrc` and set the env var:

```bash
export ANTHROPIC_API_KEY=sk-ant-api03-x-y...
```

Reload the VS Code window (open command palette with `Shift + CMD + P` and choose "Developer: Reload Window"):

{{< figure link="/images/posts/ai-sandbox/vs-code-reload.png" width="600px" alt="VS Code command palette: Reload Window" >}}

Now the VS Code Claude extension should work:

{{< figure link="/images/posts/ai-sandbox/vs-code-claude1.png" alt="Claude Code working in VS Code" >}}

If you want to enable "dangerously skip permissions mode" in the VS Code extension, you can enable it via your user settings. Open the settings (`CMD + ,`), search for "claude" and enable "Claude Code: Allow Dangerously Skip Permissions":

{{< figure link="/images/posts/ai-sandbox/vs-code-claude-perms.png" alt="Claude Code: Allow Dangerously Skip Permissions" >}}

All done!

---

### Gemini CLI

Let's install [Gemini CLI](https://geminicli.com/) from Google next.

The [documentation](https://geminicli.com/docs/get-started/deployment/) recommends installing it with `npm`, the Node.js package manager. You'll need to install Node and npm first, see also the [Node.js setup instructions](#nodejs).

Install Gemini CLI:

```bash
npm install -g @google/gemini-cli
```

Run Gemini CLI:

```bash
gemini
```

It will ask you to authenticate:

{{< figure link="/images/posts/ai-sandbox/gemini1.png" alt="Gemini CLI initial window" >}}

I chose "Login with Google". For some reason, I needed to try it twice and it worked on the second attempt.

After authorization is done, Gemini CLI works!

{{< figure link="/images/posts/ai-sandbox/gemini3.png" alt="Gemini CLI works" >}}

You can run Gemini in YOLO mode:

> Automatically accept all actions (aka YOLO mode, see https://www.youtube.com/watch?v=xvFZjo5PgG0 for more details)

```bash
gemini --yolo
```

The alias you could define in `.bashrc`:

```bash
alias gemini="gemini --yolo"
```

---

### Codex CLI

[Codex CLI](https://developers.openai.com/codex/cli/) is the AI dev tool from OpenAI/ChatGPT.

Let's install it:

```bash
npm i -g @openai/codex
```

Run Codex CLI:

```bash
codex
```

It will ask you to sign in, either via ChatGPT or by providing an API key:

{{< figure link="/images/posts/ai-sandbox/codex1.png" alt="Codex CLI initial window" >}}

After that is done, Codex CLI is ready to work for you!

{{< figure link="/images/posts/ai-sandbox/codex4.png" alt="Codex CLI ready" >}}

You can also run Codex in dangerous mode:

> Skip all confirmation prompts and execute commands without sandboxing. EXTREMELY DANGEROUS. Intended solely for running in environments that are externally sandboxed

```bash
codex --dangerously-bypass-approvals-and-sandbox
```

The alias for your `.bashrc`:

```bash
alias codex="codex --dangerously-bypass-approvals-and-sandbox"
```

---

### Other tools

There are several other great tools worth a mention:

- **[Aider](https://aider.chat/)** - Command-line AI pair programming tool, works with multiple LLMs (GPT-4, Claude, etc.). Very popular in the CLI AI dev space.
- **[GitHub Copilot CLI](https://github.com/features/copilot/cli)** - Command-line AI pair programming tool, works with multiple LLMs (GPT-4, Claude, etc.). Very popular in the CLI AI dev space.
- **[Continue.dev](https://www.continue.dev/)** - VS Code extension that supports several LLM backends
- **[Cline](https://github.com/cline/cline)** - VS Code extension that supports several LLM backends

Drop your favorite tools in the comments below!

---

I hope this guide helped you get started quickly and right-footed.


As always, please leave feedback, questions and ideas in the comments below.

Have fun coding! 🛠️