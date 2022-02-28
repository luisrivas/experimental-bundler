# Experimental Bundler 🧪 🏗 (Go + Rust = Fastest Javascript builds ever)

An experimental set of Javascript bundling tools focused on the best performance and developer experience.

The experimental compiler enables you to bundle and transpile any Javascript and Typescript version, targeting any platform capable of running Javascript.

We are replacing [Babel](https://babeljs.io/) with a [20-70X faster](https://swc.rs/) way to transpile Javascript,and  [Webpack](https://webpack.js.org/) with a [modern bundler 10-100X faster.](https://esbuild.github.io/)

=================

<!-- toc -->
* [Usage](#usage)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g experimental-bundler
$ exb COMMAND
running command...
$ exb (--version)
exb/1.0.0 darwin-x64 node-v16.13.1
$ exb --help [COMMAND]
Usage:
  $ exb [...files]

Commands:
  [...files]  Bundle files

For more info, run any command with the `--help` flag:
  $ exb --help

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
