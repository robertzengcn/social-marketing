const path = require('path');
const dotenv = require('dotenv');
const { readdirSync, rmdirSync, statSync, existsSync } = require('node:fs');
const { join, normalize } = require('node:path');
const { Walker, DepType } = require('flora-colossus');

// Function to find the app bundle path
function findAppBundlePath() {
  console.log('=== Finding app bundle path ===');
  const possiblePaths = [
    'out/social-marketing-darwin-arm64/social-marketing.app',
    'out/social-marketing-darwin-x64/social-marketing.app',
    'out/social-marketing-darwin/social-marketing.app'
  ];
  
  for (const appPath of possiblePaths) {
    console.log(`Checking path: ${appPath}`);
    if (existsSync(appPath)) {
      console.log(`Found app bundle at: ${appPath}`);
      return appPath;
    }
  }
  
  // If no specific path found, try to find any .app in out directory
  try {
    const outDir = 'out';
    console.log(`Checking out directory: ${outDir}`);
    if (existsSync(outDir)) {
      const items = readdirSync(outDir);
      console.log(`Out directory contents: ${items.join(', ')}`);
      for (const item of items) {
        const itemPath = path.join(outDir, item);
        console.log(`Checking item: ${itemPath}`);
        if (statSync(itemPath).isDirectory() && item.endsWith('.app')) {
          console.log(`Found app bundle at: ${itemPath}`);
          return itemPath;
        }
      }
    }
  } catch (error) {
    console.log('Error searching for app bundle:', error.message);
  }
  
  // Fallback to the default path
  console.log('Using fallback path: social-marketing.app');
  return 'social-marketing.app';
}
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
'puppeteer-extra',
'puppeteer-extra-plugin-stealth',
//'puppeteer-extra-plugin-adblocker',
'puppeteer-extra-plugin-recaptcha',
'@lem0-packages/puppeteer-page-proxy',
'nodemailer',
'@langchain/ollama',
'decamelize',
'camelcase',
'js-tiktoken',
'p-retry',
'langsmith',
'@cfworker/json-schema',
'mustache',
'openai',
'typeorm',
'cheerio',
// 'lzma-native' // Commented out due to build issues on macOS - not used in source code
];
//import { ForgeConfig } from '@electron-forge/shared-types';
// import { AutoUnpackNativesPlugin } from "@electron-forge/plugin-auto-unpack-natives";
// Determine the environment and load the corresponding .env file
const env = process.env.NODE_ENV || 'development';
const envFile = `.env.${env}`;
dotenv.config({ path: path.resolve(__dirname, envFile) });
module.exports={
  packagerConfig: {
    icon: './src/assets/images/icon',
    name: process.env.APP_NAME || 'social-marketing',
    // asar: {
    //   // This ensures native modules are unpacked
    //   unpack: "**/node_modules/better-sqlite3/**",
     
    // },
    asar: { unpackDir: "**/node_modules/{better-sqlite3,sqlite3}/**", },
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
        name: process.env.APP_NAME || 'SocialMarketing',
        certificateFile: './cert.pfx',
        certificatePassword: process.env.CERTIFICATE_PASSWORD,
        // iconUrl should be a valid HTTP/HTTPS URL, not a local path
        // iconUrl: './src/assets/images/icon.png',
        setupIcon: './src/assets/images/icon.ico',
        // Custom installer options
        // loadingGif should be a valid HTTP/HTTPS URL, not a local path
        // loadingGif: './src/assets/images/installer-loading.gif', // Optional: Add a loading gif
        setupExe: 'SocialMarketingSetup.exe',
        // Allow users to choose installation directory
        allowDirectorySelection: true,
        // Create desktop shortcut
        createDesktopIcon: true,
        // Create start menu shortcut
        createStartMenuShortcut: true,
        // Install for all users (requires admin)
        installForAllUsers: false,
        // Custom installation directory
        defaultInstallLocation: '%LOCALAPPDATA%\\SocialMarketing',
        // Additional options
        noMsi: true,
        // Custom installer text
        title: 'Social Marketing Installer',
        description: 'Install Social Marketing application',
        authors: 'Robert Zeng',
        // Registry entries for uninstall
        registry: {
          key: 'Software\\SocialMarketing',
          name: 'InstallLocation'
        },
        // Uninstall configuration
        uninstallIcon: './src/assets/images/icon.ico',
        // Custom uninstall script
        uninstallScript: './installer-scripts/uninstall-windows.js'
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        format: 'ULFO',
        icon: './src/assets/images/icon.icns',
        name: process.env.APP_NAME || 'social-marketing',
        contents: [
          {
            x: 130,
            y: 220,
            type: 'file',
            path: findAppBundlePath()
          },
          {
            x: 410,
            y: 220,
            type: 'link',
            path: '/Applications'
          }
        ],
        window: {
          width: 540,
          height: 380
        }
      }
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: './src/assets/images/icon.png',
          // Custom installer options for Linux
          maintainer: 'Robert Zeng',
          homepage: 'https://github.com/robertzengcn/social-marketing',
          categories: ['Utility', 'Network', 'Web'],
          // Allow users to choose installation directory
          section: 'utils',
          priority: 'optional',
          // Create desktop shortcut
          desktop: {
            Name: 'Social Marketing',
            Comment: 'Social Marketing Application',
            GenericName: 'Social Marketing',
            Categories: 'Utility;Network;Web;',
            Keywords: 'social;marketing;automation;'
          },
          // Custom installation directory
          installDir: '/opt/social-marketing',
          // Additional options
          depends: ['nodejs', 'libgtk-3-0', 'libnotify4', 'libnss3', 'libxss1', 'libxtst6', 'xdg-utils', 'libatspi2.0-0', 'libdrm2', 'libxkbcommon0', 'libxcomposite1', 'libxdamage1', 'libxfixes3', 'libxrandr2', 'libgbm1', 'libasound2']
        },
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        options: {
          icon: './src/assets/images/icon.png',
          // Custom installer options for RPM
          maintainer: 'Robert Zeng',
          homepage: 'https://github.com/robertzengcn/social-marketing',
          categories: ['Utility', 'Network', 'Web'],
          // Allow users to choose installation directory
          section: 'utils',
          priority: 'optional',
          // Create desktop shortcut
          desktop: {
            Name: 'Social Marketing',
            Comment: 'Social Marketing Application',
            GenericName: 'Social Marketing',
            Categories: 'Utility;Network;Web;',
            Keywords: 'social;marketing;automation;'
          },
          // Custom installation directory
          installDir: '/opt/social-marketing',
          // Additional options
          depends: ['nodejs', 'gtk3', 'libnotify', 'nss', 'libXScrnSaver', 'libXtst', 'xdg-utils', 'atk', 'libdrm', 'libxkbcommon', 'libXcomposite', 'libXdamage', 'libXfixes', 'libXrandr', 'mesa-libgbm', 'alsa-lib']
        }
      },
    },
    // WiX maker only works on Windows
    ...(process.platform === 'win32' ? [{
      name: '@electron-forge/maker-wix',
      config: {
        language: 1033,
        manufacturer: 'Robert Zeng',
        icon: './src/assets/images/icon.ico',
        // Custom WiX installer options
        ui: {
          // Enable custom UI for installation location selection
          chooseDirectory: true,
          // Show license agreement
          license: './LICENSE',
          // Custom banner and dialog images
          // banner: './src/assets/images/installer-banner.png',
          // dialog: './src/assets/images/installer-dialog.png',
          // Installation directory options
          installDir: 'C:\\Program Files\\SocialMarketing',
          // Create desktop shortcut
          createDesktopShortcut: true,
          // Create start menu shortcut
          createStartMenuShortcut: true,
          // Install for all users
          perMachine: false,
          // Additional features
          features: {
            // Main application feature
            main: {
              title: 'Social Marketing Application',
              description: 'Main application files',
              level: 1
            },
            // Desktop shortcut feature
            desktopShortcut: {
              title: 'Desktop Shortcut',
              description: 'Create a shortcut on the desktop',
              level: 1
            },
            // Start menu shortcut feature
            startMenuShortcut: {
              title: 'Start Menu Shortcut',
              description: 'Create a shortcut in the start menu',
              level: 1
            }
          }
        },
        // Custom actions for post-installation
        customActions: [
          {
            name: 'CreateShortcuts',
            description: 'Create desktop and start menu shortcuts',
            script: './installer-scripts/create-shortcuts.js'
          }
        ],
        // Uninstall configuration
        uninstallIcon: './src/assets/images/uninstall.ico',
        // Uninstall custom actions
        uninstallCustomActions: [
          {
            name: 'RemoveShortcuts',
            description: 'Remove desktop and start menu shortcuts',
            script: './installer-scripts/uninstall-windows.js'
          }
        ]
      }
    }] : []),
    // Note: @electron-forge/maker-portable doesn't exist
    // If you need a portable executable, consider using @electron-forge/maker-zip
    // or create a custom solution
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
          // Add uninstaller build
          {
            entry: 'src/uninstaller/main.ts',
            config: 'vite.uninstaller.config.mjs'
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

