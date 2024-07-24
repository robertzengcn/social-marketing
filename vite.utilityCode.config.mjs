import { defineConfig, loadEnv } from 'vite';
import alias from "@rollup/plugin-alias";
import * as path from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills'
// import commonjs from 'vite-plugin-commonjs'
import ClosePlugin from './vite-plugin-close.ts'
// import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs'
import checker from 'vite-plugin-checker'
//import { nodeResolve } from '@rollup/plugin-node-resolve';

export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        plugins: [alias(),
        nodePolyfills(),
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
            include: ['node_modules/@puppeteer/browsers/node_modules/yargs/build/index.cjs'],
        },
        build: {
            sourcemap: true,
            commonjsOptions: {
                include: ["node_modules/@puppeteer/browsers/node_modules/yargs/build/index.cjs"],
              },
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