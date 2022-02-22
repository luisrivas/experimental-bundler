import esbuild from 'esbuild';
import { swcPlugin } from './plugin';

export async function build(options){
    return esbuild.build({
    entryPoints: options.entryPoints,
    bundle: true,
    outdir: options.d || 'dist',
    resolveExtensions: ['.ts', '.mjs','.js'],
    minify: options.minify,
    treeShaking: true,
    metafile: true,
    logLevel: 'verbose',
    sourcemap: options.sourcemap,
    platform: options.platform || 'browser',
    plugins: [swcPlugin(options.target, options.sourcemap)]
  });
}

export const analyzeMetafile = esbuild.analyzeMetafile;