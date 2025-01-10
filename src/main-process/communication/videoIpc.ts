import { ipcMain } from 'electron';
import { VIDEODOWNLOAD, VIDEODOWNLOAD_MESSAGE, VIDEODOWNLOAD_TASK_LIST,VIDEODOWNLOAD_LIST,VIDEODOWNLOADTASK_RETRY,VIDEODOWNLOADITEM_RETRY } from '@/config/channellist'
import { videoController } from '@/controller/videoController';
import { CommonDialogMsg,CommonResponse,CommonIdrequest } from "@/entityTypes/commonType";
import { CustomError } from '@/modules/customError';
import {VideoDownloadTaskEntity,VideoDownloadQuery,VideoDownloadListDisplay,downloadVideoparam} from "@/entityTypes/videoType";

export function registerVideoIpcHandlers() {
    console.log("video download register")
    const videoCtrl = new videoController()
    ipcMain.on(VIDEODOWNLOAD, async (event, arg) => {
        // console.log("get video download message")
        const qdata = JSON.parse(arg) as downloadVideoparam;
        if (!("accountId" in qdata)) {
            // throw new Error("accountId not found");
            const comMsgs: CommonDialogMsg = {
                status: false,
                code: 202240521105617,
                data: {
                    title: "video.download_failed",
                    content: "video.account_id_not_found"
                }
            }
            event.sender.send(VIDEODOWNLOAD_MESSAGE, comMsgs)
            return
        }
        if (!("platform" in qdata)) {
            // throw new Error("platform not found");
            const comMsgs: CommonDialogMsg = {
                status: false,
                code: 2024052110230,
                data: {
                    title: "video.download_failed",
                    content: "video.platform_not_found"
                }
            }
            event.sender.send(VIDEODOWNLOAD_MESSAGE, comMsgs)
            return
        }
        if (!("link" in qdata)) {
            // throw new Error("link not found");
            const comMsgs: CommonDialogMsg = {
                status: false,
                code: 20240521105843,
                data: {
                    title: "video.download_failed",
                    content: "video.link_not_found"
                }
            }
            event.sender.send(VIDEODOWNLOAD_MESSAGE, comMsgs)
            return
        }
        if (!("savePath" in qdata)) {
            // throw new Error("savePath not found");
            const comMsgs: CommonDialogMsg = {
                status: false,
                code: 20240521105856,
                data: {
                    title: "video.download_failed",
                    content: "video.savePath_not_found"
                }
            }
            event.sender.send(VIDEODOWNLOAD_MESSAGE, comMsgs)
            return
        }
        // if (!("isplaylist" in qdata)) {

        // }

        
        // const dvp: downloadVideoparam = {
        //     accountId: qdata.accountId,
        //     platform: qdata.platform,
        //     link: qdata.link,
        //     savePath: qdata.savePath,
        //     isplaylist:qdata.isplaylist
        // }
        
        await videoCtrl.downloadVideo(qdata,()=>{
            // if(taskId){
                const videoMsgs: CommonDialogMsg = {
                    status: true,
                    code: 200,
                    data: {
                    title: "video.download_start",
                    content: "video.revice_download_command"
                    }
                }
                event.sender.send(VIDEODOWNLOAD_MESSAGE, videoMsgs)
            // }
            
        }).catch(function (error) {
            console.log("error:" + error)
            if(error instanceof CustomError){
                const comMsgs: CommonDialogMsg = {
                    status: false,
                    code: error.code,
                    data: {
                        title: "video.download_failed",
                        content: error.message
                    }
                }
                event.sender.send(VIDEODOWNLOAD_MESSAGE, comMsgs)
                return

            }else if (error instanceof Error) {
                const comMsgs: CommonDialogMsg = {
                    status: false,
                    code: 20240513142039,
                    data: {
                        title: "video.download_failed",
                        content: error.message
                    }
                }
                event.sender.send(VIDEODOWNLOAD_MESSAGE, comMsgs)
                return
            }
        })
        
        return
    })
    //get video download list
    ipcMain.handle(VIDEODOWNLOAD_TASK_LIST, async (event, data) => {
        const qdata = JSON.parse(data);
        if (!("page" in qdata)) {
            qdata.page=0
        }
        if (!("size" in qdata)) {
            qdata.size=10
        }
        //return video download list
        const videoCtrl = new videoController()
        const res = await videoCtrl.videoDownloadtasklist(qdata.page, qdata.size)
        const resp:CommonResponse<VideoDownloadTaskEntity>={
            status:true,
            msg:"video.download_list",
            data:res
        }
        return resp
    })
    //get video download list by task id
    ipcMain.handle(VIDEODOWNLOAD_LIST, async (event, data) => {
        const qdata = JSON.parse(data) as VideoDownloadQuery;
        if (!("taskId" in qdata)) {
            throw new Error("taskId not found");
        }
       
        const res = await videoCtrl.videoDownloadlist(qdata.taskId,qdata.page,qdata.size)
        const resp:CommonResponse<VideoDownloadListDisplay>={
            status:true,
            msg:"video.download_list",
            data:res
        }
        return resp
    })
    ipcMain.on(VIDEODOWNLOADTASK_RETRY, async (event, data) => {
        const qdata = JSON.parse(data) as VideoDownloadQuery;
        if (!("taskId" in qdata)) {
            throw new Error("taskId not found");
        }
        await videoCtrl.retryDownloadvideo(qdata.taskId,()=>{
            const videoMsgs: CommonDialogMsg = {
                status: true,
                code: 200,
                data: {
                title: "video.download_start",
                content: "video.revice_download_command"
                }
            }
            event.sender.send(VIDEODOWNLOAD_MESSAGE, videoMsgs)
        })
    })
    ipcMain.on(VIDEODOWNLOADITEM_RETRY, async (event, data) => { 
        const qdata = JSON.parse(data) as CommonIdrequest<number>
        if (!("id" in qdata)) {
            throw new Error("id not found");
        }
        

    })
}
