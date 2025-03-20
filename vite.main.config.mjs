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

// Create an empty module plugin
function emptyModulesPlugin() {
    const emptyModules = [
        '@sap/hana-client/extension/Stream',
        '@sap/hana-client',
        'typeorm-aurora-data-api-driver',
        '@google-cloud/spanner',
        'mysql', 'mysql2',
        'pg', 'pg-query-stream','pg-native',
        'mongodb', 'mssql', 'oracledb',
         'hdb-pool','redis','ioredis','sql.js' 
    ];

    return {
        name: 'empty-modules',
        resolveId(id) {
            if (emptyModules.includes(id) || emptyModules.some(m => id.startsWith(`${m}/`))) {
                return { id: 'virtual:empty-module', external: false };
            }
            return null;
        },
        load(id) {
            if (id === 'virtual:empty-module') {
                return 'export default {}; export const Stream = {}; export const Readable = {}; export const Writable = {}; export const PassThrough = {};';
            }
            return null;
        }
    };
}
export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        plugins: [
            // vuetify({
            //     autoImport: true,
            //   }),

            alias(),
            emptyModulesPlugin(),
            sourcemaps(),
            ClosePlugin(),
            checker({
                // e.g. use TypeScript check
                typescript: true,
            }),
            // copy({
            //     targets: [
            //         { src: 'node_modules/better-sqlite3/build/Release/better_sqlite3.node', dest: 'build' },
            //     ]
            // })
            // copy({
            //     targets: [
            //         { src: 'node_modules/better-sqlite3/build/Release/better_sqlite3.node', dest: 'build' },
            //     ]
            // })
           
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
                "@sap/hana-client/extension/Stream": path.resolve(__dirname, "./src/utils/typeorm-shim.ts"),
                "@sap/hana-client": path.resolve(__dirname, "./src/utils/typeorm-shim.ts"),
                "typeorm-aurora-data-api-driver": path.resolve(__dirname, "./src/utils/typeorm-shim.ts"),
                "@google-cloud/spanner": path.resolve(__dirname, "./src/utils/typeorm-shim.ts"),
                "mysql": path.resolve(__dirname, "./src/utils/typeorm-shim.ts"),
                "mysql2": path.resolve(__dirname, "./src/utils/typeorm-shim.ts"),
                "pg": path.resolve(__dirname, "./src/utils/typeorm-shim.ts"),
                "pg-query-stream": path.resolve(__dirname, "./src/utils/typeorm-shim.ts"),
                "mongodb": path.resolve(__dirname, "./src/utils/typeorm-shim.ts"),
                "mssql": path.resolve(__dirname, "./src/utils/typeorm-shim.ts"),
                "oracledb": path.resolve(__dirname, "./src/utils/typeorm-shim.ts"),
                //"better-sqlite3": path.resolve(__dirname, "./src/utils/typeorm-shim.ts"),
                "hdb-pool": path.resolve(__dirname, "./src/utils/typeorm-shim.ts"),
                "pg-native": path.resolve(__dirname, "./src/utils/typeorm-shim.ts"),  // Add this line
                "redis": path.resolve(__dirname, "./src/utils/typeorm-shim.ts"),  // Add this line
                "ioredis": path.resolve(__dirname, "./src/utils/typeorm-shim.ts"),  // Add this line
                "sql.js": path.resolve(__dirname, "./src/utils/typeorm-shim.ts"),  // Add this line
            },
            conditions: ['node'],
            // mainFields: ['main', 'module', 'browser']
        },
        build: {
            rollupOptions: {
                external: [
                    'sqlite3',  // Mark sqlite3 as external
                ]
            },
            sourcemap: true,
        },
        test: {
            include: ['test/vitest/main/*.test.ts'],
        }
    })
}