"use strict";
export {};
import {ProcessMessage} from "@/entityTypes/processMessage-type"
import {EmailSearch} from "@/childprocess/emailSearch"
//import {EmailSearchData} from "@/entityTypes/emailextraction-type"
import { EmailsControldata,EmailResult } from '@/entityTypes/emailextraction-type'
//import { } from "@/entityTypes/videoType";
// import {YoutubeDownload} from "@/modules/videodownload/youtubeDownload"
//import {CookiesProxy} from "@/entityTypes/videoType"
import {Proxy} from "@/entityTypes/proxyType"
import {VideoDownloadFactory} from "@/modules/videodownload/VideoDownloadFactory"
import {VideodoanloadSuccessCall,VideoCaptionGenerateParam,CookiesProxy,processVideoDownloadParam,VideodownloadMsg,VideodownloadTaskMsg} from "@/entityTypes/videoType"
import {VideoCaptionFactory} from "@/modules/videoCaption/VideoCaptionFactory"
import { VideoCaptionImpl } from '@/modules/interface/VideoCaptionImpl';
import { extraFileEntity,VideoCaptionMsg } from "@/entityTypes/videoType";
//import {}
// import {removeParamsAfterAmpersand } from "@/modules/lib/function"
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
            await downloadVideo(param)
            break;
            // const videoDownloadFactory=new VideoDownloadFactory()
            // const downloadTool=VideoDownloadFactory.getDownloader(param.platform)
                    
            //         // const youtubeDownload=new YoutubeDownload()
            //         // if(!param.isplaylist){//sigle video
            //             param.link.forEach(async (element, index)=>{
            //                 let randCookiesproxy:CookiesProxy | null = null;
            //                 if(param.cookiesProxy){
            //                    randCookiesproxy =param.cookiesProxy[Math.floor(Math.random() * param.cookiesProxy.length)]
            //                 }
            //                 let itemProxy:Proxy|null=null;
            //                 if(param.proxy){
            //                     itemProxy=param.proxy[Math.floor(Math.random() * param.proxy.length)]
            //                 }
            //                 if(!param.isplaylist){//sigle video
            //                 await downloadTool.downloadVideo(element,param.savePath,param.BrowserName,randCookiesproxy,itemProxy,param.exePath,param.videoQuality,(errorstring)=>{
            //                     //error call
            //                     const message:ProcessMessage<VideodownloadMsg>={
            //                         action:"singlevideodownloadMsg",
            //                         data:{
            //                             link:element,
            //                             status:false,
            //                             log:errorstring
            //                         }
            //                     }
                               
            //                     process.parentPort.postMessage(JSON.stringify(message))
            //                     process.exit(1);
            //                 },(msg)=>{
            //                     //stdout call
            //                 },(param:VideodoanloadSuccessCall)=>{
            //                     //success call
            //                     console.log("success call")
            //                     const message:ProcessMessage<VideodownloadMsg>={
            //                         action:"singlevideodownloadMsg",
            //                         data:{
            //                             link:element,
            //                             status:true,
            //                             savepath:param.savepath,
            //                             title:param.title,
            //                             description:param.description,
            //                             tags:param.tags,
            //                             categories:param.categories
            //                         }
            //                     }
            //                     process.parentPort.postMessage(JSON.stringify(message))
            //                     process.exit(0);
            //                 }).catch((error)=>{
            //                     if(error instanceof Error){
            //                         const message:ProcessMessage<VideodownloadMsg>={
            //                             action:"singlevideodownloadMsg",
            //                             data:{
            //                                 link:element,
            //                                 status:false,
            //                                 log:error.message
            //                             }
            //                         }
            //                         process.parentPort.postMessage(JSON.stringify(message))
            //                         process.exit(1);
            //                     }
            //                 })
            //                 //signal download end
            //             }else{//download playlist
            //                 // await downloadTool.downloadPlaylist(element)
            //                 await downloadTool.downloadPlaylist(element,param.savePath,param.BrowserName,randCookiesproxy,itemProxy,param.exePath,param.videoQuality,param.successlink,(link,errorstring)=>{
            //                     const message:ProcessMessage<VideodownloadMsg>={
            //                         action:"singlevideodownloadMsg",
            //                         data:{
            //                             link:link,
            //                             status:false,
            //                             log:errorstring
            //                         }
            //                     }
                               
            //                     process.parentPort.postMessage(JSON.stringify(message))
            //                 },(msg)=>{
            //                     //stdout call
            //                 },(param:VideodoanloadSuccessCall)=>{
            //                     //success call
            //                     console.log("success call")
            //                     const message:ProcessMessage<VideodownloadMsg>={
            //                         action:"singlevideodownloadMsg",
            //                         data:{
            //                             link:element,
            //                             status:true,
            //                             savepath:param.savepath,
            //                             title:param.title,
            //                             description:param.description,
            //                             tags:param.tags,
            //                             categories:param.categories
            //                         }
            //                     }
            //                     process.parentPort.postMessage(JSON.stringify(message))
                                
            //                 },(error)=>{
            //                     //end call
            //                     if(error.length>0){
                                    
            //                         const message:ProcessMessage<VideodownloadTaskMsg>={
            //                             action:"videodownloadTaskMsg",
            //                             data:{
            //                                 msg:error
            //                             }
            //                         }
            //                         process.parentPort.postMessage(JSON.stringify(message))
                                    
            //                         process.exit(1);
            //                     }else{
            //                         process.exit(0);
            //                     }
                               
            //                 })

            //             }

            //             })
                       
                        
                   
               
            }
        case 'generateCaption':{
            
            //generate capation
            await generateCaption(pme.data as VideoCaptionGenerateParam)
            break;
        }    

        }
    
    
})
async function downloadVideo(param:processVideoDownloadParam){
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
                                link:param.link,
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
}
async function generateCaption(param:VideoCaptionGenerateParam){
    //get video caption tool
     const videoCaptionFactory=new VideoCaptionFactory()
    let captionTool:VideoCaptionImpl;
     if(!param.toolName){
    captionTool=videoCaptionFactory.getVideoCaptionTool(param.toolName)
     }else{
       captionTool=videoCaptionFactory.getVideoCaptionTool()
     }
     console.log(param)
     
     if(!param.videos||param.videos.length==0){
        const message:ProcessMessage<VideoCaptionMsg>={
            action:"generateCaptionMsg",
            data:{
                status:false,
                msg:"video list is empty",
                file:"",
                videoId:0
            }
        }
       
        process.parentPort.postMessage(JSON.stringify(message))
        process.exit(1);
     }
    // param.videos.forEach(async (element, index)=>{
    for(const element of param.videos){
    let modelName="medium"
        if(element.isEnglish){
            modelName="medium.en"
        }

        const data:extraFileEntity={
            file:element.videoPath,
            savePath:element.savePath,
            // execPath:element.execPath,
            model:modelName,
            errorCall:(errorMsg: string)=>{
                const message:ProcessMessage<VideoCaptionMsg>={
                    action:"generateCaptionMsg",
                    data:{
                        status:false,
                        msg:errorMsg,
                        file:element.videoPath,
                        videoId:element.videoId
                    }
                }
               
                process.parentPort.postMessage(JSON.stringify(message))
            },
            stroutCall:(message: string)=>{
                
               
               console.log(message)
            },
            successCall:()=>{
                const message:ProcessMessage<VideoCaptionMsg>={
                    action:"generateCaptionMsg",
                    data:{
                        status:true,
                        msg:"",
                        file:element.videoPath,
                        savepath:element.savePath,
                        videoId:element.videoId
                    }
                }
               
                process.parentPort.postMessage(JSON.stringify(message))
            }
        }
        await captionTool.extractCaption(data)
    }
    process.exit(0);
}