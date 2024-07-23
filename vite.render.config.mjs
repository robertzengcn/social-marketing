import { defineConfig } from 'vite';
import alias from "@rollup/plugin-alias";
import * as path from 'path';
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import ClosePlugin from './vite-plugin-close.ts'
import checker from 'vite-plugin-checker'
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default defineConfig({
  build: {
    sourcemap: true,
    rollupOptions: {
      plugins: [
        alias({
          entries: [
            { find: '@', replacement: path.resolve(__dirname, 'src') }
          ]
        }),
        nodeResolve({
          browser: true,
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
        }), 
      ]
  },
  },
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
    }),
    
    ClosePlugin(),
    checker({
      // e.g. use TypeScript check
      typescript: true,
      vueTsc: true
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
});