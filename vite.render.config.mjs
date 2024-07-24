import { defineConfig } from 'vite';
import alias from "@rollup/plugin-alias";
import path from 'path';
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import ClosePlugin from './vite-plugin-close.ts'
import checker from 'vite-plugin-checker'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import PluginVue from 'rollup-plugin-vue'

export default defineConfig({
  // resolve: {
  //   alias: {
  //     "@": path.resolve(__dirname, "./src"),
  //   },
  // },
  plugins: [
    vue({customElement: true}),
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
  build: {
    sourcemap: true,
    rollupOptions:{
      plugins: [
        alias({
          entries: [
            { find: '@', replacement: path.resolve(__dirname, './src') }
          ]
        }),
        PluginVue(),
        nodeResolve({
          browser: true,
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
        }), 
      ]
  },
},
});