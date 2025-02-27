/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import alias from "@rollup/plugin-alias";
import * as path from 'path';
import copy from 'rollup-plugin-copy'
// import { viteStaticCopy } from 'vite-plugin-static-copy'
import ClosePlugin from './vite-plugin-close'
import checker from 'vite-plugin-checker'
import sourcemaps from 'rollup-plugin-sourcemaps';
import commonjs from '@rollup/plugin-commonjs';
//import { nodeResolve } from '@rollup/plugin-node-resolve';

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
            //nodeResolve(),
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
            // commonjs({
            //     ignoreDynamicRequires: true
            //     // or dynamicRequireTargets: ['node_modules/sqlite3/lib/sqlite3.js']
            //   })
            commonjs({
                // include: /node_modules/,
                dynamicRequireTargets: [
                    'node_modules/sqlite3/lib/sqlite3-binding.js',
                    'node_modules/sqlite3/lib/sqlite3.js',
                ],
                // dynamicRequireRoot: `node_modules`,
                // transformMixedEsModules: true,
            })
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
             conditions: ['node'],
        },
        build: {
            rollupOptions: {
                external: "typeorm"
            },
            sourcemap: true,
            external: [
                'sqlite3'
            ],   
        },
        test: {
            include: ['test/vitest/main/*.test.ts'],
        }
    })
}