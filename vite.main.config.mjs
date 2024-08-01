/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import alias from "@rollup/plugin-alias";
import * as path from 'path';
import copy from 'rollup-plugin-copy'
// import { viteStaticCopy } from 'vite-plugin-static-copy'
import ClosePlugin from './vite-plugin-close'
import checker from 'vite-plugin-checker'
import sourcemaps from 'rollup-plugin-sourcemaps';
// import vue from '@vitejs/plugin-vue'
// import vuetify from 'vite-plugin-vuetify'
// import { nodeResolve } from '@rollup/plugin-node-resolve';
export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        plugins: [
            // vuetify({
            //     autoImport: true,
            //   }),
            alias(),
            copy({
                targets: [
                    { src: 'src/sql/**/*', dest: 'dist/sql' }   
                ]  
            }),
            sourcemaps(),
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
        },
        test: {
            include:['test/vitest/main/*.test.ts'],
        }
    })
}