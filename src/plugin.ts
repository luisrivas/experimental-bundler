import { Options as SWCOptions, JscTarget,  Output, transform } from '@swc/core';
import { Plugin, OnLoadArgs, OnLoadResult, OnResolveArgs } from 'esbuild';
import path from 'path';
import fs from 'fs/promises';

const judgeTS = (p: string): boolean => p.endsWith('.ts') || p.endsWith('.tsx');

export function swcPlugin(target: JscTarget = 'es2015', sourcemap:boolean = false): Plugin {
  return {
    name: 'esbuild:swc',
    setup(builder) {
      builder.onResolve({ filter: /\.([cm]?[tj]sx?)$/ }, (args: OnResolveArgs) => {
        const fullPath = path.resolve(args.resolveDir, args.path);
        return {
          path: fullPath
        }
      });

      builder.onLoad({ filter: /\.([cm]?[tj]sx?)$/ }, async (args: OnLoadArgs): Promise<OnLoadResult> => {
        const code = await fs.readFile(args.path, 'utf-8');
        const isTS = judgeTS(args.path);
        const isJSX = args.path.endsWith('x');

        const initialOptions: SWCOptions = {
          jsc: {
            parser: {
              syntax: isTS ? 'typescript' : 'ecmascript',
              ...(isTS && isJSX ? { tsx: true } : {}),
              ...(!isTS && isJSX ? { jsx: true } : {}),
            },
            target: target,
          },
          filename: args.path,
          sourceMaps: sourcemap ? 'inline': false,
          sourceFileName: args.path
        };
        
        let result: Output;
        result = await transform(code, initialOptions);

        return {
          contents: result.code,
          loader: 'js'
        }
      })
    }
  }
}