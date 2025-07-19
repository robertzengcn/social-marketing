import { defineConfig } from 'vite'
import { builtinModules } from 'module'
import { resolve } from 'path'

export default defineConfig({
  mode: process.env.MODE,
  root: __dirname,
  build: {
    outDir: 'dist/uninstaller',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        uninstaller: resolve(__dirname, 'src/uninstaller/main.ts')
      },
      external: [
        'electron',
        ...builtinModules,
        'electron-devtools-installer',
        'electron-log',
        'protocol-registry',
        'better-sqlite3',
        'sqlite3',
        'puppeteer',
        'puppeteer-extra',
        'puppeteer-extra-plugin-stealth',
        'puppeteer-extra-plugin-recaptcha',
        'puppeteer-cluster',
        'nodemailer',
        'typeorm',
        'reflect-metadata',
        'winston',
        'user-agents',
        'lodash',
        'openai',
        'cheerio',
        'got',
        'request',
        'node-fetch',
        'crypto',
        'fs',
        'path',
        'child_process',
        'os',
        'url',
        'querystring',
        'http',
        'https',
        'stream',
        'util',
        'events',
        'buffer',
        'process',
        'assert',
        'constants',
        'domain',
        'punycode',
        'string_decoder',
        'timers',
        'tty',
        'vm',
        'zlib',
        'dns',
        'net',
        'tls',
        'cluster',
        'worker_threads',
        'perf_hooks',
        'async_hooks',
        'inspector',
        'trace_events',
        'v8',
        'repl',
        'readline',
        'querystring',
        'url',
        'http',
        'https',
        'http2',
        'dgram',
        'dns',
        'net',
        'tls',
        'crypto',
        'stream',
        'util',
        'events',
        'assert',
        'constants',
        'domain',
        'punycode',
        'string_decoder',
        'timers',
        'tty',
        'vm',
        'zlib',
        'cluster',
        'worker_threads',
        'perf_hooks',
        'async_hooks',
        'inspector',
        'trace_events',
        'v8',
        'repl',
        'readline'
      ]
    },
    target: 'node18',
    minify: process.env.MODE === 'production',
    sourcemap: process.env.MODE === 'development',
    lib: {
      entry: resolve(__dirname, 'src/uninstaller/main.ts'),
      formats: ['cjs']
    },
    // Ensure native modules are handled properly
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  // Optimize for uninstaller-specific needs
  optimizeDeps: {
    exclude: [
      'electron',
      'better-sqlite3',
      'sqlite3',
      'puppeteer',
      'puppeteer-extra',
      'puppeteer-extra-plugin-stealth',
      'puppeteer-extra-plugin-recaptcha',
      'puppeteer-cluster',
      'nodemailer',
      'typeorm',
      'reflect-metadata',
      'winston',
      'user-agents',
      'lodash',
      'openai',
      'cheerio',
      'got',
      'request',
      'node-fetch'
    ]
  },
  // Platform-specific configurations
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.MODE || 'development'),
    'process.env.UNINSTALLER_MODE': JSON.stringify('true')
  }
}) 