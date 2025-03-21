import * as path from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'node:fs/promises';
import * as fsSync from 'node:fs';
import { ForgeConfig } from '@electron-forge/shared-types';
// import { AutoUnpackNativesPlugin } from "@electron-forge/plugin-auto-unpack-natives";
// Determine the environment and load the corresponding .env file
const env = process.env.NODE_ENV || 'development';
const envFile = `.env.${env}`;
dotenv.config({ path: path.resolve(__dirname, envFile) });
const config: ForgeConfig = {
  packagerConfig: {
    asar: {
      // This ensures native modules are unpacked
      unpack: "**/node_modules/better-sqlite3/**",
     
    },
    ignore: [
      /node_modules\/(?!(better-sqlite3|bindings|file-uri-to-path)\/)/,
    ],
    prune: false,
    extraResource: [
       // Only include these paths if they exist
       ...(() => {
        const resources: string[] = [];
        const sqlite3Path = path.join(__dirname, 'node_modules/sqlite3/lib/binding');
        const betterSqlitePath = path.join(__dirname, 'node_modules/better-sqlite3/build/Release');
        
        if (fsSync.existsSync(sqlite3Path)) {
          resources.push(sqlite3Path);
        }
        
        if (fsSync.existsSync(betterSqlitePath)) {
          resources.push(betterSqlitePath);
        }
        
        return resources;
      })()
    ],
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: process.env.APP_NAME || 'electron_quick_start',
        certificateFile: './cert.pfx',
        certificatePassword: process.env.CERTIFICATE_PASSWORD
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
      config: {},
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
    {
      name: '@electron-forge/maker-wix',
      config: {
        language: 1033,
        manufacturer: 'My Awesome Company'
      }
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    {
      name: '@electron-forge/plugin-vite',
      config: {
        // `build` can specify multiple entry builds, which can be
        // Main process, Preload scripts, Worker process, etc.
        build: [
          {
            // `entry` is an alias for `build.lib.entry`
            // in the corresponding file of `config`.
            entry: 'src/background',
            config: 'vite.main.config.mjs'
          },
          {
            entry: 'src/preload.ts',
            config: 'vite.preload.config.mjs'
          },
          {
            entry: 'src/utilityCode.ts',
            config: 'vite.utilityCode.config.mjs'
          },
          {
            entry: 'src/taskCode.ts',
            config: 'vite.taskCode.config.mjs'
          },
          {
            entry: 'src/buckEmail.ts',
            config: 'vite.buckEmail.config.mjs'
          },

        ],
        renderer: [
          {
            name: 'main_window',
            config: 'vite.render.config.mjs'
          }
        ]
      }
    }
  ],
  hooks: {
    packageAfterPrune: async (_config, buildPath) => {
      const gypPath = path.join(
        buildPath,
        'node_modules',
        'bufferutil',
        'build',
        'node_gyp_bins'
      );
      await fs.rm(gypPath, {recursive: true, force: true});
      const utfPaht=path.join(
        buildPath,
        'node_modules',
        'utf-8-validate',
        'build',
        'node_gyp_bins'
      );
      await fs.rm(utfPaht, {recursive: true, force: true});

   }
  }
};
export default config;