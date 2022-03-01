#!/usr/bin/env node

import { cac } from 'cac'
import { join } from 'path'
import { readFileSync } from 'fs'
import { build, analyzeMetafile } from './core'
import * as serve from 'create-serve';

async function print_summary(result) {
  const text = await analyzeMetafile(result.metafile)
  console.log(text);
}

function ensureArray(input: string): string[] {
  return Array.isArray(input) ? input : input.split(',')
}

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
    .option('--external <name>', 'Mark specific packages as external')
    .option('--dev', 'Watch and serve output directory on port 7000', {
      default: false,
    })
    .action(async (entryPoints, options) => {

      if(options.dev) {
        options.watchCallback = async function(error, result) {
          if (error) {
            console.error('Build failed:', error);
          }
          else {
            serve.update();
            await print_summary(result);
          }
        }
      }

      if (options.external) {
        const external = ensureArray(options.external)
        options.external = external
      }
      

      const result = await build({entryPoints, ...options})
      await print_summary(result);
      if(options.dev) {
        serve.start({root: options.d, live: true});
      }
    })

  cli.help();

  const pkgPath = join(__dirname, '../package.json')
  cli.version(JSON.parse(readFileSync(pkgPath, 'utf8')).version)

  cli.parse(process.argv, { run: false })
  await cli.runMatchedCommand()

}

initialize()