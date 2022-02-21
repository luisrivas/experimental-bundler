#!/usr/bin/env node

import esbuildServe from "esbuild-serve";
import {swcPlugin} from 'esbuild-plugin-swc';

esbuildServe({
    entryPoints: ['example/app.js'],
    outdir: 'www/js',
    bundle: true,
    resolveExtensions: ['.es6.js','.js'],
    plugins: [
      swcPlugin({
        "jsc": {
          "parser": {
            "syntax": "ecmascript",
            "jsx": false,
            "dynamicImport": false,
            "privateMethod": false,
            "functionBind": false,
            "exportDefaultFrom": false,
            "exportNamespaceFrom": false,
            "decorators": false,
            "decoratorsBeforeExport": false,
            "topLevelAwait": false,
            "importMeta": false
          },
          "transform": null,
          "target": "es2015",
          "loose": false,
          "externalHelpers": false,
          // Requires v1.2.50 or upper and requires target to be es2016 or upper.
          "keepClassNames": false
        }
      })
    ]
  },
  {
    root: 'www',
  });