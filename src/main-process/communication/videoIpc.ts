import { ipcMain } from 'electron';
import { VIDEODOWNLOAD, VIDEODOWNLOAD_MESSAGE, VIDEODOWNLOAD_TASK_LIST, VIDEODOWNLOAD_LIST, VIDEODOWNLOADTASK_RETRY, VIDEODOWNLOADITEM_RETRY, VIDEODOWNLOAD_ITEM_MESSAGE, VIDEODOWNLOADITEM_EXPLORER, VIDEODOWNLOADITEM_DELETE, VIDEODOWN_TASK_ERROR_LOG_QUERY, VIDEO_CAPTION_GENERATE, VIDEOTASKDOWNLOAD_RETRY_MESSAGE, VIDEODOWNLOAD_LOG_QUERY, SYSTEM_MESSAGE, VIDEODOWNLOAD_DETAIL_QUERY, VIDEODOWNLOAD_OPEN_CAPTIONFILE,VIDEO_VOICE_TRANSLATE } from '@/config/channellist'
import { videoController } from '@/controller/videoController';
import { CommonDialogMsg, CommonResponse, CommonIdrequest, CommonMessage, CommonIdrequestType } from "@/entityTypes/commonType";
import { CustomError } from '@/modules/customError';
import { VideoDownloadTaskEntity, VideoDownloadQuery, VideoDownloadListDisplay, downloadVideoparam, VideoCaptionGenerateParamWithIds, VideoCompotionEntity } from "@/entityTypes/videoType";

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

        await videoCtrl.downloadVideo(qdata, () => {
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
            if (error instanceof CustomError) {
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

            } else if (error instanceof Error) {
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
            qdata.page = 0
        }
        if (!("size" in qdata)) {
            qdata.size = 10
        }
        //return video download list
        const videoCtrl = new videoController()
        const res = await videoCtrl.videoDownloadtasklist(qdata.page, qdata.size)
        const resp: CommonResponse<VideoDownloadTaskEntity> = {
            status: true,
            msg: "video.download_list",
            data: res
        }
        return resp
    })
    //get video download list by task id
    ipcMain.handle(VIDEODOWNLOAD_LIST, async (event, data) => {
        const qdata = JSON.parse(data) as VideoDownloadQuery;
        if (!("taskId" in qdata)) {
            throw new Error("taskId not found");
        }

        const res = await videoCtrl.videoDownloadlist(qdata.taskId, qdata.page, qdata.size)
        const resp: CommonResponse<VideoDownloadListDisplay> = {
            status: true,
            msg: "video.download_list",
            data: res
        }
        return resp
    })
    ipcMain.on(VIDEODOWNLOADTASK_RETRY, async (event, data) => {
        const qdata = JSON.parse(data) as VideoDownloadQuery;
        if (!("taskId" in qdata)) {
            throw new Error("taskId not found");
        }
        await videoCtrl.retryDownloadvideo(qdata.taskId, () => {
            const videoMsgs: CommonDialogMsg = {
                status: true,
                code: 200,
                data: {
                    title: "video.download_start",
                    content: "video.revice_download_command"
                }
            }
            event.sender.send(VIDEOTASKDOWNLOAD_RETRY_MESSAGE, videoMsgs)
        })
    })
    //retry download video item by id
    ipcMain.on(VIDEODOWNLOADITEM_RETRY, async (event, data) => {
        const qdata = JSON.parse(data) as CommonIdrequest<number>
        if (!("id" in qdata)) {
            throw new Error("id not found");
        }
        await videoCtrl.redownloadItembyId(qdata.id, () => {
            const videoMsgs: CommonDialogMsg = {
                status: true,
                code: 200,
                data: {
                    title: "video.download_start",
                    content: "video.revice_download_command"
                }
            }
            event.sender.send(VIDEODOWNLOAD_ITEM_MESSAGE, videoMsgs)
        })


    })
    //open file in explorer
    ipcMain.on(VIDEODOWNLOADITEM_EXPLORER, async (event, data) => {
        const qdata = JSON.parse(data) as CommonIdrequest<number>
        if (!("id" in qdata)) {
            throw new Error("id not found");
        }
        await videoCtrl.showFileExplorer(qdata.id)

    })

    ipcMain.on(VIDEODOWNLOADITEM_DELETE, async (event, data) => {
        const qdata = JSON.parse(data) as CommonIdrequest<number>
        if (!("id" in qdata)) {
            throw new Error("id not found");
        }
        await videoCtrl.deleteVideoDownloadItem(qdata.id)

    })
    ipcMain.handle(VIDEODOWN_TASK_ERROR_LOG_QUERY, async (event, data) => {
        // readTaskErrorlog
        const qdata = JSON.parse(data) as CommonIdrequestType<number>
        if (!("id" in qdata)) {
            throw new Error("id not found");
        }
        const res = await videoCtrl.readTaskErrorlog(qdata.id).then((data) => {
            const videoMsgs: CommonMessage<string> = {
                status: true,
                msg: "",
                data: data
            }
            return videoMsgs
            // event.sender.send(VIDEODOWN_TASK_ERROR_LOG, videoMsgs)
        }).catch((error) => {
            if (error instanceof Error) {
                const videoMsgs: CommonMessage<string> = {
                    status: false,
                    msg: error.message
                }
                return videoMsgs
                // event.sender.send(VIDEODOWN_TASK_ERROR_LOG, videoMsgs)
            }

        })
        return res
    })

    ipcMain.on(VIDEO_CAPTION_GENERATE, async (event, data) => {
        const qdata = JSON.parse(data) as VideoCaptionGenerateParamWithIds<number>
        if (!("ids" in qdata)) {
            throw new Error("id not found");
        }
        const startMsg: CommonDialogMsg = {
            status: true,
            code: 0,
            data: {
                title: "video.caption_generate_start",
                content: "video.caption_generate_start"
            }
        }
        event.sender.send(SYSTEM_MESSAGE, startMsg)
        await videoCtrl.generateCaptionbyids(qdata, (errorMsg) => {
            const videoMsgs: CommonDialogMsg = {
                status: false,
                code: 20240513142039,
                data: {
                    title: "video.caption_generate_failed",
                    content: errorMsg
                }
            }
            event.sender.send(SYSTEM_MESSAGE, videoMsgs)
        }).catch((error) => {
            if (error instanceof Error) {
                const videoMsgs: CommonDialogMsg = {
                    status: false,
                    code: 20240513142039,
                    data: {
                        title: "video.caption_generate_failed",
                        content: error.message
                    }
                }
                event.sender.send(SYSTEM_MESSAGE, videoMsgs)
                return
            }
        })




    })
    ipcMain.handle(VIDEODOWNLOAD_LOG_QUERY, async (event, data) => {
        const qdata = JSON.parse(data) as CommonIdrequestType<number>
        if (!("id" in qdata)) {
            throw new Error("id not found");
        }
        try {
            const content = await videoCtrl.getVideoErrorlog(qdata.id)
            const videoMsgs: CommonMessage<string> = {
                status: true,
                msg: "",
                data: content
            }
            // console.log(videoMsgs)
            return videoMsgs

            // if(videoCompositeEntity){
            //     const videoMsgs: CommonMessage<string> = {
            //         status: true,
            //         msg: "",

            //     }

            // }
        } catch (error) {
            if (error instanceof Error) {
                const videoMsgs: CommonMessage<string> = {
                    status: false,
                    msg: error.message
                }
                return videoMsgs
            }
        }
    })
    ipcMain.handle(VIDEODOWNLOAD_DETAIL_QUERY, async (event, data) => {
        try {
            const qdata = JSON.parse(data) as CommonIdrequest<number>
            if (!("id" in qdata)) {
                throw new Error("id not found");
            }
            const content: VideoCompotionEntity = videoCtrl.getVideoinfo(qdata.id)
            console.log(content)
            const videoMsgs: CommonMessage<VideoCompotionEntity> = {
                status: true,
                msg: "",
                data: content
            }
            return videoMsgs

        } catch (error) {
            console.error(error)
            if (error instanceof Error) {
                const videoMsgs: CommonMessage<VideoCompotionEntity> = {
                    status: false,
                    msg: error.message
                }
                return videoMsgs
            }
        }
    })
    ipcMain.on(VIDEODOWNLOAD_OPEN_CAPTIONFILE, async (event, data) => {
        try {
            const qdata = JSON.parse(data) as CommonIdrequest<number>
            if (!("id" in qdata)) {
                throw new Error("id not found");
            }
            videoCtrl.showCaptionFileExplorer(qdata.id)
        } catch (error) {
            if (error instanceof Error) {
                const videoMsgs: CommonDialogMsg = {
                    status: false,
                    code: 202502111129,
                    data: {
                        title: "video.open_caption_file_error",
                        content: error.message
                    }
                }
                event.sender.send(SYSTEM_MESSAGE, videoMsgs)
                return
            }
        }
    })
    //translate video information
    ipcMain.on(VIDEO_VOICE_TRANSLATE, async (event, data) => {
        const qdata = JSON.parse(data) as CommonIdrequest<number>
        if (!("id" in qdata)) {
            throw new Error("id not found");
        }
     
    })
}
