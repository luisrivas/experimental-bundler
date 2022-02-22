#!/usr/bin/env node
import { cac } from 'cac'
import { join } from 'path'
import { readFileSync } from 'fs'
import { build, analyzeMetafile } from './core'

async function initialize() {

  const cli = cac('ec')

  cli
    .command('[...files]', 'Bundle files', {
      ignoreOptionDefaultValue: true,
    })
    .option('-d, --out-dir <dir>', 'Output directory', { default: 'dist' })
    .option('--minify', 'Minify bundle')
    .option(
      '--sourcemap',
      'Generate external sourcemap'
    )
    .option('--target <target>', 'Bundle target, "es20XX" or "esnext"', {
      default: 'es2015',
    })
    .option('--platform <platform>', 'Target platform', {
      default: 'browser',
    })
    .action(async (entryPoints, options) => {
      const result = await build({entryPoints, ...options})
      const text = await analyzeMetafile(result.metafile)
      console.log(text)
    })

  cli.help()

  const pkgPath = join(__dirname, '../package.json')
  cli.version(JSON.parse(readFileSync(pkgPath, 'utf8')).version)

  cli.parse(process.argv, { run: false })
  await cli.runMatchedCommand()

}

initialize()