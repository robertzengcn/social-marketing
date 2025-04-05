const path = require('path');
const dotenv = require('dotenv');
const { readdirSync, rmdirSync, statSync } = require('node:fs');
const { join, normalize } = require('node:path');
const { Walker, DepType } = require('flora-colossus');
let nativeModuleDependenciesToPackage = [];
const EXTERNAL_DEPENDENCIES = [
  'realm',
  'electron-squirrel-startup',
  'better-sqlite3',
  'puppeteer-cluster',
  'lodash',
'winston',
'user-agents',
'puppeteer',
'@lem0-packages/puppeteer-page-proxy',
'nodemailer',
'@langchain/ollama',
'decamelize',
'camelcase',
'p-retry',
'langsmith'
];
//import { ForgeConfig } from '@electron-forge/shared-types';
// import { AutoUnpackNativesPlugin } from "@electron-forge/plugin-auto-unpack-natives";
// Determine the environment and load the corresponding .env file
const env = process.env.NODE_ENV || 'development';
const envFile = `.env.${env}`;
dotenv.config({ path: path.resolve(__dirname, envFile) });
module.exports={
  packagerConfig: {
    // asar: {
    //   // This ensures native modules are unpacked
    //   unpack: "**/node_modules/better-sqlite3/**",
     
    // },
    asar: { unpackDir: '' },
    ignore: (file) => {
      const filePath = file.toLowerCase();
      const KEEP_FILE = {
        keep: false,
        log: true,
      };
      // NOTE: must return false for empty string or nothing will be packaged
      if (filePath === '') KEEP_FILE.keep = true;
      if (!KEEP_FILE.keep && filePath === '/package.json') KEEP_FILE.keep = true;
      if (!KEEP_FILE.keep && filePath === '/node_modules') KEEP_FILE.keep = true;
      if (!KEEP_FILE.keep && filePath === '/.vite') KEEP_FILE.keep = true;
      if (!KEEP_FILE.keep && filePath.startsWith('/.vite/')) KEEP_FILE.keep = true;
      if (!KEEP_FILE.keep && filePath.startsWith('/node_modules/')) {
        // check if matches any of the external dependencies
        for (const dep of nativeModuleDependenciesToPackage) {
          if (
            filePath === `/node_modules/${dep}/` ||
            filePath === `/node_modules/${dep}`
          ) {
            KEEP_FILE.keep = true;
            break;
          }
          if (filePath === `/node_modules/${dep}/package.json`) {
            KEEP_FILE.keep = true;
            break;
          }
          if (filePath.startsWith(`/node_modules/${dep}/`)) {
            KEEP_FILE.keep = true;
            KEEP_FILE.log = false;
            break;
          }
        }
      }
      if (KEEP_FILE.keep) {
        if (KEEP_FILE.log) console.log('Keeping:', file);
        return false;
      }
      return true;
    },
    // ignore: [
    //   /node_modules\/(?!(better-sqlite3|bindings|file-uri-to-path)\/)/,
    // ],
    prune: true,
    overwrite: true,
    // extraResource: [
    //    // Only include these paths if they exist
    //    ...(() => {
    //     const resources:Array<string>= [];
    //     const sqlite3Path = path.join(__dirname, 'node_modules/sqlite3/lib/binding');
    //     const betterSqlitePath = path.join(__dirname, 'node_modules/better-sqlite3/build/Release');
        
    //     if (fsSync.existsSync(sqlite3Path)) {
    //       resources.push(sqlite3Path);
    //     }
        
    //     if (fsSync.existsSync(betterSqlitePath)) {
    //       resources.push(betterSqlitePath);
    //     }
        
    //     return resources;
    //   })()
    // ],
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
          // {
          //   entry: 'src/utilityCode.ts',
          //   config: 'vite.utilityCode.config.mjs'
          // },
          {
            entry: 'src/taskCode.ts',
            config: 'vite.taskCode.config.mjs'
          },
          // {
          //   entry: 'src/buckEmail.ts',
          //   config: 'vite.buckEmail.config.mjs'
          // },

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
    prePackage: async () => {
      const projectRoot = normalize(__dirname);
      const getExternalNestedDependencies = async (
        nodeModuleNames,
        includeNestedDeps = true
      ) => {
        const foundModules = new Set(nodeModuleNames);
        if (includeNestedDeps) {
          for (const external of nodeModuleNames) {
            /**
             * @template T
             * @typedef {Object.<keyof T, T[keyof T]>} MyPublicClass
             */
            /**
             * @typedef {MyPublicClass<Walker> & {modules: Module[], walkDependenciesForModule: (moduleRoot: string, depType: DepType) => Promise<void>}} MyPublicWalker
             */
            const moduleRoot = join(projectRoot, 'node_modules', external);
            const walker = new Walker(moduleRoot);
            walker.modules = [];
            await walker.walkDependenciesForModule(moduleRoot, DepType.PROD);
            walker.modules
              .filter((dep) => dep.nativeModuleType === DepType.PROD)
              // for a package like '@realm/fetch', need to split the path and just take the first part
              .map((dep) => dep.name.split('/')[0])
              .forEach((name) => foundModules.add(name));
          }
        }
        return foundModules;
      };
      const nativeModuleDependencies =
        await getExternalNestedDependencies(EXTERNAL_DEPENDENCIES);
      nativeModuleDependenciesToPackage = Array.from(nativeModuleDependencies);
    },
  //   packageAfterPrune: async (_config, buildPath) => {
  //     const gypPath = path.join(
  //       buildPath,
  //       'node_modules',
  //       'bufferutil',
  //       'build',
  //       'node_gyp_bins'
  //     );
  //     await fs.rm(gypPath, {recursive: true, force: true});
  //     const utfPaht=path.join(
  //       buildPath,
  //       'node_modules',
  //       'utf-8-validate',
  //       'build',
  //       'node_gyp_bins'
  //     );
  //     await fs.rm(utfPaht, {recursive: true, force: true});

  //  }
  packageAfterPrune: async (_forgeConfig, buildPath) => {
    function getItemsFromFolder(
      path,
      totalCollection = []
    ) {
      try {
        const normalizedPath = normalize(path);
        const childItems = readdirSync(normalizedPath);
        const getItemStats = statSync(normalizedPath);
        if (getItemStats.isDirectory()) {
          totalCollection.push({
            path: normalizedPath,
            type: 'directory',
            empty: childItems.length === 0,
          });
        }
        childItems.forEach((childItem) => {
          const childItemNormalizedPath = join(normalizedPath, childItem);
          const childItemStats = statSync(childItemNormalizedPath);
          if (childItemStats.isDirectory()) {
            getItemsFromFolder(childItemNormalizedPath, totalCollection);
          } else {
            totalCollection.push({
              path: childItemNormalizedPath,
              type: 'file',
              empty: false,
            });
          }
        });
      } catch {
        return;
      }
      return totalCollection;
    }

    const getItems = getItemsFromFolder(buildPath) ?? [];
    for (const item of getItems) {
      const DELETE_EMPTY_DIRECTORIES = true;
      if (item.empty === true) {
        if (DELETE_EMPTY_DIRECTORIES) {
          const pathToDelete = normalize(item.path);
          // one last check to make sure it is a directory and is empty
          const stats = statSync(pathToDelete);
          if (!stats.isDirectory()) {
            // SKIPPING DELETION: pathToDelete is not a directory
            return;
          }
          const childItems = readdirSync(pathToDelete);
          if (childItems.length !== 0) {
            // SKIPPING DELETION: pathToDelete is not empty
            return;
          }
          rmdirSync(pathToDelete);
        }
      }
    }
  },
  }
};

