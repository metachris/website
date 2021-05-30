+++
draft = true
date = "2021-03-25"
title = "Tools I use"
images = ["/images/posts/typescript-nodejs.jpg"]
tags = ["TypeScript", "webdev"]
keywords = ["TypeScript", "Node.js", "Project", "Setup", "Template", "Boilerplate"]
# hideTags = true
# disableComments = true
# hideInPostlist: true
+++


## Shell

* [fzf](https://github.com/junegunn/fzf) - bash history (CTRL+r) fuzzy finder
* autojump

```bash
for file in ~/.{path,bash_prompt,exports,aliases,functions,extra}; do
    [ -r "$file" ] && [ -f "$file" ] && source "$file";
done;
```

various helpers
```bash
# size
alias largest='du --si --max-depth=1 2> /dev/null | sort -n -r | head -n20'
```

OSX specific

```bash
# Add tab completion for many Bash commands
if which brew > /dev/null && [ -f /usr/local/etc/bash_completion ]; then
    source /usr/local/etc/bash_completion
elif [ -f /etc/bash_completion ]; then
    source /etc/bash_completion;
fi;
```

