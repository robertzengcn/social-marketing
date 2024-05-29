import { ipcMain } from 'electron';
import { VIDEODOWNLOAD, VIDEODOWNLOAD_MESSAGE, SYSTEM_MESSAGE,VIDEODOWNLOAD_LIST } from '@/config/channellist'
import { videoController } from '@/controller/videoController';
import { downloadVideoparam, videoDownloadListResp } from "@/entityTypes/videoType";
import { CommonDialogMsg } from "@/entityTypes/commonType";


export function registerVideoIpcHandlers() {
    console.log("video download register")
    ipcMain.on(VIDEODOWNLOAD, async (event, arg) => {
        console.log("get video download message")
        const qdata = JSON.parse(arg);
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

        const videoCtrl = new videoController()
        const dvp: downloadVideoparam = {
            accountId: qdata.accountId,
            platform: qdata.platform,
            link: qdata.link,
            savePath: qdata.savePath
        }
        const videoMsgs: CommonDialogMsg = {
            status: true,
            code: 200,
            data: {
            title: "video.download_start",
            content: "video.revice_download_command"
            }
        }
        event.sender.send(VIDEODOWNLOAD_MESSAGE, videoMsgs)
        await videoCtrl.downloadVideo(dvp).catch(function (error) {
            if (error instanceof Error) {
                const comMsgs: CommonDialogMsg = {
                    status: false,
                    code: 20240513142039,
                    data: {
                        title: "video.download_failed",
                        content: error.message
                    }
                }
                event.sender.send(SYSTEM_MESSAGE, comMsgs)
                return
            }
        })
        const comMsgs: CommonDialogMsg = {
            status: true,
            code: 200,
            data: {
                title: "video.download_start",
                content: "video.start_download_video"
            }
        }
        event.sender.send(VIDEODOWNLOAD_MESSAGE, comMsgs)
        return
    })
    //get video download list
    ipcMain.handle(VIDEODOWNLOAD_LIST, async (event, data) => {
        const qdata = JSON.parse(data);
        if (!("page" in qdata)) {
            qdata.page=0
        }
        if (!("size" in qdata)) {
            qdata.size=10
        }
        //return video download list
        const videoCtrl = new videoController()
        const res = videoCtrl.videoDownloadlist(qdata.page, qdata.size)
        const resp:videoDownloadListResp={
            status:true,
            msg:"video.download_list",
            data:res
        }
        return resp
    })
}
