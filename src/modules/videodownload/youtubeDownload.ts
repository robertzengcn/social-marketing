import {videoDownloadImpl} from "@/modules/interface/videoDownloadImpl"
import { CustomError } from "@/modules/customError"
import { exec } from "child_process";
import { promisify } from "util";
import {CookiesProxy} from "@/entityTypes/videoType"
import {Proxy,ProxyParseItem} from "@/entityTypes/proxyType"
import {convertCookiesToNetscapeFile,generateRandomUniqueString,proxyEntityToUrl} from "@/modules/lib/function"
import * as fs from 'fs';
import * as path from 'path';
const execAsync = promisify(exec);
export class youtubeDownload implements videoDownloadImpl {
    async downloadVideo(url:string,savePath:string,cookiesProxy?:CookiesProxy,proxy?:Proxy,execPath?:string,errorCall?:(errorMsg:string)=>void,stroutCall?:(message:string)=>void){
        if(!execPath){
            throw new CustomError("youtube video package not found")
        }
        let command = `${execPath} -o ${savePath} ${url}`;
        let cookiesFilePath='';
        if(cookiesProxy){
            if(cookiesProxy.cookies){
                const cookiesObj=JSON.parse(cookiesProxy.cookies);
                const randomName=generateRandomUniqueString(10)
                cookiesFilePath = path.join(__dirname, 'cookies-'+randomName+'.txt');
                command+='--cookies'+' '+cookiesFilePath

            }
            if(cookiesProxy.proxy){

            }
        }
        if(proxy){
           if(!command.indexOf("--proxy")){
                //convert proxy to proxy ProxyParseItem
                const proxyitem:ProxyParseItem = {
                    host: proxy.host,
                    port: proxy.port,
                    user: proxy.username,
                    pass: proxy.password,
                    protocol: proxy.protocol
                }
                const proxyStr=proxyEntityToUrl(proxyitem)
           }
        }

        const { stdout, stderr } = await execAsync(command);
        if(errorCall){
            errorCall(stderr)
        }
        if(stroutCall){
            stroutCall(stdout)
        }
    }
}