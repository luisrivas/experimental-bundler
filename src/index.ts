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
      const { swcPlugin } = require('./plugin');
      const sourceMap = true // options

      let result = await esbuild.build({
        entryPoints: files,
        bundle: true,
        outdir: options.d || 'lib',
        resolveExtensions: ['.ts', '.mjs','.js'],
        minify: true,
        treeShaking: true,
        metafile: true,
        logLevel: 'verbose',
        sourcemap: sourceMap,
        plugins: [swcPlugin('es5', sourceMap)]
      });

      let text = await esbuild.analyzeMetafile(result.metafile)
      console.log(text)
    })

  cli.help()

  const pkgPath = join(__dirname, '../package.json')
  cli.version(JSON.parse(readFileSync(pkgPath, 'utf8')).version)

  cli.parse(process.argv, { run: false })
  await cli.runMatchedCommand()

}

main()