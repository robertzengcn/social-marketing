import { defineConfig, loadEnv } from 'vite';
import alias from "@rollup/plugin-alias";
import * as path from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import commonjs from 'vite-plugin-commonjs'
import ClosePlugin from './vite-plugin-close.ts'

export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        plugins: [alias(),
            nodePolyfills(),
            commonjs(),
            ClosePlugin()
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
        }
    })
}