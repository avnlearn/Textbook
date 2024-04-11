# PDF Tools

- **pdfcpu** — Command-line tool to create and modify PDFs.
  <https://github.com/pdfcpu/pdfcpu> || `pdfcpu-git` **AUR**

# Graphical PDF editing

- `Inkscape` can import a single page from a PDF and export to PDF; text is imported as cloned glyphs or text; with the latter embedded fonts are substituted.
- Graphics editors like `GIMP` and `krita` can also import and export PDFs at the cost of rasterization.

# Document Converters

- Pandoc — Swiss-army knife for converting markup and document formats.
  <https://pandoc.org/> || `pandoc-cli`

# Desktop publishing

- Scribus — Desktop publishing program. Uses hyphen and its language packs for hyphenation.
  `Scribus` can import and export PDF; text is imported as polygons.
  https://www.scribus.net/ || `scribus`

# Office

## Office suites

- LibreOffice — The office productivity suite compatible to the open and standardized ODF document format. Fork of OpenOffice, supported by The Document Foundation.
  https://www.libreoffice.org/ || `libreoffice-still` or `libreoffice-fresh`
  - `LibreOffice Draw` can import and export PDF; text is imported as text; embedded fonts are substituted.
  - `sudo pacman -Syu libreoffice-still java-runtime java-environment pstoedit beanshell unixodbc postgresql-libs mariadb-libs`

### Hyphenation rules

For hyphenation rules, you will need `hyphen` and a language hyphen rule set (`hyphen-en` for English, `hyphen-de` for German, etc).

### Automated document conversion based on LibreOffice or OpenOffice

The command line tool `unoconv` is an automated conversion and styling tool that uses LibreOffice. Even tough it requires more work, it is still very useful as it is. It either connects to a running LibreOffice, starts one for its own usage, or connects to a running instance that was started explicitly for its usage. A running X server is not required.

## WYSIWYG HTML editors

- PageEdit — ePub visual XHTML editor.
  https://github.com/Sigil-Ebook/PageEdit || `pageedit`

# Readers and viewers

## E-book

- Calibre — E-book library management application that can also edit EPUB files, convert between different formats and sync with a variety of e-book readers. Supported formats include CHM, Comicbook, DjVu, DOCX, EPUB, FictionBook, HTML, HTMLZ, Kindle, LIT, LRF, Mobipocket, ODT, PDF, PRC, PDB, PML, RB, RTF, SNB, TCR, TXT and TXTZ.
  https://calibre-ebook.com/ || `calibre`
- Sigil — WYSIWYG EPUB e-book editor.
  https://sigil-ebook.com/ || `sigil`

# OCR software

## Console

- Tesseract — Accurate open source OCR engine. Package splitted, you need install some datafiles for each language (`tesseract-data-eng` for example).
  https://github.com/tesseract-ocr || `tesseract`
- OCRmyPDF — Adds an OCR text layer to scanned PDF files, allowing them to be searched.
  https://github.com/jbarlow83/OCRmyPDF || `ocrmypdf` **AUR**

# File sharing

## Download Managers

- aria2 — Lightweight download utility that supports HTTP/S, FTP, SFTP, BitTorrent and Metalink. It can run as a daemon controlled via a built-in JSON-RPC or XML-RPC interface.
  https://aria2.github.io/ || `aria2`
- yt-dlp — A youtube-dl fork with additional features and fixes.

  https://github.com/yt-dlp/yt-dlp || `yt-dlp`

- Motrix — Full-featured download manager that supports downloading HTTP, FTP, BitTorrent, Magnet, etc. Based on the Electron platform.

  https://motrix.app/ || `motrix` **AUR**

# Development

## Version control systems

- Git — Distributed revision control and source code management system with an emphasis on speed.

  https://git-scm.com/ || `git`

## Integrated development environments

- Netbeans — IDE for developing with Java, JavaScript, PHP, Python, Ruby, Groovy, C, C++, Scala, Clojure, and other languages.
  https://netbeans.org/ || `netbeans`
- Qt Creator — Lightweight, cross-platform C++ integrated development environment with a focus on Qt.
  https://www.qt.io/ide/ || `qtcreator`
- VSCodium — Free/Libre Open Source Software Binaries of VSCode.
  https://vscodium.com/ || `vscodium` **AUR**
- ZeroBrane Studio — IDE with debugging support for Lua 5.1, Lua 5.2, Lua 5.3, LuaJIT, and other Lua engines.
  https://studio.zerobrane.com/ || `zerobrane-studio` **AUR**

## Java IDEs

- BlueJ — Fully featured Java IDE used mainly for educational and beginner purposes.
  https://bluej.org/ || `bluej` **AUR**
- IntelliJ IDEA — IDE for Java, Groovy and other programming languages with advanced refactoring features.
  https://www.jetbrains.com/idea/ || `intellij-idea-community-edition`

## Python IDEs

- Thonny — Python IDE for beginners.
  https://thonny.org/ || `thonny` **AUR**

## Educational IDEs

- Scratch — Programming system and content development tool for educational and entertainment purposes, such as creating interactive projects and simple sprite-based games. It is used primarly by unskilled users (such as children) as an entry to event-driven programming.

  https://scratch.mit.edu/ || `scratch`

## Game development

- LÖVE — Lua based game development environment.
  https://love2d.org/ || `love`

# Audio

## Lyrics

### DJ

-     Mixxx — Integrates the tools DJs need to perform creative live mixes with digital music files.
  <https://mixxx.org/> || `mixxx`

# Image

## Raster graphics editors

- GIMP — Image editing suite in the vein of proprietary editors such as Adobe Photoshop. GIMP (GNU Image Manipulation Program) has been started in the mid 1990s and has acquired a large number of plugins and additional tools.
  <https://www.gimp.org/> || `gimp`

## Specialized photo editors

- darktable — Photography workflow and RAW development application.
  <https://www.darktable.org/> || `darktable`

## Image organizers

- Shotwell — A digital photo organizer designed for the GNOME desktop environment
  <https://wiki.gnome.org/Apps/Shotwell> || `shotwell`
