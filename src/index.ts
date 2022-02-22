#!/usr/bin/env node
import { cac } from 'cac'
import { join } from 'path'
import { readFileSync } from 'fs'

async function main() {

  const cli = cac('ec')

  cli
    .command('[...files]', 'Bundle files', {
      ignoreOptionDefaultValue: true,
    })
    .option('-d, --out-dir <dir>', 'Output directory', { default: 'lib' })
    .action(async (files, options) => {
      console.log(files, options)
      const esbuild = require('esbuild');
      const { swcPlugin } = require('esbuild-plugin-swc');


      esbuild.build({
        entryPoints: files,
        bundle: true,
        outdir: options.d || 'lib',
        resolveExtensions: ['.mjs','.js'],
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
      })
    })

  cli.help()

  const pkgPath = join(__dirname, '../package.json')
  cli.version(JSON.parse(readFileSync(pkgPath, 'utf8')).version)

  cli.parse(process.argv, { run: false })
  await cli.runMatchedCommand()

}

main()