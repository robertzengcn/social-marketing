import path from "path";
import { execSync, exec } from 'child_process';
import { Notification, app } from 'electron'
import * as yaml from 'js-yaml';
import * as fs from 'fs';
// import { CommonDialogMsg } from "@/entityTypes/commonType";
import { Page } from 'puppeteer';
import os from "os";
import * as crypto from 'crypto';
import { ProxyParseItem, ProxyServer } from "@/entityTypes/proxyType"
import { TaskStatus } from "@/entityTypes/commonType";
import fetch from 'node-fetch';
//import { RequestInfo, RequestInit } from "node-fetch";
//const fetch = (url: RequestInfo, init?: RequestInit) =>  import("node-fetch").then(({ default: fetch }) => fetch(url, init));
import { CookiesType } from "@/entityTypes/cookiesType"
import { Token } from "@/modules/token"
import { USERLOGPATH, USEREMAIL } from '@/config/usersetting';
import { v4 as uuidv4 } from 'uuid';
// import { contextIsolated } from "process";
//import { utilityProcess, MessageChannelMain} from "electron";
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
export async function delay(time) {
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
      if (process.env.HOME) {
        return path.join(process.env.HOME, 'Library', 'Application Support');
      } else {
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
  if (process.env.HOME) {
    return path.join(process.env.HOME, appname, 'log');
  } else {
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
      if (errorcall) {
        errorcall(error)
      }
      // return;
    }
    if (stdoutCall) {
      stdoutCall(stdout)
    }
    if (stderrCall) {
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
      if (errorcall) {
        errorcall(error)
      }
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    if (stdoutCall) {
      stdoutCall(stdout)
    }
    if (stderrCall) {
      stderrCall(stderr)
    }
  }
  );
}
//write data to yaml file
export function writeYamlFile(filepath: string, data: object) {

  try {
    fs.writeFileSync(filepath, yaml.dump(data));
  } catch (e) {
    console.log(e);
  }
}
//create random file name
export function randomFileName(prefix: string, suffix: string): string {
  return prefix + '-' + Date.now() + '-' + Math.floor(Math.random() * 1000) + '.' + suffix
}

// This is where we'll put the code to get around the tests.
export async function evadeChromeHeadlessDetection(page: Page) {

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
const StringIsNumber = value => isNaN(Number(value)) === false;
export function ToArray(enumme) {
  return Object.keys(enumme)
    .filter(StringIsNumber)
    .map(key => enumme[key]);
}

// export function forkScript(scriptName:string,command:Array<string>):Electron.UtilityProcess{
//   //fork a process use electron
//   const childPath = path.join(__dirname, scriptName)
//         if (!fs.existsSync(childPath)) {
//             throw new Error("child js path not exist for the path " + childPath);
//         }
//         const { port1, port2 } = new MessageChannelMain()

//         return utilityProcess.fork(childPath, command,{stdio:"pipe",execArgv:["puppeteer-cluster:*"]} )
// }
//return user's db path
export function getUserpath(username: string): string {
  return path.join(app.getPath("userData"), username)
}
export function getApplogspath(username: string): string {
  return path.join(app.getPath("logs"), username)
}
// check and create path
export async function checkAndCreatePath(pathToCheck: string): Promise<void> {
  try {
    await fs.promises.access(pathToCheck, fs.constants.F_OK);
    console.log('Path exists.');
  } catch {
    console.log('Path does not exist. Creating...');
    await fs.promises.mkdir(pathToCheck, { recursive: true });
    console.log('Path created.');
  }
}
export function getEnumKeyByValue(enumObj: any, value: string): number | undefined {
  const keys = Object.keys(enumObj).filter(k => isNaN(Number(k))); // Get only the string keys
  // console.log(keys)
  for (const key of keys) {

    if (key === value) {
      return enumObj[key];
    }
  }
  return undefined;
}
export function getEnumValueByNumber(enumObj: any, value: number): string | undefined {
  // console.log(value)
  // console.log(enumObj)
  // console.log(enumObj[value])
  return enumObj[value];
}
export function WriteLog(logPath: string, data: string): void {
  const logEntry = `${new Date().toISOString()} - ${data}\n`;
  //get file folder, create if not exist
  const folder = path.dirname(logPath);
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
  fs.appendFile(logPath, logEntry, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });
}
export function getRandomValues(buf: Uint8Array): Uint8Array {
  return crypto.randomFillSync(buf);
}
//convert proxy entity to url
export function proxyEntityToUrl(proxyEntity: ProxyParseItem): string {
  if (!proxyEntity.protocol) {
    throw new Error("protocol is required");
  }
  if (!proxyEntity.host) {
    throw new Error("host is required");
  }
  if (!proxyEntity.port) {
    throw new Error("port is required");
  }
  let proxyUrl = "";
  if (proxyEntity.protocol.includes('http')) {
    if ((proxyEntity.user && (proxyEntity.user?.length > 0)) && (proxyEntity.pass && (proxyEntity.pass?.length > 0))) {
      proxyUrl = `${proxyEntity.protocol}://${proxyEntity.user}:${proxyEntity.pass}@${proxyEntity.host}:${proxyEntity.port}`;
    } else {
      proxyUrl = `${proxyEntity.protocol}://${proxyEntity.host}:${proxyEntity.port}`;
    }
  } else if (proxyEntity.protocol.includes('socks')) {
    // let socketType:4|5=5
    // if(proxyEntity.protocol.includes('4')){
    //     let socketType=4
    // }
    proxyUrl = `${proxyEntity.protocol}://${proxyEntity.host}:${proxyEntity.port}`;
  } else {
    throw new Error("protocol is not valid");
  }
  return proxyUrl;
}
//convert proxy entity to proxy server
export function proxyEntityToServer(proxyEntity: ProxyParseItem): ProxyServer {
  if (!proxyEntity.protocol) {
    throw new Error("protocol is required");
  }
  if (!proxyEntity.host) {
    throw new Error("host is required");
  }
  if (!proxyEntity.port) {
    throw new Error("port is required");
  }
  const proxyUrl = `${proxyEntity.protocol}://${proxyEntity.host}:${proxyEntity.port}`;
  const rest: ProxyServer = {
    server: proxyUrl,
    username: proxyEntity.user,
    password: proxyEntity.pass
  }
  return rest

}
export function getDomain(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
  } catch (e) {
    console.error('Invalid URL:', e);
    return null;
  }
}
// Function to convert JSON string to object
export function convertJsonToObject<T>(jsonString: string): T {
  return JSON.parse(jsonString) as T;
}

export function getStatusName(taskStatus: TaskStatus): string {
  switch (taskStatus) {
    case TaskStatus.Processing:
      return "Processing";
    case TaskStatus.Complete:
      return "Complete";
    case TaskStatus.Error:
      return "Error";
    default:
      throw new Error("Invalid status");
  }
}
// Function to remove duplicates from an array
export function removeDuplicates(array: any[]): any[] {
  return array.filter((item, index) => array.indexOf(item) === index);
}

/**
   * Check if a folder exists and return the list of files in the folder.
   * @param folderPath - The path to the folder.
   * @returns A promise that resolves to an array of file names if the folder exists, or an empty array if it doesn't.
   */
export async function checkFolderAndGetFiles(folderPath: string): Promise<string[]> {
  try {
    // Check if the folder exists
    const folderExists = await fs.promises.stat(folderPath).then(stat => stat.isDirectory()).catch(() => false);

    if (!folderExists) {
      // console.log(`Folder does not exist: ${folderPath}`);
      return [];
    }

    // Read the contents of the folder
    const files = await fs.promises.readdir(folderPath);
    return files;
  } catch (error) {

    // console.error(`Error checking folder or reading files: ${error.message}`);
    return [];
  }
}
/**
 * Download a file from a remote URL and save it to a specified path.
 * @param url - The URL of the file to download.
 * @param savePath - The path where the file should be saved.
 * @returns A promise that resolves when the file has been downloaded and saved.
 */
export async function downloadFile(url: string, savePath: string, onSuccess?: () => void,
  onFailure?: (error: Error) => void): Promise<void> {
  try {
    //defined a tmp file name
    const tmpFileName = savePath + '.tmp';
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`);
    }

    const fileStream = fs.createWriteStream(tmpFileName);

    return new Promise((resolve, reject) => {
      if (response.body) {
        response.body.pipe(fileStream);
        response.body.on('error', (error) => {

          reject(error);
          if (onFailure) {
            onFailure(error as Error);
          }
        });
      } else {
        if (onFailure) {
          onFailure(new Error('Response body is null'))
        }

        reject(new Error('Response body is null'));
      }
      fileStream.on('finish', () => {
        //rename to tmp file to save path
        fs.rename(tmpFileName, savePath, (error) => {
          if (error) {
            reject(error);
            if (onFailure) {
              onFailure(error as Error);
            }
          }else{
            resolve();
            if (onSuccess) {
              onSuccess();
          }
        }
        })

        // resolve();
        // if (onSuccess) {
        //   onSuccess();
        // }
      });
    });
  } catch (error) {
    //remove file if download failed
    //await removeFile(savePath)
    if (onFailure) {

      onFailure(error as Error);
    }

    throw error;
  }
}

export function convertCookiesToNetscapeFile(cookies: CookiesType[], filePath: string): void {
  const lines: string[] = [
    "# Netscape HTTP Cookie File",
    "# This is a generated file! Do not edit.",
    ""
  ];
  // console.log(cookies)
  // for (const [domain, cookieList] of Object.entries(cookies)) {
  // console.log(domain)
  // console.log(cookieList)
  for (const cookie of cookies) {
    const { domain, name, value, path, expirationDate, secure } = cookie;
    const flag = domain.startsWith('.') ? 'TRUE' : 'FALSE';
    const secureFlag = secure ? 'TRUE' : 'FALSE';
    const expiration = Math.floor(expirationDate) || 0;
    lines.push(`${domain}\t${flag}\t${path}\t${secureFlag}\t${expiration}\t${name}\t${value}`);
  }
  //}

  fs.writeFileSync(filePath, lines.join('\n'));
}
export function generateRandomUniqueString(length: number): string {
  return crypto.randomBytes(length).toString('hex');
}
export function getUserPlatform(): string {
  return process.platform;
}
// Function to convert a Netscape cookie file to a JSON object
export function convertNetscapeCookiesToJson(filePath: string): CookiesType[] {
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContents.split('\n');
  const cookies: CookiesType[] = [];

  lines.forEach(line => {
    if (line.startsWith('#') || line.trim() === '') {
      // Skip comments and empty lines
      return;
    }

    const parts = line.split('\t');
    if (parts.length === 7) {
      const cookie: CookiesType = {
        domain: parts[0],
        flag: parts[1] === 'TRUE',
        path: parts[2],
        secure: parts[3] === 'TRUE',
        expirationDate: parseInt(parts[4], 10),
        name: parts[5],
        value: parts[6]
      };
      cookies.push(cookie);
    }
  });

  return cookies;
};
// Utility function to remove parameters after & in a URL
export function removeParamsAfterAmpersand(url: string): string {
  const index = url.indexOf('&');
  if (index !== -1) {
    return url.substring(0, index);
  }
  return url;
}
export function removeFile(filePath: string, success?: () => void, strerr?: (message: string) => void): void {
  if (fs.existsSync(filePath)) {
    fs.rm(filePath, { recursive: true }, (error) => {
      if (error) {
        if (strerr) {
          strerr(`file does not exist: ${filePath}`);
        }
      } else {
        if (success) {
          success();
        }
      }
    })
  }
}
export function readLogFile(filePath): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
//return log path with require folder name
export function getLogPath(folderName: string, fileName?: string, type = 'error') {
  if (!fileName) {
    fileName = uuidv4({ random: getRandomValues(new Uint8Array(16)) })
  }
  const tokenService = new Token()
  // console.log(path.join(__dirname, 'utilityCode.js'))
  let logpath = tokenService.getValue(USERLOGPATH)
  if (!logpath) {
    const useremail = tokenService.getValue(USEREMAIL)
    //create log path
    logpath = getApplogspath(useremail)
  }
  // console.log(logpath)
  const uuid = uuidv4({ random: getRandomValues(new Uint8Array(16)) })

  const errorLogfile = path.join(logpath, folderName, fileName + '_' + uuid + '.' + type + '.log')
  return errorLogfile
}
export function getFileNameWithoutExtension(filePath: string): string {
  return path.parse(filePath).name;
}