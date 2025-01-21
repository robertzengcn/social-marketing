import { videoFactory } from "@/modules/video/videoFactory";
import { downloadVideoparam, VideoDownloadTaskEntity, processVideoDownloadParam, CookiesProxy } from "@/entityTypes/videoType";
// import { VideoDownloadTaskdb } from "@/model/videoDownloadTaskdb";
// import { VideoDownloaddb} from "@/model/videoDownloaddb"
import { VideoDownloadModule } from "@/modules/VideoDownloadModule"
import { VideoDownloadTaskModule } from "@/modules/VideoDownloadTaskModule"
import { Token } from "@/modules/token"
import * as path from 'path';
import * as fs from 'fs';
import { utilityProcess, MessageChannelMain } from "electron";
import { USERLOGPATH, USEREMAIL } from '@/config/usersetting';
import { WriteLog, getApplogspath, getRandomValues, removeParamsAfterAmpersand,readLogFile } from "@/modules/lib/function"
import { v4 as uuidv4 } from 'uuid';
// import { CustomError } from '@/modules/customError'
import { AccountCookiesModule } from "@/modules/accountCookiesModule"
import { SocialAccountApi } from "@/api/socialAccountApi"
import { ProcessMessage } from "@/entityTypes/processMessage-type"
// import {VideodownloadMsg} from "@/entityTypes/videoType";
import { ListData, TaskStatus } from "@/entityTypes/commonType"
import { VideoDownloadEntity, VideoDownloadStatus, VideoDescriptionEntity, VideodownloadTaskMsg, VideoDownloadListDisplay, VideodownloadMsg, DownloadVideoControlparam, VideoDownloadTaskDetailEntity, DownloadType, CookiesType,VideoCaptionEntity } from "@/entityTypes/videoType"
import { VideoDescriptionModule } from "@/modules/videoDescriptionModule"
import { Video } from '@/modules/interface/Video';
import { VideoDownloadTaskDetailModule } from '@/modules/VideoDownloadTaskDetailModule';
import { VideoDownloadTaskAccountsModule } from "@/modules/VideoDownloadTaskAccountsModule"
import { VideoDownloadTaskAccountEntity } from "@/entityTypes/videoType"
import { VideoDownloadTaskUrlModule } from "@/modules/VideoDownloadTaskUrlModule"
import { VideoDownloadTaskProxyModule } from "@/modules/VideoDownloadTaskProxyModule"
import { Proxy } from "@/entityTypes/proxyType"
import { ProxyApi } from "@/api/proxyApi"
import { shell } from "electron"
import {VideoCaptionFactory} from "@/modules/videoCaption/VideoCaptionFactory"
import { CustomError } from '@/modules/customError'
//import {} from "@/entityTypes/proxyType"
export class videoController {
    private videoDownloadModule: VideoDownloadModule
    private videoDownloadTaskModule: VideoDownloadTaskModule
    private accountCookiesModule: AccountCookiesModule
    private socialAccountApi: SocialAccountApi
    private videoDescriptionModule: VideoDescriptionModule
    private videoDownloadTaskDetailModule: VideoDownloadTaskDetailModule
    private videoDownloadTaskAccountsModule: VideoDownloadTaskAccountsModule
    private videoDownloadTaskUrlModule: VideoDownloadTaskUrlModule
    private videoDownloadTaskProxyModule: VideoDownloadTaskProxyModule
    constructor() {
        // const tokenService = new Token()
        // const dbpath = tokenService.getValue(USERSDBPATH)

        // if (!dbpath) {
        //     throw new Error("user db path not exist")
        // }
        this.videoDownloadModule = new VideoDownloadModule()
        this.videoDownloadTaskModule = new VideoDownloadTaskModule()
        this.accountCookiesModule = new AccountCookiesModule()
        this.socialAccountApi = new SocialAccountApi()
        this.videoDescriptionModule = new VideoDescriptionModule()
        this.videoDownloadTaskDetailModule = new VideoDownloadTaskDetailModule()
        this.videoDownloadTaskUrlModule = new VideoDownloadTaskUrlModule()
    }
    //get video download tool
    public async getVideoDownloadTool(platform: string): Promise<Video | null> {
        const videoFactoryInstance = new videoFactory()
        const videoTool = await videoFactoryInstance.getVideotool(platform)
        return videoTool
    }
    //check video tool requirement
    public async checkVideoRequirement(videoTool: Video): Promise<boolean> {
        return await videoTool.checkRequirement()
    }
    //save video task, get task id
    public saveVdieoDownloadTask(vdte: VideoDownloadTaskEntity): number {
        return this.videoDownloadTaskModule.saveVideoDownloadTask(vdte)
    }
    public async processDownloadVideo(param: DownloadVideoControlparam, videoTool: Video, taskId: number, startCall?: () => void) {
        // const videoFactoryInstance = new videoFactory()
        //get random one from array of param.accountId
        // const randomItem = param.accountId[Math.floor(Math.random() * param.accountId.length)]
        // const videoTool = await videoFactoryInstance.getVideotool(param.platform)
        // console.log("video tool:" + videoTool)
        // if (!videoTool) {

        //     throw new CustomError("video tool not found", 20241205111934)
        // }
        // const toolres=videoTool.checkRequirement()
        // if(!toolres){
        //     throw new CustomError("video tool check requirement failed", 20241205111934)
        // }
        const execFilepath = videoTool.getPackagepath()

        //save log to download task table
        // const videoTaskdb=new VideoDownloadTaskdb(dbpath)
        // const videoEntity: VideoDownloadTaskEntity = {
        //     taskName: param.taskName,
        //     platform: param.platform,
        //     // url: JSON.stringify(param.link),
        //     savepath: param.savePath,
        //     status: TaskStatus.Processing
        // }
        // const taskId = this.videoDownloadTaskModule.saveVideoDownloadTask(videoEntity)
        // if (!taskId) {
        //     throw new CustomError("video.create_download_task_failuer", 20241206153256)
        // }
        // console.log("task id:"+taskId)
        // const res=videoTool.checkRequirement()
        // if (startCall) {
        //     startCall(Number(taskId))
        // }

        // const videoDownloaddb=new VideoDownloaddb(dbpath)
        // if(res){
        // let idlinks:videoIdLink[]=[]
        // for (const link of param.link) {
        //     const vdentity:videoDownloadEntity={ 
        //         url:link,
        //         savepath:param.savePath,
        //         task_id:Number(taskId),
        //         status:DownloadStatus.Start
        //     }
        //     const downId=this.videoDownloaddb.saveVideoDownload(vdentity)
        //     const idlinkitem:videoIdLink={
        //         id:Number(downId),
        //         link:link
        //     }
        //     idlinks.push(idlinkitem)
        // }

        const childPath = path.join(__dirname, 'taskCode.js')
        if (!fs.existsSync(childPath)) {
            throw new Error("child js path not exist for the path " + childPath);
        }
        const { port1, port2 } = new MessageChannelMain()
        const tokenService = new Token()


        // console.log(path.join(__dirname, 'utilityCode.js'))
        let logpath = tokenService.getValue(USERLOGPATH)
        if (!logpath) {
            const useremail = tokenService.getValue(USEREMAIL)
            //create log path
            logpath = getApplogspath(useremail)
        }
        // console.log(logpath)
        const uuid = uuidv4({ random: getRandomValues(new Uint8Array(16)) })
        const errorLogfile = path.join(logpath, 'downloadVideo', taskId.toString() + '_' + uuid + '.error.log')
        const runLogfile = path.join(logpath, 'downloadVideo', taskId.toString() + '_' + uuid + '.runtime.log')

        this.videoDownloadTaskModule.updateTasklog(taskId, runLogfile)
        this.videoDownloadTaskModule.updateTaskErrorlog(taskId, errorLogfile)
        const cookiesProxies: CookiesProxy[] = []

        // const cookies:Array<string>=[]
        //loop account id to get cookies
        for (const accountid of param.accountId) {
            const accountEntity = this.accountCookiesModule.getAccountCookies(accountid)
            if (accountEntity && accountEntity.cookies) {
                // cookies.push(accountEntity.cookies)
                const cookiesproxy: CookiesProxy = {
                    cookies: accountEntity.cookies,
                }
                if (!param.ProxyOverride) {//not use account proxy
                    //get proxy
                    const accResp = await this.socialAccountApi.getAccountdetail(accountid)
                    if (accResp) {
                        if (accResp.data && accResp.data.proxy) {
                            cookiesproxy.proxy = accResp.data.proxy
                        }
                    }
                }
                cookiesProxies.push(cookiesproxy)
            }
            // const cookie=tokenService.getValue(accountid)
            // if(cookie){
            //     cookies.push(cookie)
            // }
        }
        const proxyArr: Array<Proxy> = []
        if (param.proxy.length > 0) {
            //get proxy from remote
            const proxyapi = new ProxyApi()
            param.proxy.forEach(async (value) => {
                const proxy = await proxyapi.getProxyDetail(value)
                if (proxy && proxy.status) {
                    if (proxy.data) {
                        proxyArr.push(proxy.data)
                    }
                }
            })
        }

        if (startCall) {
            startCall()
        }
        //get the video lnk that already download in the task
        const alreadsucess = this.videoDownloadModule.getAllvideoDownloadlist(taskId, VideoDownloadStatus.Finish)
        const alreadlinks = alreadsucess.map((value) => removeParamsAfterAmpersand(value.url))
        console.log(alreadlinks)
        const paramData: processVideoDownloadParam = {
            exePath: execFilepath,
            platform: param.platform,
            link: param.link,
            isplaylist: param.isplaylist,
            cookiesProxy: cookiesProxies,
            savePath: param.savePath,
            proxy: proxyArr,
            BrowserName: param.browserName,
            videoQuality: param.videoQuality,
            successlink: alreadlinks
        }
        console.log(childPath)
        const child = utilityProcess.fork(childPath, [], { stdio: "pipe" })

        child.on("spawn", () => {

            console.log("child process satart, pid is" + child.pid)
            this.videoDownloadTaskModule.updateVideoDownloadTaskStatus(taskId, TaskStatus.Processing)
            child.postMessage(JSON.stringify({ action: "downloadVideo", data: paramData }), [port1])

        })

        child.stdout?.on('data', (data) => {
            console.log(`Received data chunk ${data}`)
            WriteLog(runLogfile, data)
            // child.kill()
        })

        child.stderr?.on('data', (data) => {
            const ingoreStr = ["Debugger attached", "Waiting for the debugger to disconnect"]
            if (!ingoreStr.some((value) => data.includes(value))) {

                // seModel.saveTaskerrorlog(taskId,data)
                console.log(`Received error chunk ${data}`)
                WriteLog(errorLogfile, data)

            }

        })

        child.on("exit", (code) => {
            if (code !== 0) {
                console.error(`Child process exited with code ${code}`);
                this.videoDownloadTaskModule.updateVideoDownloadTaskStatus(taskId, TaskStatus.Error)
                // this.emailSeachTaskModule.updateTaskStatus(taskId,EmailsearchTaskStatus.Error)
            } else {
                console.log('Child process exited successfully');
                this.videoDownloadTaskModule.updateVideoDownloadTaskStatus(taskId, TaskStatus.Complete)
                // this.emailSeachTaskModule.updateTaskStatus(taskId,EmailsearchTaskStatus.Complete)
            }
        })
        child.on('message', (message) => {
            console.log("get message from child")
            console.log('Message from child:', JSON.parse(message));
            const childdata = JSON.parse(message) as ProcessMessage<any>
            if (childdata.action == "singlevideodownloadMsg") {//download single video result
                const getData = childdata.data as VideodownloadMsg
                if (getData?.status) {//download success

                    //save result
                    let savepath = ''
                    if (getData.savepath) {
                        savepath = getData.savepath
                    }
                    const videoDownloadEntity: VideoDownloadEntity = {
                        url: getData.link,
                        savepath: savepath,
                        task_id: Number(taskId),
                        status: VideoDownloadStatus.Finish,

                    }

                    // this.emailSeachTaskModule.saveSearchResult(taskId,childdata.data)
                    const videoNum = this.videoDownloadModule.saveVideoDownload(videoDownloadEntity)

                    const videoDescriptionEntity: VideoDescriptionEntity = {
                        videoId: videoNum,
                        title: getData.title ? getData.title : '',
                        description: getData.description ? getData.description : '',
                        language: "en-us"
                    }
                    //save video Video Description
                    this.videoDescriptionModule.saveVideoDescription(videoDescriptionEntity)
                } else if (getData && (!getData?.status)) {//failure
                    const videoDownloadEntity: VideoDownloadEntity = {
                        url: getData.link,
                        savepath: '',
                        task_id: Number(taskId),
                        status: VideoDownloadStatus.Error,
                        error_log: getData.log
                    }
                    this.videoDownloadModule.saveVideoDownload(videoDownloadEntity)
                }
                //child.kill()
            } else if (childdata.action == "videodownloadTaskMsg") {
                const res = childdata.data as VideodownloadTaskMsg
                WriteLog(errorLogfile, res.msg)
            }
        });


    }
    public async downloadVideo(param: downloadVideoparam, startCall?: () => void) {
        //get video tool
        const videoTool = await this.getVideoDownloadTool(param.platform)
        if (!videoTool) {
            throw new Error("video tool not found")
        }
        //check video tool requirement
        const res = this.checkVideoRequirement(videoTool)
        if (!res) {
            throw new Error("video tool requirement check failed")
        }
        //save video task
        const videoTaskEntity: VideoDownloadTaskEntity = {
            taskName: param.taskName,
            platform: param.platform,
            savepath: param.savePath,
            status: TaskStatus.Processing
        }
        const taskId = this.saveVdieoDownloadTask(videoTaskEntity)
        if (!taskId) {
            throw new Error("video task save failed")
        }
        //save video url

        const vdetd: VideoDownloadTaskDetailEntity = {
            task_id: taskId,
            download_type: param.isplaylist ? DownloadType.MULTIVIDEO : DownloadType.SINGLEVIDEO,
            cookies_type: param.cookies_type == "browser cookies" ? CookiesType.USEBROWSER : CookiesType.ACCOUNTCOOKIES,
            browser_type: param.browserName ? param.browserName : '',
            proxy_override: param.ProxyOverride,
            video_quality: param.videoQuality ? param.videoQuality : 0

        }
        //save video task detail
        this.videoDownloadTaskDetailModule.create(vdetd)
        //save task accounts
        if (param.accountId.length > 0) {

            for (const accid of param.accountId) {
                const taskAccount: VideoDownloadTaskAccountEntity = {
                    task_id: taskId,
                    account_id: accid
                }
                this.videoDownloadTaskAccountsModule.create(taskAccount)
            }
        }
        //save task url
        for (const link of param.link) {
            this.videoDownloadTaskUrlModule.create({ task_id: taskId, url: link })
        }
        //save proxy id
        if (param.proxy.length > 0) {
            param.proxy.forEach((value) => {
                this.videoDownloadTaskProxyModule.create({ task_id: taskId, proxy_id: value })
            })
        }
        //process download video
        await this.processDownloadVideo(param, videoTool, taskId, startCall)
    }
    //get video download list
    public videoDownloadtasklist(page: number, size: number): ListData<VideoDownloadTaskEntity> {
        // const tokenService=new Token()
        // const dbpath=await tokenService.getValue(USERSDBPATH)
        // if(!dbpath){
        //     throw new Error("user db path not exist")
        // }
        // const videoDownloaddb=new VideoDownloaddb(dbpath)
        const list = this.videoDownloadTaskModule.getVideoDownloadTaskList(page, size)
        const count = this.videoDownloadTaskModule.countVideoDownloadTaskList()
        return { records: list, num: count } as ListData<VideoDownloadTaskEntity>

    }

    //get video download list by task id
    public videoDownloadlist(taskId: number, page: number, size: number): ListData<VideoDownloadListDisplay> {
        // const tokenService=new Token()
        // const dbpath=await tokenService.getValue(USERSDBPATH)
        // if(!dbpath){
        //     throw new Error("user db path not exist")
        // }
        // const videoDownloaddb=new VideoDownloaddb(dbpath)
        const res: Array<VideoDownloadListDisplay> = []
        const list = this.videoDownloadModule.getVideoDownloadList(taskId, page, size)
        list.forEach((element) => {
            let vdld: VideoDownloadListDisplay = {
                id: element.id,
                url: element.url,
                savepath: element.savepath,
                record_time: element.record_time,
                task_id: element.task_id,
                status: element.status,
                title: '',
                description: '',


            }
            if (element.id && element.status == VideoDownloadStatus.Finish) {

                const videoDescription = this.videoDescriptionModule.getVideoDescription(element.id)
                if (videoDescription) {
                    vdld.title = videoDescription.title
                    vdld.description = videoDescription.description
                }
            }
            res.push(vdld)
        })
        const count = this.videoDownloadModule.countVideoDownloadList(taskId)
        return { records: res, num: count } as ListData<VideoDownloadListDisplay>
    }
    public async retryDownloadvideo(taskId: number, startCall: () => void) {
    
        const data = await this.getVideoDownloadTaskInfo(taskId)
        const videoTool = await this.getVideoDownloadTool(data.platform)
        if (!videoTool) {
            throw new Error("video tool not found")
        }
        //process download video
        await this.processDownloadVideo(data, videoTool, taskId, startCall)


    }
    public async getVideoDownloadTaskInfo(taskId: number): Promise<DownloadVideoControlparam> {
        //get task info
        const taskInfo = this.videoDownloadTaskModule.getVideoDownloadTask(taskId)
        if (!taskInfo) {
            throw new Error("task info not found")
        }
        //get task detail
        const taskDetail = this.videoDownloadTaskDetailModule.getByTaskId(taskId)
        if (!taskDetail) {
            throw new Error("task detail not found")
        }

        //get video tool
        const videoTool = await this.getVideoDownloadTool(taskInfo.platform)
        if (!videoTool) {
            throw new Error("video tool not found")
        }
        //check video tool requirement
        const res = this.checkVideoRequirement(videoTool)
        if (!res) {
            throw new Error("video tool requirement check failed")
        }
        let accountIds: Array<number> = []
        if (taskDetail.cookies_type == CookiesType.ACCOUNTCOOKIES) {
            //get account id
            const taskAccounts = this.videoDownloadTaskAccountsModule.getAccountByTaskId(taskId)
            if (taskAccounts.length > 0) {
                accountIds = taskAccounts.map((value) => value.account_id)
                //process download video
                //await this.processDownloadVideo({taskName:taskInfo.taskName,platform:taskInfo.platform,link:[],savePath:taskInfo.savepath,isplaylist:taskDetail.download_type==DownloadType.MULTIVIDEO,accountId:accountIds,cookies_type:taskDetail.cookies_type==CookiesType.ACCOUNTCOOKIES?"account cookies":"browser cookies",browserName:taskDetail.browser_type?taskDetail.browser_type:"",videoQuality:""}, videoTool, taskId)
            }

        }

        //get task url
        const taskUrls = this.videoDownloadTaskUrlModule.getItemsByTaskId(taskId)

        let proxys: Array<number> = []

        //get proxy lists
        const proxylists = this.videoDownloadTaskUrlModule.getItemsByTaskId(taskId)
        if (proxylists.length > 0) {
            proxylists.forEach((value) => {
                if (value.id) {
                    proxys.push(value.id)
                }
            })
        }
        let links: Array<string> = []
        if (taskUrls.length > 0) {
            links = taskUrls.map((value) => value.url)
        }

        const data: DownloadVideoControlparam = {
            accountId: accountIds,
            platform: taskInfo.platform,
            link: links,
            savePath: taskInfo.savepath,
            isplaylist: taskDetail.download_type == DownloadType.MULTIVIDEO,
            proxy: proxys,
            ProxyOverride: taskDetail.proxy_override,
            cookies_type: taskDetail.cookies_type == CookiesType.ACCOUNTCOOKIES ? "account cookies" : "browser cookies",
            browserName: taskDetail.browser_type ? taskDetail.browser_type : "",
            videoQuality: taskDetail.video_quality
        }
        return data

    }
    //try to redownload video by video id
    public async redownloadItembyId(Videoid: number, startCall: () => void) {

        const videoInfo = this.videoDownloadModule.getVideoDownloaditem(Videoid)
        if (!videoInfo) {
            throw new Error("video info not found")
        }

        //get video task info
        const data = await this.getVideoDownloadTaskInfo(videoInfo.task_id)
        let links: Array<string> = []
        if (data.link.length > 0) {
            links.push(videoInfo.url)
        } else {
            throw new Error("video item url not found")
        }
        data.link = links
        const videoTool = await this.getVideoDownloadTool(data.platform)
        if (!videoTool) {
            throw new Error("video tool not found")
        }
        data.isplaylist = false
        this.videoDownloadModule.updateVideoDownloadStatus(VideoDownloadStatus.Start, Videoid)
        //process download video
        await this.processDownloadVideo(data, videoTool, videoInfo.task_id, startCall)

    }
    //show file in explorer
    public async showFileExplorer(id: number) {
        const videoInfo = this.videoDownloadModule.getVideoDownloaditem(id)
        if (!videoInfo) {
            throw new Error("video info not found")
        }
        shell.showItemInFolder(videoInfo.savepath);
    }

    public async deleteVideoDownloadItem(id: number) {
        //get video info
        const videoInfo = this.videoDownloadModule.getVideoDownloaditem(id)
        if (!videoInfo) {
            throw new Error("video info not found")
        }
        //delete video file
        if (videoInfo.savepath) {
            //check file exist
            if (fs.existsSync(videoInfo.savepath)) {
                fs.unlinkSync(videoInfo.savepath)
            }
        }
        //delete video description
        this.videoDescriptionModule.deleteVideoDescription(id)
        //delete video download item
        this.videoDownloadModule.deleteVideoDownloadItem(id)

    }
    public async readTaskErrorlog(taskId: number): Promise<string> {
        const task = await this.videoDownloadTaskModule.getVideoDownloadTask(taskId)
        if (!task) {
            throw new Error("task info not found")
        }
        let content =""
        if(task.error_log){
            //check file exist
            if (fs.existsSync(task.error_log)) {
                content =await readLogFile(task.error_log)
            }else{
                throw new Error("task error file log not found")
            }
        }else{
            throw new Error("task error file log not found")
        }
        console.log(content)
        return content
    }
    //generate caption for videos
    //throw error if video caption tool requirement check failed
    public async generateCaptions(params:Array<VideoCaptionEntity>):Promise<void>{
        //check requirement
        const VFaction=new VideoCaptionFactory()
        const res=VFaction.checkRequirement()
        if(!res){
            throw new Error("video caption tool requirement check failed")
        }
        const childPath = path.join(__dirname, 'taskCode.js')
        if (!fs.existsSync(childPath)) {
            throw new CustomError("child js path not exist for the path " + childPath);
        }
        const { port1, port2 } = new MessageChannelMain()
        
        const child = utilityProcess.fork(childPath, [], { stdio: "pipe" })

        child.on("spawn", () => {

          
            child.postMessage(JSON.stringify({ action: "generateCaption", data: params }), [port1])

        })

        child.stdout?.on('data', (data) => {
            console.log(`Received data chunk ${data}`)
         
            // child.kill()
        })

        child.stderr?.on('data', (data) => {
            const ingoreStr = ["Debugger attached", "Waiting for the debugger to disconnect"]
            if (!ingoreStr.some((value) => data.includes(value))) {

                // seModel.saveTaskerrorlog(taskId,data)
                console.log(`Received error chunk ${data}`)
                //WriteLog(errorLogfile, data)

            }

        })

        child.on("exit", (code) => {
            if (code !== 0) {
                console.error(`Child process exited with code ${code}`);
               // this.videoDownloadTaskModule.updateVideoDownloadTaskStatus(taskId, TaskStatus.Error)
                // this.emailSeachTaskModule.updateTaskStatus(taskId,EmailsearchTaskStatus.Error)
            } else {
                console.log('Child process exited successfully');
                //this.videoDownloadTaskModule.updateVideoDownloadTaskStatus(taskId, TaskStatus.Complete)
                // this.emailSeachTaskModule.updateTaskStatus(taskId,EmailsearchTaskStatus.Complete)
            }
        })

        child.on('message', (message) => {
            console.log("get message from child")
            console.log('Message from child:', JSON.parse(message));
            const childdata = JSON.parse(message) as ProcessMessage<any>
            if (childdata.action == "generateCaption") {

            }
            
        });


    }
}