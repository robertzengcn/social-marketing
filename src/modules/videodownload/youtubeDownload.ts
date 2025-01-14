import { videoDownloadImpl } from "@/modules/interface/videoDownloadImpl"
import { CustomError } from "@/modules/customError"
import { exec } from "child_process";
import { promisify } from "util";
import { CookiesProxy,VideodoanloadSuccessCall,YoutubedlStrout } from "@/entityTypes/videoType"
import { Proxy, ProxyParseItem } from "@/entityTypes/proxyType"
import { convertCookiesToNetscapeFile, generateRandomUniqueString, proxyEntityToUrl,removeParamsAfterAmpersand } from "@/modules/lib/function"
import { CookiesType} from "@/entityTypes/cookiesType"
import * as fs from 'fs';
import puppeteer from 'puppeteer';
// import { Page, Browser} from 'puppeteer';

// import * as fs from 'fs';
import * as path from 'path';
const execAsync = promisify(exec);
export class YoutubeDownload implements videoDownloadImpl {
    private playerlisttype="/playlist?"
    // private signalplaytype="/watch?"
    async downloadVideo(url: string, savePath: string, useBrowserCookies?:string,cookiesProxy?: CookiesProxy | null, proxy?: Proxy | null, execPath?: string, videoQuality?:number,errorCall?: (link:string,errorMsg: string) => void, stroutCall?: (message: string) => void, successCall?: (param:VideodoanloadSuccessCall) => void) {
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
        // if(isSingleVideo){
            command+=' --no-playlist'
        // }
        if(videoQuality){
            command+=' --audio-quality '+Math.round(videoQuality)
        }
        command+=' -o "%(title)s-%(id)s.%(ext)s" --restrict-filenames'
        execcommand=command+' --no-simulate --print after_move:filepath'
        // command+=' --print after_move:filepath'
        execcommand=execcommand+' "'+url+'"'
        console.log(execcommand)
        const { stdout, stderr } = await execAsync(execcommand);
        if (stroutCall) {
            console.log("start strout call")
            console.log(stdout)
            stroutCall(stdout)
        }
        if (stderr) {
            console.error("download error "+stderr)
            if (errorCall) {
                errorCall(url,stderr)
            }
        } else {
            if (successCall) {
                console.log("start success call")
                let downloadedFilePath = '';
                if(stdout){
                    //stdout is the file path, check file path is exist
                    downloadedFilePath = stdout.trim() // Remove any quotation marks
                    if (fs.existsSync(downloadedFilePath)) {
                        // const jscommand=command+" "+url
                        //download success, start to get video title and description
                        await this.getVideodesc(command,url).then((data)=>{
                           
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
                        console.log("error of file not found in path")
                        if (errorCall) {
                            errorCall(url,"file not found in path")
                        }
                    }
                   
                     
                }
                
            }else{
                console.log("no success call")
            }

        }
        if(cookiesFilePath){
            //check file exist
            if (fs.existsSync(cookiesFilePath)) {
            fs.unlinkSync(cookiesFilePath)
            }
        }

    }
    //download playlist
    async downloadPlaylist(url: string, savePath: string, useBrowserCookies?:string,cookiesProxy?: CookiesProxy | null, proxy?: Proxy | null, execPath?: string, videoQuality?:number,ignoreLink?:Array<string>,errorCall?: (link:string,errorMsg: string) => void, stroutCall?: (message: string) => void, successCall?: (param:VideodoanloadSuccessCall) => void,endCall?:(error:string)=>void) {
        const urls=await this.getPlaylist(url)
        let error=""
        if(urls){
            for(const urlitem of urls){
                if(ignoreLink){
                    if(ignoreLink.includes(removeParamsAfterAmpersand(urlitem))){
                        continue
                    }
                }
                //random stop for some time
                const randomStop=Math.floor(Math.random() * 10000);
                await new Promise(resolve => setTimeout(resolve, randomStop));
                
                await this.downloadVideo(urlitem,savePath,useBrowserCookies,cookiesProxy,proxy,execPath,videoQuality,errorCall,stroutCall,successCall).catch((err)=>{
                    if(err instanceof Error){
                        error=err.message
                        if(errorCall){
                            errorCall(urlitem,error)
                        }

                    }
                })

            }
        }else{
            error="playlist not found"
        }
        if(endCall){
            endCall(error)
        }
    }
    //get video title and description
    async getVideodesc(command:string,url:string):Promise<YoutubedlStrout|undefined>{
        const finalcommand=command+' --dump-single-json "'+url+'"'
        const { stdout, stderr } = await execAsync(finalcommand);
        if (stderr) {
            throw new CustomError(stderr)
        }
        return JSON.parse(stdout) as YoutubedlStrout
    }
    //get playlist video link
    async getPlaylist(url:string):Promise<Array<string>|null>{
        try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        await page.setViewport({width: 1080, height: 1024});
        const resultUrls:Array<string>=[];
        if(url.includes(this.playerlisttype)){
            const targetElement = await page.$('#continuations')
            if (targetElement) {
                await targetElement.scrollIntoView();  
            }
            const videoUrls = await page.$$eval('a#video-title', elements =>
                elements.map(el => el.href)
            );
            //console.log(videoUrls)
            //resultUrls.push(...videoUrls)
            if(videoUrls){
                for(let videoUrl of videoUrls){
                    if(videoUrl){
                        if(!videoUrl.includes("https://www.youtube.com")){
                            videoUrl='https://www.youtube.com'+videoUrl
                        }
                        resultUrls.push(videoUrl)
                    }
                }
            }
        }else{//get video link in single player
            //console.log("signal video")
            const videoUrls = await page.$$eval('#items ytd-playlist-panel-video-renderer', elements => {
                //console.log("get element")
                return elements.map(el => {
                    //console.log(el)
                    return el.querySelector('#wc-endpoint')?.getAttribute('href')
                });
            });
            //console.log(videoUrls)
            if(videoUrls){
                for(let videoUrl of videoUrls){
                    if(videoUrl){
                        if(!videoUrl.includes("https://www.youtube.com")){
                            videoUrl='https://www.youtube.com'+videoUrl
                        }
                        resultUrls.push(videoUrl)
                    }
                }
            }
        }
        return resultUrls
    } catch (error) {
        if(error instanceof Error){
        console.error('An error occurred:', error.message);
        }
        throw error
    }
    }
}