# direnv
direnv – unclutter your .profile

direnv is an extension for your shell. It augments existing shells with a new feature that can load and unload environment variables depending on the current directory.

## Use cases
Load 12factor apps environment variables
Create per-project isolated development environments
Load secrets for deployment

## How it works

Before each prompt, direnv checks for the existence of a .envrc file (and optionally a .env file) in the current and parent directories. If the file exists (and is authorized), it is loaded into a bash sub-shell and all exported variables are then captured by direnv and then made available to the current shell.

It supports hooks for all the common shells like bash, zsh, tcsh and fish. This allows project-specific environment variables without cluttering the ~/.profile file.

Because direnv is compiled into a single static executable, it is fast enough to be unnoticeable on each prompt. It is also language-agnostic and can be used to build solutions similar to rbenv, pyenv and phpenv.