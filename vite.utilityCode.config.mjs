import { defineConfig, loadEnv } from 'vite';
import alias from "@rollup/plugin-alias";
import * as path from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        plugins: [alias(),
            nodePolyfills(),],
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