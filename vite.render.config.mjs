import { defineConfig } from 'vite';
import alias from "@rollup/plugin-alias";
import * as path from 'path';
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import ClosePlugin from './vite-plugin-close.ts'
import checker from 'vite-plugin-checker'
import { viteDebugFsResolvePlugin } from './vite-debug-fs-resolve.mjs'
import { VITE_DEV_SERVER_PORT } from './dev-server-port.mjs'

export default defineConfig({
  server: {
    port: VITE_DEV_SERVER_PORT,
  },
  build: {
    sourcemap: true},
  plugins: [
    viteDebugFsResolvePlugin('renderer'),
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
    alias(),
    ClosePlugin(),
    checker({
      // e.g. use TypeScript check
      typescript: true,
      //vueTsc: true
    }),
  ],
    define: { 'process.env': {} },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
});