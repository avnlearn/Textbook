# Hindi (Devanagari script)

## Font Script

- Aksharyogini2
- Annapurna SIL
- BABEL Unicode
- Baloo 2
- Chandas
- Eczar
- FreeSans
- FreeSerif
- Gargi
- Gotu
- IBM Plex Sans Devanagari
- Jaini
- Jaini Purva
- Kalimati
- Lohit Devanagari
- Lohit Marathi
- Lohit Nepali
- Modak
- Mukta
- Nakula
- Noto Sans Devanagari
- Noto Serif Devanagari
- Sahadeva
- Samanata
- Samyak Devanagari
- Sarai
- Shobhika

### Basic Script

Main Using two command `\usepackage{fontspec}` and `\setmainfont{Gargi}`

```tex
\documentclass{article}

\author{Guddu Kumar}
\title{XeLaTeX and XeTeX}

\usepackage{fontspec}
\setmainfont{Gargi}

\begin{document}
	\maketitle
	\section{परिचय}
	इनपुट को दो चरणों में प्रोसेस करता है
\end{document}
```

# Install latexindent.pl

```perl
#!/usr/bin/perl

use strict;
use warnings;
use FindBin;
use YAML::Tiny;
use File::Copy;
use File::Basename;
use Getopt::Std;
use File::HomeDir;

print "hello world";
exit;
```

## Install

### Arch linux

```bash
sudo pacman -Syu perl-yaml-tiny perl-file-homedir
```
