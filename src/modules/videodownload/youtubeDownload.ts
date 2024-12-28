import { videoDownloadImpl } from "@/modules/interface/videoDownloadImpl"
import { CustomError } from "@/modules/customError"
import { exec } from "child_process";
import { promisify } from "util";
import { CookiesProxy,VideodoanloadSuccessCall,YoutubedlStrout } from "@/entityTypes/videoType"
import { Proxy, ProxyParseItem } from "@/entityTypes/proxyType"
import { convertCookiesToNetscapeFile, generateRandomUniqueString, proxyEntityToUrl } from "@/modules/lib/function"
import { CookiesType} from "@/entityTypes/cookiesType"
import * as fs from 'fs';

// import * as fs from 'fs';
import * as path from 'path';
const execAsync = promisify(exec);
export class YoutubeDownload implements videoDownloadImpl {
    async downloadVideo(url: string, savePath: string, isSingleVideo:boolean=false,useBrowserCookies?:string,cookiesProxy?: CookiesProxy | null, proxy?: Proxy | null, execPath?: string, errorCall?: (errorMsg: string) => void, stroutCall?: (message: string) => void, successCall?: (param:VideodoanloadSuccessCall) => void) {
        if (!execPath) {
            throw new CustomError("youtube video package not found")
        }
        let execcommand = '';
        let command = `${execPath} -P ${savePath}`;
        let cookiesFilePath = '';
        if(useBrowserCookies){
            command+=' --cookies-from-browser '+useBrowserCookies
        }
        if (cookiesProxy) {
            //handle cookies
            if (cookiesProxy.cookies&&(!useBrowserCookies)) {
                const cookiesObj = JSON.parse(cookiesProxy.cookies) as CookiesType[]; 
                console.log(cookiesObj)
                const randomName = generateRandomUniqueString(10)
                cookiesFilePath = path.join(__dirname, 'cookies-' + randomName + '.txt');
                convertCookiesToNetscapeFile(cookiesObj, cookiesFilePath);
                console.log(cookiesFilePath)
                command += ' --cookies' + ' ' + cookiesFilePath+''

            }
            //handle cookies proxy
            if (cookiesProxy.proxy&&(!useBrowserCookies)) {
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
        if(isSingleVideo){
            command+=' --no-playlist'
        }
        command+=' -o "%(title)s-%(id)s.%(ext)s" --restrict-filenames'
        execcommand=command+' --audio-quality 0 --no-simulate --print after_move:filepath'
        // command+=' --print after_move:filepath'
        execcommand=execcommand+' "'+url+'"'
        console.log(execcommand)
        const { stdout, stderr } = await execAsync(execcommand);
        if (stroutCall) {
            stroutCall(stdout)
        }
        if (stderr) {
            if (errorCall) {
                errorCall(stderr)
            }
        } else {
            if (successCall) {
                let downloadedFilePath = '';
                if(stdout){
                    //stdout is the file path, check file path is exist
                    downloadedFilePath = stdout.trim().replace(/"/g, ''); // Remove any quotation marks
                    if (fs.existsSync(downloadedFilePath)) {
                        //download success, start to get video title and description
                        await this.getVideodesc(command).then((data)=>{
                           
                        const sendParam:VideodoanloadSuccessCall={
                            link:url,
                            title:data?.title?data.title:'',
                            description:data?.description?data.description:'',
                            savepath:downloadedFilePath,
                            tags:data?.tags?data.tags:[],
                            categories:data?.categories?data.categories:[],
                        }
                        successCall(sendParam)

                    })
                    }else{
                        if (errorCall) {
                            errorCall("file not found in path")
                        }
                    }
                   
                     
                }
                
            }

        }

    }

    async downloadPlaylist(url: string, savePath: string, cookiesProxy?: CookiesProxy | null, proxy?: Proxy | null, execPath?: string, errorCall?: (errorMsg: string) => void, stroutCall?: (message: string) => void) {

    }
    //get video title and description
    async getVideodesc(command:string):Promise<YoutubedlStrout|undefined>{
        const finalcommand=command+" --dump-single-json"
        const { stdout, stderr } = await execAsync(command);
        if (stderr) {
            throw new CustomError(stderr)
        }
        return JSON.parse(stdout) as YoutubedlStrout
    }
}