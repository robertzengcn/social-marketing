import { defineConfig, loadEnv } from 'vite';
import alias from "@rollup/plugin-alias";
import * as path from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import commonjs from 'vite-plugin-commonjs'
import ClosePlugin from './vite-plugin-close.ts'
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs'
import checker from 'vite-plugin-checker'
export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        plugins: [alias(),
            nodePolyfills(),
            commonjs(),
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
        build: {
            sourcemap: true,
            rollupOptions: {
                external: [
                    'sqlite3'
                ]
            }
        },
        test: {
            include:['test/vitest/utilitycode/*.test.ts'],
        },
        optimizeDeps:{
            esbuildOptions:{
              plugins:[
                esbuildCommonjs(['puppeteer-cluster']) 
              ]
            }
          }
    })
}