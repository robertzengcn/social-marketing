import { videoDownloadImpl } from "@/modules/interface/videoDownloadImpl"
import { CustomError } from "@/modules/customError"
import { exec } from "child_process";
import { promisify } from "util";
import { CookiesProxy } from "@/entityTypes/videoType"
import { Proxy, ProxyParseItem } from "@/entityTypes/proxyType"
import { convertCookiesToNetscapeFile, generateRandomUniqueString, proxyEntityToUrl } from "@/modules/lib/function"

// import * as fs from 'fs';
import * as path from 'path';
const execAsync = promisify(exec);
export class YoutubeDownload implements videoDownloadImpl {
    async downloadVideo(url: string, savePath: string, cookiesProxy?: CookiesProxy | null, proxy?: Proxy | null, execPath?: string, errorCall?: (errorMsg: string) => void, stroutCall?: (message: string) => void, successCall?: () => void) {
        if (!execPath) {
            throw new CustomError("youtube video package not found")
        }
        let command = `${execPath} -o ${savePath} ${url}`;
        let cookiesFilePath = '';
        if (cookiesProxy) {
            //handle cookies
            if (cookiesProxy.cookies) {
                const cookiesObj = JSON.parse(cookiesProxy.cookies);

                const randomName = generateRandomUniqueString(10)
                cookiesFilePath = path.join(__dirname, 'cookies-' + randomName + '.txt');
                convertCookiesToNetscapeFile(cookiesObj, cookiesFilePath);
                command += ' --cookies' + ' ' + cookiesFilePath

            }
            //handle cookies proxy
            if (cookiesProxy.proxy) {
                // const proxies = JSON.parse(cookiesProxy.proxy) as ProxyParseItem[];
                const randomProxy = cookiesProxy.proxy[Math.floor(Math.random() * cookiesProxy.proxy.length)];
                if (randomProxy.host && randomProxy.port) {
                    const ProxyParse: ProxyParseItem = {
                        host: randomProxy.host,
                        port: randomProxy.port,
                        user: randomProxy.username,
                        pass: randomProxy.password,
                        protocol: randomProxy.protocol
                    }
                    const proxyStr = proxyEntityToUrl(ProxyParse);
                    command += ' --proxy ' + proxyStr;
                }
            }
        }
        if (proxy) {
            if (!command.indexOf("--proxy")) {
                //convert proxy to proxy ProxyParseItem
                if (proxy.host && proxy.port) {
                    const proxyitem: ProxyParseItem = {
                        host: proxy.host,
                        port: proxy.port,
                        user: proxy.username,
                        pass: proxy.password,
                        protocol: proxy.protocol
                    }
                    const proxyStr = proxyEntityToUrl(proxyitem)
                    command += ' --proxy ' + proxyStr
                }
            }
        }

        const { stdout, stderr } = await execAsync(command);
        if (stroutCall) {
            stroutCall(stdout)
        }
        if (stderr) {
            if (errorCall) {
                errorCall(stderr)
            }
        } else {
            if (successCall) {
                successCall()
            }

        }

    }

    async downloadPlaylist(url: string, savePath: string, cookiesProxy?: CookiesProxy | null, proxy?: Proxy | null, execPath?: string, errorCall?: (errorMsg: string) => void, stroutCall?: (message: string) => void) {

    }
}