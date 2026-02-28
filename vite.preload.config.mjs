/// <reference types="vitest" />
import { defineConfig,loadEnv} from 'vite';
import checker from 'vite-plugin-checker'
import * as path from 'path';
import { viteDebugFsResolvePlugin } from './vite-debug-fs-resolve.mjs'
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      {
        name: 'force-exclude-electron-fs',
        config(config) {
          const od = config.optimizeDeps || {};
          const exclude = new Set(['electron', 'fs', 'node:fs', ...(od.exclude || [])]);
          return { optimizeDeps: { ...od, exclude: [...exclude] } };
        }
      },
      viteDebugFsResolvePlugin('preload'),
      checker({
        // e.g. use TypeScript check
        typescript: true,
      }),
    ],
    optimizeDeps: {
      exclude: ['electron', 'fs'],
      noDiscovery: true,
      include: [],
    },
    resolve: {
      alias: {
          "@": path.resolve(__dirname, "./src"),
      },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      external: [
        'electron',
        'sqlite3'
      ]
    }
  }
})
}