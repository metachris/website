+++
date = "2026-02-10"
title = "Safe Yolo Mode: Running LLM Agents in VMs with Libvirt and Virsh"
description = "Give LLM agents shell access without risking your host system. A practical libvirt guide covering VM creation, snapshots for safe experimentation, and remote access options."
images = ["/images/posts/2026-vm-libvirt.jpg"]  # 1200 x 630 px
tags = ["AI", "LLM", "VM", "Security", "Engineering"]
hideTags = true
draft = false
+++

{{< load-photoswipe >}}

<style type="text/css">
    .fig1-wrap img {
        border: 1px solid #b5b5b5;
        border-radius: 12px;
        margin-bottom: 1.2rem;
    }
</style>

This is a quick guide about isolating LLM agents in virtual machines, using [libvirt](https://libvirt.org/) and [`virsh`](https://www.libvirt.org/manpages/virsh.html) on Linux servers.

Running LLMs inside VMs provides isolation from the host system, which reduces risks such as unauthorized file access and destructive operations. This is particularly recommended when granting LLM agents broader permissions, like auto-approving tool use without confirmation prompts (aka "yolo mode"). It's also useful to keep sessions running for extended periods of time, and to interact with agents from the phone / on the go.

<center class="fig1-wrap" style="max-width: 560px; margin:auto; margin-top: 3.5rem;">
{{< figure src="/images/posts/2026-vm-libvirt.jpg" alt="VM isolation for LLM agents, created by ChatGPT" class="fig1" >}}
</center>



**Related content:**
I published [_Sandbox Your AI Dev Tools: A Practical Guide for VMs and Lima_]({{< relref "2025-11-25-ai-sandbox-lima-vm.md" >}}) back in November, which uses [Lima VM](https://github.com/lima-vm/lima) for macOS/Linux desktop use.
Another noteworthy related post is [Claude Code On-The-Go (granda.org)](https://granda.org/en/2026/01/02/claude-code-on-the-go/) which concisely outlines a neat remote Claude Code setup, where I drew some inspiration from.

---

# Contents

{{< TableOfContents >}}

---

## Why Libvirt and Virsh?

[Libvirt](https://libvirt.org/) is the standard virtualization API for Linux, providing a unified interface to manage VMs across different hypervisors (KVM, QEMU, Xen, etc.). The `virsh` command-line tool is the primary way to interact with libvirt.

Libvirt is ideal for production-grade VM isolation of LLM agents on Linux servers, and the combination of Ubuntu cloud images and cloud-init makes VM provisioning fast, pleasant, and scriptable.

### Libvirt vs Lima: When to Use Which?

Both libvirt/virsh and [Lima]({{< relref "2025-11-25-ai-sandbox-lima-vm.md" >}}) are excellent tools for VM-based isolation, with some notable differences:

| Aspect | Libvirt/Virsh | Lima |
|--------|---------------|------|
| **Best for** | Linux servers | macOS, Linux desktop |
| **Production use** | Common, battle-tested | Primarily for development |
| **Hypervisor support** | KVM/QEMU, Xen, LXC, etc. | Apple's Virtualization.framework, QEMU |
| **Resource overhead** | Lower | Slightly higher |
| **Setup complexity** | Simple (`apt install`) | Simple (`brew install lima`) |
| **Host directory sharing** | Manual ([9p](https://www.linux-kvm.org/page/9p_virtio), [virtiofs](https://libvirt.org/kbase/virtiofs.html)) | Built-in, YAML config, home by default (dangerous) |
| **Port forwarding** | [Manual](https://wiki.libvirt.org/Networking.html) iptables/NAT config | Built-in, YAML config |
| **GUI tools** | virt-manager available | None (CLI only) |
| **Snapshots** | Native, robust | `snapshot` experimental on macOS |

For server-based LLM agent isolation, libvirt is generally the better choice due to its maturity, lower overhead, and robust management features.

---

## Installation

Install the required packages on your Ubuntu/Debian server:

```bash
sudo apt update
sudo apt install -y qemu-kvm libvirt-daemon-system virtinst
```

Enable and start the libvirt daemon:

```bash
sudo systemctl enable --now libvirtd
```

Verify the installation:

```bash
sudo virsh version
```

To avoid needing `sudo`, you could add your user to the `libvirt` group (requires re-login):

```bash
sudo usermod -aG libvirt $USER
```

---

## Download a Cloud Image

Ubuntu provides pre-built cloud images that work seamlessly with cloud-init for automated provisioning.

First, check which OS variants are available:

```bash
osinfo-query os | grep ubuntu
```

Download the Ubuntu 24.04 (Noble Numbat) cloud image:

```bash
wget https://cloud-images.ubuntu.com/noble/current/noble-server-cloudimg-amd64.img
```

Notes:
- Cloud images are minimal (~700MB) and boot quickly
- They're designed for cloud environments with cloud-init support
- For ARM servers, use the `arm64` variant instead

---

## Create a VM

Use `virt-install` to create a new VM with cloud-init for automatic provisioning:

```bash
sudo virt-install \
  --name project1 \
  --ram 16384 \
  --vcpus 4 \
  --disk size=40 \
  --import \
  --disk noble-server-cloudimg-amd64.img \
  --os-variant ubuntu24.04 \
  --cloud-init
```

This creates a VM named `project1` with:
- 16 GB RAM
- 4 vCPUs
- 40 GB disk
- Ubuntu 24.04 as the guest OS
- Cloud-init for initial setup (creates a user with SSH key)

The `--cloud-init` flag automatically configures the VM with your current user and SSH public key.

After the VM starts, you'll see the console output. Press <kbd>Ctrl</kbd> + <kbd>]</kbd> to detach from the console.

---

## VM Management with Virsh

Here are the essential [commands](https://www.libvirt.org/manpages/virsh.html) for managing your VMs:

### Lifecycle Commands

```bash
# List all VMs (running and stopped)
virsh list --all

# Start a VM
virsh start project1

# Enable autostart (start on boot)
virsh autostart project1

# Disable autostart
virsh autostart --disable project1

# Gracefully shutdown a VM
virsh shutdown project1

# Force stop a VM (like pulling the power)
virsh destroy project1

# Delete a VM and its storage
virsh undefine project1 --remove-all-storage

# Reboot a VM
virsh reboot project1
```

### Console Access

```bash
# Connect to the VM console
virsh console project1
```

Press <kbd>Ctrl</kbd> + <kbd>]</kbd> to detach from the console.

### VM Information

```bash
# Show VM details
virsh dominfo project1

# Show VM IP address
virsh domifaddr project1

# Show VM disk information
virsh domblklist project1
```

---

## Accessing the VM

This section covers ways to access the VM, depending on your needs.

### Console Access (host only)

From the host, you can connect to the VM console:

```
virsh console project1
```

### SSH Access

You can access the VM via SSH, since libvirt sets up a default NAT network that provides VMs with internal IP addresses and internet access, and cloud-init automatically adds your host's SSH key to the VM.

```bash
# Get the VM's IP address
$ virsh domifaddr project1
 Name       MAC address          Protocol     Address
-------------------------------------------------------
 vnet0      52:54:00:xx:xx:xx    ipv4         192.168.122.xxx/24

# SSH into the VM
ssh ubuntu@192.168.122.xxx
```

To access the VM from a remote machine, use the host as a jump server with ProxyJump. Note that cloud-init only adds the host's SSH key by default, so you'll need to add your remote machine's public key to the VM first:

```bash
# From the host, add your remote machine's public key to the VM
ssh ubuntu@192.168.122.xxx "echo 'ssh-ed25519 AAAA...' >> ~/.ssh/authorized_keys"

# Then from any remote machine (one-liner)
ssh -J user@your-host ubuntu@192.168.122.xxx

# Or configure in ~/.ssh/config for convenience
Host project1-vm
    HostName 192.168.122.xxx
    User ubuntu
    ProxyJump user@your-host
```

### Tailscale for Remote Access

[Tailscale](https://tailscale.com/) creates an encrypted mesh VPN between your devices, letting you connect directly to the VM from anywhere on your tailnet, without exposing anything to the public internet.
It also works when the host is behind NAT or a firewall without port forwarding. Once installed, the VM gets a stable IP and hostname on your private tailnet.

```bash
# Install Tailscale inside the VM
curl -fsSL https://tailscale.com/install.sh | sh

# Connect to your tailnet
sudo tailscale up

# Get your Tailscale IP
tailscale ip -4
```

You can use this Tailscale IP (or the Tailscale hostname) from any machine on your tailnet to access the VM.

### Expose Services with Cloudflare Tunnel

To make a dev server accessible to the public internet (e.g., for webhooks, demos, or API testing), [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) provides a quick and secure way to expose services without opening ports on your firewall.

Install `cloudflared` inside the VM:

```bash
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb -o cloudflared.deb
sudo dpkg -i cloudflared.deb
```

Create a quick tunnel (no account required, temporary URL):

```bash
cloudflared tunnel --url http://localhost:3000
```

For persistent tunnels, authenticate first:

```bash
cloudflared tunnel login
cloudflared tunnel create my-tunnel
cloudflared tunnel route dns my-tunnel myapp.example.com
cloudflared tunnel run my-tunnel
```

{{< admonition tip >}}
See also <a href="https://ngrok.com/">ngrok</a> and [Tailscale Funnel](https://tailscale.com/docs/features/tailscale-funnel) as alternatives to Cloudflare Tunnel.
{{< /admonition >}}

---

## VM Setup

### Basic tools and configuration

Once inside the VM, run basic setup:

```bash
# Update system and install essentials
sudo apt update && sudo apt upgrade -y
sudo apt install -y vim git curl build-essential htop jq ca-certificates pkg-config libssl-dev
sudo timedatectl set-timezone UTC

# Configure git
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

For a persistent coding experience, my `ubuntu` user automatically resumes the previous `tmux` session on login. Add the following to `~/.bashrc`:

```bash
# Open tmux session, if not already inside
if [[ -z "$TMUX" && $- == *i* && -t 0 ]]; then
	tmux attach -t main 2>/dev/null || tmux new -s main
fi
```

### Bash utilities and helpers


<details>
<summary>I like to add a few opinionated goodies to <code>/etc/bash.bashrc</code> (click to expand).</summary>

```bash
sudo tee -a /etc/bash.bashrc > /dev/null << 'EOF'

# Long bash history!
export HISTSIZE=262144
export HISTFILESIZE=262144

# Path with Go, default editor, and disable email notifications
export PATH=$PATH:/usr/local/go/bin:~/go/bin/:~/.local/bin
export EDITOR="vim"
unset MAILCHECK

# General aliases
alias ll='ls -alh'
alias ai="sudo apt-get install -y"
alias as="apt search"
alias htop="htop --sort-key=PERCENT_CPU"
alias v="git describe --tags --always --dirty=-dev"
alias s="systemctl status"
alias j="journalctl -o cat"

#
# Git
#
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
alias gcap="git commit -a --amend --reuse-message=HEAD && gitpbf"

# Push current branch to origin
function gitpb ()
{
    branch=$( git rev-parse --abbrev-ref HEAD );
    cmd="git push origin $branch";
    echo $cmd;
    $cmd
    git push --tags
}

# Force push current branch to origin (use with caution!)
function gitpbf ()
{
    branch=$( git rev-parse --abbrev-ref HEAD );
    cmd="git push origin $branch --no-verify --force";
    echo $cmd;
    $cmd
}

# Set upstream for current branch to origin (useful after creating a new branch)
function git-set-upstream ()
{
    branch=$( git rev-parse --abbrev-ref HEAD );
    cmd="git branch --set-upstream-to=origin/$branch $branch";
    echo $cmd;
    $cmd
}

#
# TMUX
#
alias t='tmux'
alias ta='tmux attach'
alias tl='tmux list-sessions'
alias td='tmux detach'
alias tks='tmux kill-server'

# Attach to session (with optional name): tt [name]
# If no name given, attaches to last session or creates new one
function tt() {
    if [ -n "$1" ]; then
        tmux attach-session -t "$1" 2>/dev/null || tmux new-session -s "$1"
    else
        tmux attach 2>/dev/null || tmux new-session
    fi
}

# New session (with optional name): tn [name]
function tn() {
    if [ -n "$1" ]; then
        tmux new-session -s "$1"
    else
        tmux new-session
    fi
}

# Kill session by name: tk <name>
function tk() {
    if [ -n "$1" ]; then
        tmux kill-session -t "$1"
    else
        echo "Usage: tk <session-name>"
        tl
    fi
}

EOF
```

</details>

Tmux keybindings for <kbd>H</kbd> / <kbd>J</kbd> / <kbd>K</kbd> / <kbd>L</kbd> to resize a pane:

```bash
tee -a ~/.tmux.conf > /dev/null << 'EOF'

bind -r H resize-pane -L 5
bind -r J resize-pane -D 5
bind -r K resize-pane -U 5
bind -r L resize-pane -R 5

EOF
```


### Installing LLMs and Tools

For detailed instructions on installing [Claude Code](https://code.claude.com/), [Gemini CLI](https://geminicli.com/) and [Codex CLI](https://developers.openai.com/codex/cli/), see the [tool installation section]({{< relref "2025-11-25-ai-sandbox-lima-vm.md#claude-code-codex-and-gemini" >}}) in the Lima guide; the steps are identical once you're inside the VM.

**Node.js**

```bash
# Install nvm
NVM_LATEST=$(curl -s https://api.github.com/repos/nvm-sh/nvm/releases/latest | jq -r .tag_name)
curl -fsSL "https://raw.githubusercontent.com/nvm-sh/nvm/${NVM_LATEST}/install.sh" | bash
source ~/.bashrc

# Install Node.js LTS
nvm install --lts
```

**Golang**

```bash
# Download latest release
GO_LATEST=$(curl -s 'https://go.dev/dl/?mode=json' | jq -r '.[0].files[] | select(.os=="linux" and .arch=="amd64") | .filename')
curl -L "https://go.dev/dl/$GO_LATEST" -o go.tar.gz

# Extract and cleanup
sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go.tar.gz
rm go.tar.gz
```

**Containerd + nerdctl**

[nerdctl](https://github.com/containerd/nerdctl) is a Docker-compatible CLI for containerd. It's lightweight and works well in VMs.

```bash
# Download and install nerdctl (full package includes containerd, CNI plugins and BuildKit)
NERDCTL_LATEST=$(curl -s https://api.github.com/repos/containerd/nerdctl/releases/latest | jq -r .tag_name)
curl -sSL "https://github.com/containerd/nerdctl/releases/download/${NERDCTL_LATEST}/nerdctl-full-${NERDCTL_LATEST#v}-linux-amd64.tar.gz" | sudo tar -xz -C /usr/local

# Enable and start containerd, and BuildKit for image building
sudo systemctl enable --now containerd
sudo systemctl enable --now buildkit

# Test the installation
sudo nerdctl ps
sudo nerdctl run --rm hello-world
```

To run nerdctl without sudo, enable rootless mode:

```bash
containerd-rootless-setuptool.sh install
nerdctl run --rm hello-world
```

**LLM Agents**

```bash
# Install Claude Code CLI (run with 'claude')
curl -fsSL https://claude.ai/install.sh | bash
echo 'alias claude="claude --dangerously-skip-permissions"' >> ~/.bashrc

# Install Gemini CLI (run with 'gemini')
npm install -g @google/gemini-cli@latest
echo 'alias gemini="gemini --yolo"' >> ~/.bashrc

# Install Codex CLI (run with 'codex')
npm install -g @openai/codex@latest
echo 'alias codex="codex --dangerously-bypass-approvals-and-sandbox"' >> ~/.bashrc
```

---

## Customizing Cloud-Init

For more control over VM provisioning, create a custom cloud-init configuration.

Create a `user-data.yaml` file:

```yaml
#cloud-config
users:
  - name: dev
    sudo: ALL=(ALL) NOPASSWD:ALL
    shell: /bin/bash
    ssh_authorized_keys:
      - ssh-ed25519 AAAA... your-key-here

packages:
  - vim
  - htop
  - git
  - build-essential

runcmd:
  - echo "VM provisioned at $(date)" > /var/log/provision.log
```

Create the VM with your custom config:

```bash
sudo virt-install \
  --name project1 \
  --ram 16384 \
  --vcpus 4 \
  --disk size=40 \
  --import \
  --disk noble-server-cloudimg-amd64.img \
  --os-variant ubuntu24.04 \
  --cloud-init user-data=user-data.yaml
```

---

## Snapshots

Snapshots let you save the VM state and revert if something goes wrong; useful before running experimental LLM-generated code.

```bash
# Create a snapshot
virsh snapshot-create-as project1 --name "before-experiment" --description "Clean state"

# List snapshots
virsh snapshot-list project1

# Revert to a snapshot
virsh snapshot-revert project1 --snapshotname "before-experiment"

# Delete a snapshot
virsh snapshot-delete project1 --snapshotname "before-experiment"
```

---

## Cloning VMs

Clone an existing VM to quickly spin up new instances:

```bash
# Shutdown the source VM first
virsh shutdown project1

# Clone the VM
virt-clone --original project1 --name project12 --auto-clone

# Start the clone
virsh start project12
```

---

## Network Configuration

By default, libvirt creates a NAT network (`default`) that provides VMs with internet access and internal IPs.

```bash
# List networks
virsh net-list --all

# Show network details
virsh net-info default

# Show DHCP leases
virsh net-dhcp-leases default
```

For production setups, consider using bridged networking to give VMs direct access to your network.

---

## Quick Reference

```bash
# Installation
sudo apt install qemu-kvm libvirt-daemon-system virtinst
sudo systemctl enable --now libvirtd

# Download cloud image
wget https://cloud-images.ubuntu.com/noble/current/noble-server-cloudimg-amd64.img

# Create VM
sudo virt-install --name project1 --ram 16384 --vcpus 4 --disk size=40 \
  --import --disk noble-server-cloudimg-amd64.img \
  --os-variant ubuntu24.04 --cloud-init

# VM lifecycle
virsh list --all             # List VMs
virsh start project1         # Start
virsh autostart project1     # Enable autostart
virsh shutdown project1      # Graceful shutdown
virsh destroy project1       # Force stop
virsh console project1       # Console access (Ctrl+] to exit)

# Snapshots
virsh snapshot-create-as project1 --name "clean"
virsh snapshot-revert project1 --snapshotname "clean"

# Cloning
virt-clone --original project1 --name project12 --auto-clone
```

---

I hope this guide is useful to you! Questions and feedback welcome in the comments below.
