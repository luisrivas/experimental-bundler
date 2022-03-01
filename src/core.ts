import esbuild, { LogLevel } from 'esbuild';
import { swcPlugin } from './plugin';
import {env} from 'process';

export async function build(options){

  let watch: boolean | {} = false;
  if ( options.watchCallback ) {
    watch = {
      onRebuild(error, result) {
        options.watchCallback(error, result);
      },
    }
  }

  let logLevel:LogLevel = <LogLevel>env.LOG_LEVEL || 'debug';


  return esbuild.build({
    entryPoints: options.entryPoints,
    bundle: true,
    outdir: options.d || 'dist',
    resolveExtensions: ['.ts', '.mjs','.js'],
    minify: options.minify,
    treeShaking: true,
    metafile: true,
    logLevel: logLevel,
    watch: watch,
    sourcemap: options.sourcemap,
    platform: options.platform || 'browser',
    plugins: [swcPlugin(options.target, options.sourcemap)],
    external: options.external
  });
}

export const analyzeMetafile = esbuild.analyzeMetafile;