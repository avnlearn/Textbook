# [Pandoc](https://pandoc.org/)

If you need to convert files from one markup format into another, pandoc is your swiss-army knife. Pandoc can convert between the following formats:

(← = conversion from; → = conversion to; ↔︎ = conversion from and to)

# [pdfcpu](https://pdfcpu.io/)

[Website](https://github.com/pdfcpu/pdfcpu)

```

```

# [Vivliostyle](https://vivliostyle.org/)

An open source project for a new typesetting system fitting for digital and web publishing based on the latest web standard technology

## Vivliostyle CLI

[Doc](https://docs.vivliostyle.org/#/vivliostyle-cli)

```shell
npm install -g @vivliostyle/cli
```

### Generate PDF from HTML

```shell
vivliostyle build index.html
```

### Specify the output PDF file

```shell
vivliostyle build book.html -o book.pdf
```

### Specify a Web URL

```shell
vivliostyle build https://vivliostyle.github.io/vivliostyle_doc/samples/gutenberg/Alice.html -s A4 -o Alice.pdf
pdf
```

### Specifying single HTML document

```shell
vivliostyle build index.html --single-doc
```

### Specifying additional style sheets

```shell
vivliostyle build example.html --style additional-style.css
```

# [LibreOffice](https://www.libreoffice.org/)
