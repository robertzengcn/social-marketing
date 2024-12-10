"use strict";
export {};
import {ProcessMessage} from "@/entityTypes/processMessage-type"
import {EmailSearch} from "@/childprocess/emailSearch"
//import {EmailSearchData} from "@/entityTypes/emailextraction-type"
import { EmailsControldata,EmailResult } from '@/entityTypes/emailextraction-type'
import {processVideoDownloadParam,VideodownloadMsg } from "@/entityTypes/videoType";
import {YoutubeDownload} from "@/modules/videodownload/youtubeDownload"
import {CookiesProxy} from "@/entityTypes/videoType"
import {Proxy} from "@/entityTypes/proxyType"
process.parentPort.on('message', async (e) => {
    // const [port] = e.ports
    // console.log("get parent message")
    // console.log(e)
    const pme=JSON.parse(e.data) as ProcessMessage<any>
    switch(pme.action){
        //check action
        case "searchEmail": {
            
            const userEmaildata=pme.data as EmailsControldata;

                if(!userEmaildata){
                    console.error("data is empty")
                    return
                }
           const emailSearchModel=new EmailSearch()   
           await emailSearchModel.searchEmail(userEmaildata,(res)=>{
                const message:ProcessMessage<EmailResult>={
                    action:"saveres",
                    data:res
                }
               
                process.parentPort.postMessage(JSON.stringify(message))
            })
            break;
        }
        case 'downloadVideo':{
            // const pme=JSON.parse(e.data) as ProcessMessage<processVideoDownloadParam> 
            const param=pme.data as processVideoDownloadParam
            if(!param.platform){
                console.error("platform is empty")
                return
            }
            
            switch(param.platform){
                case 'youtube':{
                    const youtubeDownload=new YoutubeDownload()
                    if(!param.isplaylist){//sigle video
                        param.link.forEach((element, index)=>{
                            let randCookiesproxy:CookiesProxy | null = null;
                            if(param.cookiesProxy){
                               randCookiesproxy =param.cookiesProxy[Math.floor(Math.random() * param.cookiesProxy.length)]
                            }
                            let itemProxy:Proxy|null=null;
                            if(param.proxy){
                                itemProxy=param.proxy[Math.floor(Math.random() * param.proxy.length)]
                            }
                            youtubeDownload.downloadVideo(element,param.savePath,randCookiesproxy,itemProxy,param.exePath,(errorstring)=>{
                                const message:ProcessMessage<VideodownloadMsg>={
                                    action:"videodownloadErrorMsg",
                                    data:{
                                        link:element,
                                        status:false,
                                        log:errorstring
                                    }
                                }
                               
                                process.parentPort.postMessage(JSON.stringify(message))
                            },(msg)=>{
                                const message:ProcessMessage<VideodownloadMsg>={
                                    action:"videodownloadErrorMsg",
                                    data:{
                                        link:element,
                                        status:true
                                    }
                                }
                                process.parentPort.postMessage(JSON.stringify(message))
                            })
                        })
                       
                        
                    }else{//player list

                    }
                }
            }

        }
    }
})