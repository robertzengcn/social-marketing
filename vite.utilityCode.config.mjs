import { defineConfig, loadEnv } from 'vite';
import alias from "@rollup/plugin-alias";
import * as path from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills'
// import commonjs from 'vite-plugin-commonjs'
import ClosePlugin from './vite-plugin-close.ts'
// import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs'
import checker from 'vite-plugin-checker'
//import { nodeResolve } from '@rollup/plugin-node-resolve';
import requireTransform from 'vite-plugin-require-transform';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy'
import { nodeResolve } from '@rollup/plugin-node-resolve';
export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        plugins: [alias(),
        nodePolyfills(),
        nodeResolve(),
        commonjs({
            //strictRequires:true,
            dynamicRequireTargets: ['node_modules/@puppeteer/browsers/node_modules/yargs/build/*.cjs'],
            //include: 'node_modules/**',
            exclude: ['node_modules/@colors/colors/lib/colors.js'],
        }),
        requireTransform({fileRegex:/.ts$|.tsx$|.js$|.cjs$/}),
        // copy({
        //     targets: [
        //         { src: 'node_modules/@puppeteer/browsers/node_modules/yargs/build', dest: '.vite/build/' }   
        //     ]  
        // }),
        ClosePlugin(),
        checker({
            // e.g. use TypeScript check
            typescript: true,
        }),
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        optimizeDeps: {
            //include: ['node_modules/@puppeteer/browsers/node_modules'],
        },
        build: {
            sourcemap: true,
            // commonjsOptions: {
            //     include: ["node_modules/@puppeteer/browsers/node_modules/yargs/build/index.cjs"],
            //   },
            // rollupOptions: {
            //     plugins: [
            //         alias({
            //             entries: [
            //               { find: '@', replacement: path.resolve(__dirname, 'src') }
            //             ]
            //           }),
            //         // nodeResolve({
            //         //     extensions: ['.js', '.jsx', '.ts', '.tsx', '.cjs']
            //         //   }), 
            //     ]
            // },
            external: [
                'sqlite3'
            ]

        },
        test: {
            include: ['test/vitest/utilitycode/*.test.ts'],
        }
      
    })
}