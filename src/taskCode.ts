"use strict";
export {};
import {ProcessMessage} from "@/entityTypes/processMessage-type"
import {EmailSearch} from "@/childprocess/emailSearch"
//import {EmailSearchData} from "@/entityTypes/emailextraction-type"
import { EmailsControldata,EmailResult } from '@/entityTypes/emailextraction-type'
import {processVideoDownloadParam,VideodownloadMsg,VideodownloadTaskMsg } from "@/entityTypes/videoType";
// import {YoutubeDownload} from "@/modules/videodownload/youtubeDownload"
import {CookiesProxy} from "@/entityTypes/videoType"
import {Proxy} from "@/entityTypes/proxyType"
import {VideoDownloadFactory} from "@/modules/videodownload/VideoDownloadFactory"
import {VideodoanloadSuccessCall} from "@/entityTypes/videoType"
import {removeParamsAfterAmpersand } from "@/modules/lib/function"
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
            // const videoDownloadFactory=new VideoDownloadFactory()
            const downloadTool=VideoDownloadFactory.getDownloader(param.platform)
                    
                    // const youtubeDownload=new YoutubeDownload()
                    // if(!param.isplaylist){//sigle video
                        param.link.forEach(async (element, index)=>{
                            let randCookiesproxy:CookiesProxy | null = null;
                            if(param.cookiesProxy){
                               randCookiesproxy =param.cookiesProxy[Math.floor(Math.random() * param.cookiesProxy.length)]
                            }
                            let itemProxy:Proxy|null=null;
                            if(param.proxy){
                                itemProxy=param.proxy[Math.floor(Math.random() * param.proxy.length)]
                            }
                            if(!param.isplaylist){//sigle video
                            await downloadTool.downloadVideo(element,param.savePath,param.BrowserName,randCookiesproxy,itemProxy,param.exePath,param.videoQuality,(errorstring)=>{
                                //error call
                                const message:ProcessMessage<VideodownloadMsg>={
                                    action:"singlevideodownloadMsg",
                                    data:{
                                        link:element,
                                        status:false,
                                        log:errorstring
                                    }
                                }
                               
                                process.parentPort.postMessage(JSON.stringify(message))
                                process.exit(1);
                            },(msg)=>{
                                //stdout call
                            },(param:VideodoanloadSuccessCall)=>{
                                //success call
                                console.log("success call")
                                const message:ProcessMessage<VideodownloadMsg>={
                                    action:"singlevideodownloadMsg",
                                    data:{
                                        link:element,
                                        status:true,
                                        savepath:param.savepath,
                                        title:param.title,
                                        description:param.description,
                                        tags:param.tags,
                                        categories:param.categories
                                    }
                                }
                                process.parentPort.postMessage(JSON.stringify(message))
                                process.exit(0);
                            }).catch((error)=>{
                                if(error instanceof Error){
                                    const message:ProcessMessage<VideodownloadMsg>={
                                        action:"singlevideodownloadMsg",
                                        data:{
                                            link:element,
                                            status:false,
                                            log:error.message
                                        }
                                    }
                                    process.parentPort.postMessage(JSON.stringify(message))
                                    process.exit(1);
                                }
                            })
                            //signal download end
                        }else{//download playlist
                            // await downloadTool.downloadPlaylist(element)
                            await downloadTool.downloadPlaylist(element,param.savePath,param.BrowserName,randCookiesproxy,itemProxy,param.exePath,param.videoQuality,param.successlink,(link,errorstring)=>{
                                const message:ProcessMessage<VideodownloadMsg>={
                                    action:"singlevideodownloadMsg",
                                    data:{
                                        link:link,
                                        status:false,
                                        log:errorstring
                                    }
                                }
                               
                                process.parentPort.postMessage(JSON.stringify(message))
                            },(msg)=>{
                                //stdout call
                            },(param:VideodoanloadSuccessCall)=>{
                                //success call
                                console.log("success call")
                                const message:ProcessMessage<VideodownloadMsg>={
                                    action:"singlevideodownloadMsg",
                                    data:{
                                        link:element,
                                        status:true,
                                        savepath:param.savepath,
                                        title:param.title,
                                        description:param.description,
                                        tags:param.tags,
                                        categories:param.categories
                                    }
                                }
                                process.parentPort.postMessage(JSON.stringify(message))
                                
                            },(error)=>{
                                //end call
                                if(error.length>0){
                                    
                                    const message:ProcessMessage<VideodownloadTaskMsg>={
                                        action:"videodownloadTaskMsg",
                                        data:{
                                            msg:error
                                        }
                                    }
                                    process.parentPort.postMessage(JSON.stringify(message))
                                    
                                    process.exit(1);
                                }else{
                                    process.exit(0);
                                }
                               
                            })

                        }

                        })
                       
                        
                    // }else{//player list
                    //     await downloadTool.downloadPlaylist(element,param.savePath,)
                    // }
               
            }
        case 'generateCaption':{
            //generate capation

        }    

        }
    
    
})