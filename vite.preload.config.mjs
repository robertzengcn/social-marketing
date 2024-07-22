/// <reference types="vitest" />
import { defineConfig,loadEnv} from 'vite';
import checker from 'vite-plugin-checker'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      checker({
        // e.g. use TypeScript check
        typescript: true,
      }),
    ],
  build: {
    sourcemap: true,
    rollupOptions: {
      external: [
        'sqlite3'
      ]
    }
  }
})
}