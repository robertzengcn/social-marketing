const path = require("path");
// import { exec } from 'child_process';
import { execSync } from 'child_process';
import { Notification } from 'electron'
import { exec } from 'child_process';
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
      var timer = setInterval(() => {
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
      return path.join(process.env.HOME, 'Library', 'Application Support');
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
  return path.join(process.env.HOME, appname, 'log');
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
export function installPipPackage(packageName: string,version:string,errorcall?:Function,stdoutCall?:Function,stderrCall?:Function): void {
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
export function uninstallPipPackage(packageName: string,errorcall?:Function,stdoutCall?:Function,stderrCall?:Function): void {
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

