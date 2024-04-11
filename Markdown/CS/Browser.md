# ungoogled-chromium

[ungoogled-chromium](https://github.com/ungoogled-software/ungoogled-chromium)
A lightweight approach to removing Google web service dependency

## Objectives

In descending order of significance (i.e. most important objective first):

1. ungoogled-chromium is Google Chromium, sans dependency on Google web services.
2. ungoogled-chromium retains the default Chromium experience as closely as possible. Unlike other Chromium forks that have their own visions of a web browser, ungoogled-chromium is essentially a drop-in replacement for Chromium.
3. ungoogled-chromium features tweaks to enhance privacy, control, and transparency. However, almost all of these features must be manually activated or enabled. For more details, see Feature Overview.

In scenarios where the objectives conflict, the objective of higher significance should take precedence.

Third-party binaries
[Download binaries from here](https://ungoogled-software.github.io/ungoogled-chromium-binaries/)

## chromium-web-store

This extension brings the following functionality to ungoogled-chromium (and other forks that lack web store support):

- Allows installing extensions directly from chrome web store.
- Automatically checks for updates to your installed extensions and displays them on the badge.

[Ungoogled-chromium Setting](chrome://ungoogled-first-run/)
[Chromium Web Store](https://github.com/NeverDecaf/chromium-web-store)

## Enable spellcheck

1. Go to <https://chromium.googlesource.com/chromium/deps/hunspell_dictionaries/+/main>
2. Find a bdic file for the language you want and click on it. You will see a mostly empty page aside from "X-byte binary file".
3. On the bottom right corner, click "txt". The direct link for en-US-10-1.bdic is: <https://chromium.googlesource.com/chromium/deps/hunspell_dictionaries/+/main/en-US-10-1.bdic?format=TEXT>
4. This is a base64-encoded file that needs to be decoded. Use the button below to select the .txt file you saved and save/move the resulting bdic file to your Dictionaries directory. Default locations:
   - Linux: ~/.config/chromium/Dictionaries/
   - Mac: ~/Library/Application Support/Chromium/Dictionaries/
   - Windows: %LOCALAPPDATA%\Chromium\User Data\Dictionaries\
   - No file chosen
5. Toggle spell check in chrome://settings/languages, or restart the browser for the dictionaries to take effect.

# Firefox

# Print Config

```txt
about:config
```

Search ; `print`

- `devtools.debugger.auto-pretty-print` : `true`
- `print.default_dpi` : `300`
- `print.more-settings.open` : `true`
- `print.save_as_pdf.use_page_rule_size_as_paper_size.enabled` : `false`

&PT - page no of pages
&D - data and time
&T - Title
&U - url
&P - page no

- `print.print_footercenter`
