const path = require('path');
const dotenv = require('dotenv');
const fs = require('node:fs/promises');
// Determine the environment and load the corresponding .env file
const env = process.env.NODE_ENV || 'development';
const envFile = `.env.${env}`;
dotenv.config({ path: path.resolve(__dirname, envFile) });
module.exports = {
  packagerConfig: {
    asar: {
      // This ensures native modules are unpacked
      unpack: "*.node"
    },
    extraResource: ["./node_modules/sqlite3/lib/binding","./node_modules/better-sqlite3/build/Release"],
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
