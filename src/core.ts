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
    plugins: [swcPlugin('es5', options.sourcemap)]
  });
}

export const analyzeMetafile = esbuild.analyzeMetafile;