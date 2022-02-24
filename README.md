# Experimental Bundler 🧪 (Go + Rust = Fastest Javascript builds ever)

An experimental set Javascript bundling tools focus on provide the best performance and developer experience.

This tool enable you to bundle and transpile any Javascript or Typescript versions targeting not only Browsers, but also any Node.js platform.

=================

<!-- toc -->
* [Usage](#usage)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g experimental-bundler
$ ec COMMAND
running command...
$ ec (--version)
ec/1.0.0 darwin-x64 node-v16.13.1
$ ec --help [COMMAND]
Usage:
  $ ec [...files]

Commands:
  [...files]  Bundle files

For more info, run any command with the `--help` flag:
  $ ec --help

Options:
  -d, --out-dir <dir>    Output directory (default: dist)
  --minify               Minify bundle 
  --sourcemap            Generate external sourcemap 
  --target <target>      Bundle target, "es20XX" or "esnext" (default: es2015)
  --platform <platform>  Target platform (default: browser)
  --dev                  Watch and serve output directory on port 7000 (default: false)
  -h, --help             Display this message 
  -v, --version          Display version number 
...
```
<!-- usagestop -->
