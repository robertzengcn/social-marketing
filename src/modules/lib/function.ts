import path from "path";
import { execSync,exec } from 'child_process';
import { Notification } from 'electron'
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import { CommonDialogMsg } from "@/entityTypes/commonType";
import { Page } from 'puppeteer';
import os from "os";

export type queryParams = {
  page: number,
  size: number,
  sortby: string,
  search: string,
}
//scroll down to the bottom of the page
export async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve(void (0));
        }
      }, 100);
    });
  });
}
export function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  });
}
//get record date string for local db
export function getRecorddatetime(): string {
  const date = new Date();

  return date.getFullYear().toString() +
    "-" +
    pad2(date.getMonth() + 1) +
    "-" +
    pad2(date.getDate()) +
    " " +
    pad2(date.getHours()) +
    ":" +
    pad2(date.getMinutes()) +
    ":" +
    pad2(date.getSeconds());
}
export function pad2(n: number): string {
  if (n < 10) {
    return "0" + n.toString();
  } else {
    return n.toString();
  }
}
//return date string
export function getdate(): string {
  const date = new Date();

  return date.getFullYear().toString() +
    "-" +
    pad2(date.getMonth() + 1) +
    "-" +
    pad2(date.getDate()) +
    " " +
    pad2(date.getHours()) +
    ":" +
    pad2(date.getMinutes()) +
    ":" +
    pad2(date.getSeconds());
}


export function getUserhome(): string | undefined {
  switch (process.platform) {
    case 'darwin': {
      if(process.env.HOME){
      return path.join(process.env.HOME, 'Library', 'Application Support');
      }else{
        return undefined
      }
    }
    case 'win32': {
      return process.env.APPDATA;
    }
    case 'linux': {
      return process.env.HOME;
    }
  }
  return undefined;
}
export function getApplogpath(): string | undefined {
  const userPath = getUserhome()
  if (!userPath) {
    return undefined
  }
  const appname = "social-marketing"
  if(process.env.HOME){
  return path.join(process.env.HOME, appname, 'log');
  }else{
    return undefined;
  }
}

export const hash = Math.floor(Math.random() * 90000) + 10000;
// module.exports = {
//     autoScroll:autoScroll,
//     delay:delay,
//     getRecorddate:getRecorddate
// }

export function showNotification(title: string, body: string) {
  new Notification({ title: title, body: body }).show()
}
//get pip package list
export function checkPipPackage(): string {
  try {
    return execSync('pip list', { encoding: 'utf8' });

  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error executing command: ${error.message}`);

    }
    return ""
  }
}
//install pip package, event driver
export function installPipPackage(packageName: string, version: string, errorcall?: (error: Error) => void, stdoutCall?: (stdout: string) => void, stderrCall?: (stderr: string) => void): void {
  exec(`pip install ${packageName}==${version}`, (error: Error | null, stdout: string, stderr: string) => {
    if (error) {
      // console.error(`exec error: ${error}`);
      if(errorcall){
        errorcall(error)
      }
      // return;
    }
    if(stdoutCall){
      stdoutCall(stdout)
    }
    if(stderrCall){
      stderrCall(stderr)
    }
  }
);
}
//uninstall pip package
export function uninstallPipPackage(packageName: string, errorcall?: (error: Error) => void, stdoutCall?: (stdout: string) => void, stderrCall?: (stderr: string) => void): void {
  exec(`pip uninstall ${packageName} -y`, (error: Error | null, stdout: string, stderr: string) => {
    if (error) {
      console.error(`exec error: ${error}`);
      if(errorcall){
      errorcall(error)
      }
      return;
    }
    console.log(`stdout: ${stdout}`);
   console.error(`stderr: ${stderr}`);
    if(stdoutCall){
      stdoutCall(stdout)
    }
    if(stderrCall){
      stderrCall(stderr)
    }
  }
);
}
//write data to yaml file
export function writeYamlFile(filepath:string,data:object){

  try {
    fs.writeFileSync(filepath, yaml.dump(data));
  } catch (e) {
    console.log(e);
  }
}
//create random file name
export function randomFileName(prefix:string,suffix:string):string{
  return prefix+'-'+Date.now() + '-' + Math.floor(Math.random() * 1000)+'.'+suffix
}

// This is where we'll put the code to get around the tests.
export async function evadeChromeHeadlessDetection(page:Page) {

  // Pass the Webdriver Test.
  await page.evaluateOnNewDocument(() => {
      // const newProto = navigator.__proto__;
      const newProto = Object.getPrototypeOf(navigator);
      delete newProto.webdriver;
      // navigator.__proto__ = newProto;
      Object.setPrototypeOf(navigator, newProto);
  });

  // Pass the Chrome Test.
  await page.evaluateOnNewDocument(() => {
      // interface mockObjType extends typeof chrome {
      //     chrome: object,
      // }
      // We can mock this in as much depth as we need for the test.
      const mockObj = {
          app: {
              isInstalled: false,
          },
          webstore: {
              onInstallStageChanged: {},
              onDownloadProgress: {},
          },
          runtime: {
              PlatformOs: {
                  MAC: 'mac',
                  WIN: 'win',
                  ANDROID: 'android',
                  CROS: 'cros',
                  LINUX: 'linux',
                  OPENBSD: 'openbsd',
              },
              PlatformArch: {
                  ARM: 'arm',
                  X86_32: 'x86-32',
                  X86_64: 'x86-64',
              },
              PlatformNaclArch: {
                  ARM: 'arm',
                  X86_32: 'x86-32',
                  X86_64: 'x86-64',
              },
              RequestUpdateCheckStatus: {
                  THROTTLED: 'throttled',
                  NO_UPDATE: 'no_update',
                  UPDATE_AVAILABLE: 'update_available',
              },
              OnInstalledReason: {
                  INSTALL: 'install',
                  UPDATE: 'update',
                  CHROME_UPDATE: 'chrome_update',
                  SHARED_MODULE_UPDATE: 'shared_module_update',
              },
              OnRestartRequiredReason: {
                  APP_UPDATE: 'app_update',
                  OS_UPDATE: 'os_update',
                  PERIODIC: 'periodic',
              },
          },
      };
      // if(window.navigator.chrome){
      // window.navigator.chrome = mockObj;
      // }
      // window.chrome = mockObj;
  });

  // //Pass the Permissions Test.
  // await page.evaluateOnNewDocument(() => {
  //     const originalQuery = window.navigator.permissions.query;
  //     // window.navigator.permissions.__proto__.query = parameters =>
  //     Object.getPrototypeOf(window.navigator.permissions).query = parameters =>

  //         parameters.name === 'notifications'
  //             ? Promise.resolve({ state: Notification.permission })
  //             : originalQuery(parameters);

  //     // Inspired by: https://github.com/ikarienator/phantomjs_hide_and_seek/blob/master/5.spoofFunctionBind.js
  //     const oldCall = Function.prototype.call;

  //     function call() {
          
  //         return oldCall.apply(this, arguments);
  //     }

  //     Function.prototype.call = call;

  //     const nativeToStringFunctionString = Error.toString().replace(/Error/g, "toString");
  //     const oldToString = Function.prototype.toString;

  //     function functionToString() {
  //         if (this === window.navigator.permissions.query) {
  //             return "function query() { [native code] }";
  //         }
  //         if (this === functionToString) {
  //             return nativeToStringFunctionString;
  //         }
  //         return oldCall.call(oldToString, this);
  //     }

  //     Function.prototype.toString = functionToString;
  // });

  // Pass the Plugins Length Test.
  await page.evaluateOnNewDocument(() => {
      // Overwrite the `plugins` property to use a custom getter.
      Object.defineProperty(navigator, 'plugins', {
          // This just needs to have `length > 0` for the current test,
          // but we could mock the plugins too if necessary.
          get: () => [1, 2, 3, 4, 5]
      });
  });

  // Pass the Languages Test.
  await page.evaluateOnNewDocument(() => {
      // Overwrite the `plugins` property to use a custom getter.
      Object.defineProperty(navigator, 'languages', {
          get: () => ['en-US', 'en']
      });
  });

  // Pass the iframe Test
  await page.evaluateOnNewDocument(() => {
      Object.defineProperty(HTMLIFrameElement.prototype, 'contentWindow', {
          get: function () {
              return window;
          }
      });
  });

  // Pass toString test, though it breaks console.debug() from working
  await page.evaluateOnNewDocument(() => {
      window.console.debug = () => {
          return null;
      };
  });
}
export function read_keywords_from_file(fname) {
  let kws = fs.readFileSync(fname).toString().split(os.EOL);
  // clean keywords
  kws = kws.filter((kw) => {
    return kw.trim().length > 0;
  });
  return kws;
}
export function writeResults(fname, data) {
  fs.writeFileSync(fname, data, 'utf8');
}


