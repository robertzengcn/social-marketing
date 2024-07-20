/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import alias from "@rollup/plugin-alias";
import * as path from 'path';
import copy from 'rollup-plugin-copy'
// import { viteStaticCopy } from 'vite-plugin-static-copy'
import ClosePlugin from './vite-plugin-close'
import checker from 'vite-plugin-checker'

export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        plugins: [alias(),
            copy({
                targets: [
                    { src: 'src/sql/**/*', dest: 'dist/sql' }   
                ]  
            }),
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
                // external: [
                //     'sqlite3'
                // ]
            }
        },
        test: {
            include:['test/vitest/main/*.test.ts'],
        }
    })
}