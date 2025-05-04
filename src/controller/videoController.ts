import { videoFactory } from "@/modules/video/videoFactory";
import { VideoDownloadTaskEntityType, processVideoDownloadParam, CookiesProxy, VideoCompotionEntity, VideoCaptionGenerateParam, VideoCaptionDisplay, VideoTranslateItem } from "@/entityTypes/videoType";
// import { VideoDownloadTaskdb } from "@/model/videoDownloadTaskdb";
// import { VideoDownloaddb} from "@/model/videoDownloaddb"
import { VideoDownloadModule } from "@/modules/VideoDownloadModule"
import { VideoDownloadTaskModule } from "@/modules/VideoDownloadTaskModule"
import { Token } from "@/modules/token"
import * as path from 'path';
import * as fs from 'fs';
import { utilityProcess, MessageChannelMain } from "electron";
import { USERLOGPATH, USEREMAIL } from '@/config/usersetting';
import { WriteLog, getApplogspath, getRandomValues, removeParamsAfterAmpersand, readLogFile } from "@/modules/lib/function"
import { v4 as uuidv4 } from 'uuid';
// import { CustomError } from '@/modules/customError'
import { AccountCookiesModule } from "@/modules/accountCookiesModule"
import { SocialAccountApi } from "@/api/socialAccountApi"
import { ProcessMessage } from "@/entityTypes/processMessage-type"
// import {VideodownloadMsg} from "@/entityTypes/videoType";
import { ListData, TaskStatus } from "@/entityTypes/commonType"
import { VideoDescriptionEntity } from "@/entity/VideoDescription.entity"
import { VideoDownloadStatus, VideodownloadTaskMsg, VideoDownloadListDisplay, VideodownloadMsg, DownloadVideoControlparam, VideoDownloadTaskDetailEntity, DownloadType, CookiesType, VideoCaptionItem, VideoCaptionMsg, VideoCaptionEntity, VideoCaptionStatus, VideoCaptionGenerateParamWithIds, VideoInformationTransParam } from "@/entityTypes/videoType"
import { VideoDescriptionModule } from "@/modules/videoDescriptionModule"
import { Video } from '@/modules/interface/Video';
import { VideoDownloadTaskDetailModule } from '@/modules/VideoDownloadTaskDetailModule';
import { VideoDownloadTaskAccountsModule } from "@/modules/VideoDownloadTaskAccountsModule"
//import { VideoDownloadTaskAccountEntity } from "@/entityTypes/videoType"
import { VideoDownloadTaskUrlModule } from "@/modules/VideoDownloadTaskUrlModule"
import { VideoDownloadTaskProxyModule } from "@/modules/VideoDownloadTaskProxyModule"
import { Proxy } from "@/entityTypes/proxyType"
import { ProxyApi } from "@/api/proxyApi"
import { shell } from "electron"
//import { VideoCaptionFactory } from "@/modules/videoCaption/VideoCaptionFactory"
import { CustomError } from '@/modules/customError'
import { VideoCaptionModule } from "@/modules/VideoCaptionModule"
// import { LanguageEnum } from "@/config/generate"
// import {LanguageItem} from "@/entityTypes/commonType"
import { ExtraModuleController } from "@/controller/extramoduleController"
import { getLanaugebyid } from "@/modules/lib/function"
import { VideoDownloadTagModule } from "@/modules/VideoDownloadTagModule"
// import { Worker } from "worker_threads";
import { TransItemsParam } from "@/entityTypes/translateType"
import { TranslateProducer } from "@/modules/TranslateProducer"
import { LlmCongfig, TraditionalTranslateCongfig, CommonMessage } from '@/entityTypes/commonType'
import { TranslateController } from "@/controller/TranslateController"
import { getLanaugebyCode } from "@/modules/lib/function"
//import { VideoDownloadTaskKeywordEntity } from "@/entity/VideoDownloadTaskKeyword.entity"
import { VideoDownloadTaskKeywordModule } from "@/modules/VideoDownloadTaskKeywordModule"
import { VideoDownloadEntity } from "@/entity/VideoDownload.entity";
import { VideoDownloadTaskAccountsEntity } from "@/entity/VideoDownloadTaskAccounts.entity";
import { VideoDownloadTaskEntity } from "@/entity/VideoDownloadTask.entity"
import {VideoPublishService} from "@/service/VideoPublishService"
// import { VideoDownloadTagEntity } from "@/entity/VideoDownloadTag.entity"
// import { param } from "jquery";
//import {} from "@/entityTypes/proxyType"
//import { VideoDownloadModel } from "@/model/VideoDownload.model";
import {VideoDownloadEntityType} from "@/entityTypes/videoType"
import { VideoDownloadTaskUrlsEntity } from "@/entity/VideoDownloadTaskUrls.entity";
import { PublishOptions } from "@/strategy/VideoPublishStrategy";
import { PublishPlatform } from "@/entityTypes/videoPublishType";
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
    private videoCaptionModule: VideoCaptionModule
    private videoDownloadTagModule: VideoDownloadTagModule
    private videoDownloadTaskKeywordModule: VideoDownloadTaskKeywordModule
    // private videoDownloadTagModel:VideoDownloadTagModel
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
        this.videoCaptionModule = new VideoCaptionModule()
        this.videoDownloadTagModule = new VideoDownloadTagModule()
        this.videoDownloadTaskKeywordModule = new VideoDownloadTaskKeywordModule()
        this.videoDownloadTaskAccountsModule = new VideoDownloadTaskAccountsModule()  
        this.videoDownloadTaskProxyModule = new VideoDownloadTaskProxyModule()
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
    public async saveVdieoDownloadTask(vdte: VideoDownloadTaskEntityType): Promise<number> {
        const vdteEntity = new VideoDownloadTaskEntity()
        vdteEntity.task_name = vdte.taskName
        vdteEntity.platform = vdte.platform
        vdteEntity.savepath = vdte.savepath
        vdteEntity.status = vdte.status || 0
        vdteEntity.downloadtype = vdte.downloadtype
        return await this.videoDownloadTaskModule.saveVideoDownloadTask(vdteEntity)
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

        await this.videoDownloadTaskModule.updateTasklog(taskId, runLogfile)
        await this.videoDownloadTaskModule.updateTaskErrorlog(taskId, errorLogfile)
        const cookiesProxies: CookiesProxy[] = []

        // const cookies:Array<string>=[]
        //loop account id to get cookies
        for (const accountid of param.accountId) {
            const accountEntity = await this.accountCookiesModule.getAccountCookies(accountid)
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
        const alreadsucess = await this.videoDownloadModule.getAllvideoDownloadlist(taskId, VideoDownloadStatus.Finish)
        const alreadlinks = alreadsucess.map((value) => removeParamsAfterAmpersand(value.url ?? ""))
        //console.log(alreadlinks)
        const paramData: processVideoDownloadParam = {
            exePath: execFilepath,
            platform: param.platform,
            link: param.link,
            keywords: param.keywords,
            downloadType: param.downloadType,
            isplaylist: param.isplaylist,
            cookiesProxy: cookiesProxies,
            savePath: param.savePath,
            proxy: proxyArr,
            BrowserName: param.browserName,
            videoQuality: param.videoQuality,
            successlink: alreadlinks,
            max_page_number: param.maxpagenumber
        }
        //console.log(childPath)
        const child = utilityProcess.fork(childPath, [], {
            stdio: "pipe", execArgv: ["puppeteer-cluster:*"], env: {
                ...process.env,
                NODE_OPTIONS: ""
            }
        })

        child.on("spawn", async () => {

            console.log("child process satart, pid is " + child.pid)
            await this.videoDownloadTaskModule.updateVideoDownloadTaskStatus(taskId, TaskStatus.Processing)
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
                //console.log('filename'+errorLogfile)
                WriteLog(errorLogfile, data)

            }

        })

        child.on("exit", async(code) => {
            if (code !== 0) {
                console.error(`Child process exited with code ${code}`);
                await this.videoDownloadTaskModule.updateVideoDownloadTaskStatus(taskId, TaskStatus.Error)
                // this.emailSeachTaskModule.updateTaskStatus(taskId,EmailsearchTaskStatus.Error)
            } else {
                console.log('Child process exited successfully');
                await this.videoDownloadTaskModule.updateVideoDownloadTaskStatus(taskId, TaskStatus.Complete)
                // this.emailSeachTaskModule.updateTaskStatus(taskId,EmailsearchTaskStatus.Complete)
            }
        })
        child.on('message', async (message) => {
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
                    // const videoDownloadEntity: VideoDownloadEntity = {
                    //     url: getData.link,
                    //     savepath: savepath,
                    //     task_id: Number(taskId),
                    //     status: VideoDownloadStatus.Finish,
                    //     language: param.language_code
                    // }
                    const videoDownloadEntity=new VideoDownloadEntity()
                    videoDownloadEntity.url=getData.link
                    videoDownloadEntity.savepath=savepath
                    videoDownloadEntity.task_id=Number(taskId)
                    videoDownloadEntity.status=VideoDownloadStatus.Finish
                    videoDownloadEntity.language=param.language_code
                    //     url: getData.link,
                    //     savepath: savepath,
                    //     task_id: Number(taskId),
                    //     status: VideoDownloadStatus.Finish,
                    //     language: param.language_code
                    // }
                    // this.emailSeachTaskModule.saveSearchResult(taskId,childdata.data)
                    const videoNum = await this.videoDownloadModule.saveVideoDownload(videoDownloadEntity)
                    const videoDescriptionEntity = new VideoDescriptionEntity()
                    videoDescriptionEntity.video_id = videoNum
                    videoDescriptionEntity.title = getData.title ? getData.title : ''
                    videoDescriptionEntity.description = getData.description ? getData.description : ''
                    videoDescriptionEntity.language = param.language_code

                    // const videoDescriptionEntity: VideoDescriptionEntity = {
                    //     video_id: videoNum,
                    //     title: getData.title ? getData.title : '',
                    //     description: getData.description ? getData.description : '',
                    //     language: param.language_code

                    // }
                    //save video Video Description
                    await this.videoDescriptionModule.saveVideoDescription(videoDescriptionEntity)
                } else if (getData && (!getData?.status)) {//failure
                    if (getData.link.length > 0) {
                        // const videoDownloadEntity: VideoDownloadEntity = {
                        //     url: getData.link,
                        //     savepath: '',
                        //     task_id: Number(taskId),
                        //     status: VideoDownloadStatus.Error,
                        //     language: param.language_code
                        // }
                        const videoDownloadEntity=new VideoDownloadEntity()
                        videoDownloadEntity.url=getData.link
                        videoDownloadEntity.savepath=''
                        videoDownloadEntity.task_id=Number(taskId)
                        videoDownloadEntity.status=VideoDownloadStatus.Error
                        videoDownloadEntity.language=param.language_code
                        // const videoId = this.videoDownloadModule.saveVideoDownload(videoDownloadEntity)
                        const videoId=await this.videoDownloadModule.saveVideoDownload(videoDownloadEntity)
                        if (getData.log) {
                            this.videoDownloadModule.saveVideoDownloadLog(getData.log, videoId)
                        }
                    } else {
                        //the log belong to task
                        //this.videoDownloadTaskModule.saveTaskerrorlog(taskId,getData.log)
                        //this.videoDownloadTaskModule.updateVideoDownloadTaskStatus(taskId, TaskStatus.Error)
                        if (getData.log) {
                            WriteLog(errorLogfile, getData.log)
                        }
                    }
                }
                //child.kill()
            } else if (childdata.action == "videodownloadTaskMsg") {
                const res = childdata.data as VideodownloadTaskMsg
                WriteLog(errorLogfile, res.msg)
            }
        });


    }
    public async downloadVideo(param: DownloadVideoControlparam, startCall?: () => void) {

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
        const videoTaskEntity = new VideoDownloadTaskEntity()
        videoTaskEntity.task_name = param.taskName
        videoTaskEntity.platform = param.platform
        videoTaskEntity.savepath = param.savePath
        videoTaskEntity.status = TaskStatus.Processing
        videoTaskEntity.downloadtype = param.downloadType
        const taskId = await this.videoDownloadTaskModule.saveVideoDownloadTask(videoTaskEntity)
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
            video_quality: param.videoQuality ? param.videoQuality : 0,
            language_code: param.language_code,
            max_page_number: param.maxpagenumber ? param.maxpagenumber : 0,
        }
        //save video task detail
        this.videoDownloadTaskDetailModule.create(vdetd)
        //save task accounts
        if (param.accountId.length > 0) {

            for (const accid of param.accountId) {
                // const taskAccount: VideoDownloadTaskAccountEntity = {
                //     task_id: taskId,
                //     account_id: accid
                // }
                const taskAccount=new VideoDownloadTaskAccountsEntity()
                taskAccount.task_id=taskId
                taskAccount.account_id=accid
                this.videoDownloadTaskAccountsModule.create(taskAccount)
            }
        }
        if (param.link.length > 0) {
            //save task url
            for (const link of param.link) {
                const videodownloadtaskurl=new VideoDownloadTaskUrlsEntity()
                videodownloadtaskurl.task_id=taskId
                videodownloadtaskurl.url=link
                await this.videoDownloadTaskUrlModule.create(videodownloadtaskurl)
                // this.videoDownloadTaskUrlModule.create({ task_id: taskId, url: link })
            }
        }
        if (param.keywords.length > 0) {
            this.videoDownloadTaskKeywordModule.saveKeywords(taskId, param.keywords)
        }
        //save proxy id
        if (param.proxy.length > 0) {
            param.proxy.forEach((value) => {
                this.videoDownloadTaskProxyModule.create({ task_id: taskId, proxy_id: value })
            })
        }
        // param.language_code=param.videoLanguage.code
        //process download video
        await this.processDownloadVideo(param, videoTool, taskId, startCall)
    }
    //get video download list
    public async videoDownloadtasklist(page: number, size: number): Promise<ListData<VideoDownloadTaskEntityType>> {
        const list = await this.videoDownloadTaskModule.getVideoDownloadTaskList(page, size)
        const count = await this.videoDownloadTaskModule.countVideoDownloadTaskList()
        const records = list.map(item => ({
            id: item.id,
            record_time: item.record_time || '',
            taskName: item.task_name || '',
            platform: item.platform || '',
            savepath: item.savepath || '',
            status: item.status || 0,
            downloadtype: item.downloadtype || ''
        }))
        return { records, num: count }
    }
    //publish video
    public async publishVideo(videoId: number, platform: PublishPlatform) {
        const videoPublishService = new VideoPublishService();
        //get video entity by video id
        const videoEntity = await this.videoDownloadModule.getVideoDownloaditem(videoId)
        if(!videoEntity){
            throw new Error("video entity not found")
        }
        //get video description
        const videoDescription = await this.videoDescriptionModule.getVideoDescription(videoId, videoEntity.language)
        if(!videoDescription){
            throw new Error("video description not found")
        }
        //get video tags
        const videoTags = await this.videoDownloadTagModule.getVideoTag(videoId,videoEntity.language)
        if(!videoTags){
            throw new Error("video tags not found")
        }
        const tags = videoTags.map((value) => value.tag)
        //get video category
        // const videoCategory = await this.videoDownloadCategoryModule.getVideoCategory(videoId,videoEntity.language)
        // if(!videoCategory){
        //     throw new Error("video category not found")
        // }
       // const category = videoCategory.category
        const options: PublishOptions = {
            title: videoDescription.title,
            description: videoDescription.description,
            tags: tags,
           // category: videoEntity.category,
           // privacy: videoEntity.privacy,
        }
        const result = await videoPublishService.publishVideo(videoEntity, platform, options);
        return result;
    }
    //get video download list by task id
    public async videoDownloadlist(taskId: number, page: number, size: number): Promise<ListData<VideoDownloadListDisplay>> {

        const res: Array<VideoDownloadListDisplay> = []
        const list = await this.videoDownloadModule.getVideoDownloadList(taskId, page, size)
        //list.forEach(async (element) => {
        for (const element of list) {
            let vdld: VideoDownloadListDisplay = {
                id: element.id,
                url: element.url ?? "",
                savepath: element.savepath ?? "",
                record_time: element.record_time ?? "",
                task_id: element.task_id,
                status: element.status,
                title: '',
                description: '',
                error_log: element.error_log ?? "",
                caption_status: element.caption_status,
                language: element.language
            }
            if (element.id && element.status == VideoDownloadStatus.Finish) {

                const videoDescription = await this.videoDescriptionModule.getVideoDescription(element.id, element.language)
                if (videoDescription) {
                    vdld.title = videoDescription.title
                    vdld.description = videoDescription.description
                }
            }
            res.push(vdld)
        }
        const count = await this.videoDownloadModule.countVideoDownloadList(taskId)
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
        const taskInfo = await this.videoDownloadTaskModule.getVideoDownloadTask(taskId)
        if (!taskInfo) {
            throw new Error("task info not found")
        }
        //get task detail
        const taskDetail = this.videoDownloadTaskDetailModule.getByTaskId(taskId)
        if (!taskDetail) {
            throw new Error("task detail not found")
        }

        //get video tool
        if(!taskInfo.platform){
            throw new Error("task platform not found")
        }
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
            const taskAccounts = await this.videoDownloadTaskAccountsModule.getAccountByTaskId(taskId)
            if (taskAccounts.length > 0) {
                accountIds = taskAccounts.map((value) => value.account_id)
                //process download video
                //await this.processDownloadVideo({taskName:taskInfo.taskName,platform:taskInfo.platform,link:[],savePath:taskInfo.savepath,isplaylist:taskDetail.download_type==DownloadType.MULTIVIDEO,accountId:accountIds,cookies_type:taskDetail.cookies_type==CookiesType.ACCOUNTCOOKIES?"account cookies":"browser cookies",browserName:taskDetail.browser_type?taskDetail.browser_type:"",videoQuality:""}, videoTool, taskId)
            }

        }

        //get task url
        const taskUrls = await this.videoDownloadTaskUrlModule.getItemsByTaskId(taskId)

        let proxys: Array<number> = []

        //get proxy lists
        const proxylists = await this.videoDownloadTaskUrlModule.getItemsByTaskId(taskId)
        if (proxylists.length > 0) {
            proxylists.forEach((value) => {
                if (value.id) {
                    proxys.push(value.id)
                }
            })
        }
        let links: Array<string> = []
        if (taskUrls.length > 0) {
            links = taskUrls.map((value) => value.url ?? "")
        }
        //get task keywords
        let keywords: Array<string> = []
        const taskKeywords = await this.videoDownloadTaskKeywordModule.getTaskKeywords(taskId)
        //loop taskKeywords, push to keywords
        if (taskKeywords && taskKeywords.length > 0) {
            taskKeywords.forEach((value) => {
                if (value.keyword) {
                    keywords.push(value.keyword)
                }
            })
        }
        //reconstruct download type
        const data: DownloadVideoControlparam = {
            taskName: taskInfo.task_name || '',
            accountId: accountIds,
            downloadType: taskInfo.downloadtype as "playlist" | "singleplay" | "keyword",
            platform: taskInfo.platform || '',
            link: links,
            savePath: taskInfo.savepath || '',
            keywords: keywords,
            isplaylist: taskDetail.download_type == DownloadType.MULTIVIDEO,
            proxy: proxys,
            ProxyOverride: taskDetail.proxy_override,
            cookies_type: taskDetail.cookies_type == CookiesType.ACCOUNTCOOKIES ? "account cookies" : "browser cookies",
            browserName: taskDetail.browser_type ? taskDetail.browser_type : "",
            videoQuality: taskDetail.video_quality,
            language_code: taskDetail.language_code,
            maxpagenumber: taskDetail.max_page_number
        }
        return data

    }
    //try to redownload video by video id
    public async redownloadItembyId(Videoid: number, startCall: () => void) {

        const videoInfo = await this.videoDownloadModule.getVideoDownloaditem(Videoid)
        if (!videoInfo) {
            throw new Error("video info not found")
        }

        //get video task info
        const data = await this.getVideoDownloadTaskInfo(videoInfo.task_id)
        let links: Array<string> = []
        if (data.link.length > 0) {
            if(videoInfo.url){
            links.push(videoInfo.url)
            }
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
        const videoInfo = await this.videoDownloadModule.getVideoDownloaditem(id)
        if (!videoInfo) {
            throw new Error("video info not found")
        }
        if(videoInfo.savepath){
            shell.showItemInFolder(videoInfo.savepath);
        }else{
            throw new Error("video save path not found")
        }
    }

    public async deleteVideoDownloadItem(id: number) {
        //get video info
        const videoInfo = await this.videoDownloadModule.getVideoDownloaditem(id)
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
        await this.videoDescriptionModule.deleteVideoDescription(id)
        //delete video download item
        await this.videoDownloadModule.deleteVideoDownloadItem(id)

    }
    public async readTaskErrorlog(taskId: number): Promise<string> {
        const task = await this.videoDownloadTaskModule.getVideoDownloadTask(taskId)
        if (!task) {
            throw new Error("task info not found")
        }
        let content = ""
        if (task.error_log) {
            //check file exist
            if (fs.existsSync(task.error_log)) {
                content = await readLogFile(task.error_log)
            } else {
                throw new Error("task error file log not found")
            }
        } else {
            throw new Error("task error file log not found")
        }
        console.log(content)
        return content
    }
    //pass video id, and generate video caption
    public async generateCaptionbyids(data: VideoCaptionGenerateParamWithIds<number>, errorCall?: (message: string) => void) {
        const res = await this.convertToVideoCaptionitem(data)
        if (res.length < 1) {
            throw new Error("video.item_less than one")
        }
        await this.generateCaptionsPath(res, errorCall)
    }
    public async convertToVideoCaptionitem(data: VideoCaptionGenerateParamWithIds<number>): Promise<Array<VideoCaptionItem>> {
        const res: Array<VideoCaptionItem> = []
        if (data.ids.length > 0) {
            data.ids.forEach(async (value) => {
                const videoItem = await this.videoDownloadModule.getVideoDownloaditem(value)
                if (videoItem) {
                    if (videoItem.savepath) {
                        const item: VideoCaptionItem = {
                            videoId: value,
                            videoPath: videoItem.savepath,
                            isEnglish: data.isEnglish,
                            savePath: data.savePath
                        }
                        res.push(item)
                    }
                }

            })
        }
        return res
    }
    //generate caption for videos
    //throw error if video caption tool requirement check failed
    public async generateCaptionsPath(params: Array<VideoCaptionItem>, errorCall?: (message: string) => void): Promise<void> {
        //check requirement
        //const VFaction = new VideoCaptionFactory()
        const emctrol = new ExtraModuleController()
        const res = await emctrol.checkRequirement()
        if (!res) {
            throw new Error("video caption tool requirement check failed")
        }
        const childPath = path.join(__dirname, 'taskCode.js')
        if (!fs.existsSync(childPath)) {
            throw new CustomError("child js path not exist for the path " + childPath);
        }
        const { port1, port2 } = new MessageChannelMain()
        console.log(params)
        const child = utilityProcess.fork(childPath, [], {
            stdio: "pipe",
            execArgv: ["puppeteer-cluster:*"],
            env: {
                ...process.env,
                NODE_OPTIONS: ""
            }
        })

        child.on("spawn", () => {

            const datas: VideoCaptionGenerateParam = {
                videos: params
            }
            //update video caption status to start
            params.forEach((value) => {
                if (value.videoId) {
                    this.videoDownloadModule.updateVideoCaptionStatus(value.videoId, VideoCaptionStatus.Start)
                }
            })
            child.postMessage(JSON.stringify({ action: "generateCaption", data: datas } as ProcessMessage<VideoCaptionGenerateParam>), [port1])

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
                console.log('Child pr`ocess exited succe`ssfully');
                //this.videoDownloadTaskModule.updateVideoDownloadTaskStatus(taskId, TaskStatus.Complete)
                // this.emailSeachTaskModule.updateTaskStatus(taskId,EmailsearchTaskStatus.Complete)
            }
        })

        child.on('message', (message) => {
            console.log("get message from child")
            console.log('Message from child:', JSON.parse(message));
            const childdata = JSON.parse(message) as ProcessMessage<any>
            if (childdata.action == "generateCaptionMsg") {
                const getData = childdata.data as VideoCaptionMsg
                if (getData.status) {

                    console.log("generate caption success")
                    if (getData.videoId && getData.savepath) {
                        const vce: VideoCaptionEntity = {
                            videoId: getData.videoId,
                            language_id: 0,
                            caption_path: getData.savepath
                        }
                        this.videoCaptionModule.create(vce)
                        this.videoDownloadModule.updateVideoCaptionStatus(getData.videoId, VideoCaptionStatus.Finish)
                    }

                } else {
                    //generate caption error
                    if (getData.videoId) {
                        this.videoDownloadModule.updateVideoCaptionStatus(getData.videoId, VideoCaptionStatus.Error)
                        this.videoDownloadModule.saveVideoDownloadLog(getData.msg, getData.videoId)
                    }
                    //send system message
                    if (errorCall) {
                        errorCall(getData.msg)
                    }
                }
            }

        });


    }
    //get video info by id
    public async getVideoinfo(id: number): Promise<VideoCompotionEntity> {
        const videoDownEntity = await this.videoDownloadModule.getVideoDownloaditem(id)
        if (!videoDownEntity) {
            throw new Error("video download item not found")
        }
        //get video description
        const videoDescription = await this.videoDescriptionModule.getVideoDescription(id, videoDownEntity.language)
        //get video caption
        const videoCaption = await this.videoCaptionModule.getCaptionByVid(id)
        const captionDisplay: Array<VideoCaptionDisplay> = []
        if (videoCaption.length > 0) {
            videoCaption.forEach((value) => {
                const captionDisplayItem: VideoCaptionDisplay = {
                    id: value.id,
                    videoId: value.videoId,
                    language_id: value.language_id,
                    language: getLanaugebyid(value.language_id),
                    caption_path: value.caption_path,
                    record_time: value.record_time,
                }
                captionDisplay.push(captionDisplayItem)

            })
        }
        const transinfolist = await this.videoDescriptionModule.getVideoDescriptionOtherLanguage(id, videoDownEntity.language)
        const videoDownEntityType:VideoDownloadEntityType={
            id:videoDownEntity.id,
            url:videoDownEntity.url ?? "",
            savepath:videoDownEntity.savepath ?? "",
            record_time:videoDownEntity.record_time ?? "",
            task_id:videoDownEntity.task_id,
            language:videoDownEntity.language,
            status:videoDownEntity.status,
        }
        const res: VideoCompotionEntity = {
            detail: videoDownEntityType,
            description: videoDescription,
            caption: captionDisplay,
            translateInfolist: transinfolist
        }
        console.log(res)
        return res
    }
    //get video translate info
    // public async getVideoTranslateinfo(id: number) {
    //     // const videoDownEntity = this.videoDownloadModule.getVideoDescriptionOtherLanguage(id)
    //     // if (!videoDownEntity) {
    //     //     throw new Error("video download item not found")
    //     // }

    // } 
    public async getVideoErrorlog(id: number): Promise<string> {
        const content = await this.videoDownloadModule.getVideoErrorLog(id)
        return content
    }
    //show file in explorer
    public async showCaptionFileExplorer(id: number) {
        const videoCaptionInfo = await this.videoCaptionModule.read(id)
        if (!videoCaptionInfo) {
            throw new Error("video info not found")
        }
        shell.showItemInFolder(videoCaptionInfo.caption_path);
    }

    //translate video information 
    public async convertToVideoTranslateitem(data: VideoInformationTransParam<number>): Promise<Array<VideoTranslateItem>> {
        const res: Array<VideoTranslateItem> = []
        if (data.ids.length > 0) {
            // data.ids.forEach(async (value) => {
            for (const value of data.ids) {
                const videoItem = await this.videoDownloadModule.getVideoDownloaditem(value)
                if (videoItem) {
                    const vds = await this.videoDescriptionModule.getVideoDescription(value, videoItem.language)
                    console.log("vds is following")
                    console.log(vds)
                    //get item tags by video id and language
                    const tags = await this.videoDownloadTagModule.getVideoTag(value, videoItem.language)
                    console.log(videoItem.language)
                    console.log(videoItem)
                    const languageItem = getLanaugebyCode(videoItem.language)
                    if (!languageItem) {
                        throw new Error("language not found,language code may error")
                    }
                    if (videoItem.language == data.target_language.code) {
                        throw new Error("source language and target language can not be same")
                    }

                    const vti: VideoTranslateItem = {
                        videoId: value,
                        title: vds?.title ? vds.title : '',
                        description: vds?.description ? vds.description : '',
                        tags: tags,
                        source_language: languageItem
                        //   target_language:data.target_language
                    }
                    res.push(vti)
                }


            }
        }
        return res

    }
    public async tranVideoinfo(data: VideoInformationTransParam<number>) {
        const videoItem: Array<VideoTranslateItem> = await this.convertToVideoTranslateitem(data)
        if (videoItem.length < 1) {
            throw new Error("video.translate_item_less_than_one")
        }

        let toolType: string | void = undefined
        const translatePro = new TranslateProducer()
        toolType = translatePro.checkTooltype(data.translate_tool)

        const translateCon = new TranslateController()
        let llmcon: LlmCongfig | undefined
        let traditionalTranslateCongfig: TraditionalTranslateCongfig | undefined
        if (toolType == "llm") {
            const cres = await translateCon.getSystemConfigLLM(data.translate_tool)
            if (cres) {
                llmcon = cres
            }
            // console.log("llmcon",llmcon)
        } else if (toolType == "api") {
            const traditiona = await translateCon.getTranslateConfig(data.translate_tool)
            if (traditiona) {
                traditionalTranslateCongfig = traditiona
            }
        } else {
            throw new Error("translate tool type not found")
        }

        const params: TransItemsParam<VideoTranslateItem> = {
            items: videoItem,
            target_language: data.target_language,
            translate_tool: data.translate_tool,
            llmConfig: llmcon,
            traditionalTranslateConfig: traditionalTranslateCongfig
        }
        console.log(params)
        const childPath = path.join(__dirname, 'taskCode.js')
        if (!fs.existsSync(childPath)) {
            throw new CustomError("child js path not exist for the path " + childPath);
        }
        const { port1, port2 } = new MessageChannelMain()
        console.log(params)
        const child = utilityProcess.fork(childPath, [], {
            stdio: "pipe", execArgv: ["puppeteer-cluster:*"], env: {
                ...process.env,
                NODE_OPTIONS: ""
            }
        })

        child.on("spawn", () => {


            child.postMessage(JSON.stringify({ action: "translateVideoInfo", data: params } as ProcessMessage<TransItemsParam<VideoTranslateItem>>), [port1])

        })

        child.stdout?.on('data', (data) => {
            console.log(`Received data chunk ${data}`)

        })

        child.stderr?.on('data', (data) => {
            const ingoreStr = ["Debugger attached", "Waiting for the debugger to disconnect"]
            if (!ingoreStr.some((value) => data.includes(value))) {

                // seModel.saveTaskerrorlog(taskId,data)
                console.log(`Received error chunk ${data}`)
                //WriteLog(errorLogfile, data)

            }

        })
        child.on('message', async (message) => {
            const childdata = JSON.parse(message) as ProcessMessage<any>
            if (childdata.action == "translateVideoInfoMsg") {
                const getData = childdata.data as CommonMessage<VideoTranslateItem>
                if (getData.status) {
                    //save video description
                    if (getData.data) {

                        const vds = new VideoDescriptionEntity()
                        vds.video_id = getData.data.videoId
                        vds.title = getData.data.title
                        vds.description = getData.data.description
                        vds.language = data.target_language.code
                        await this.videoDescriptionModule.saveVideoDescription(vds)
                        //save video tags
                        if (getData.data.tags && getData.data.tags.length > 0) {
                            getData.data.tags.forEach(async (value) => {
                                //save video taga
                                this.videoDownloadTagModule.create(value)
                            })
                        }
                    }
                }
            }
        })

        child.on("exit", (code) => {
            if (code !== 0) {
                console.error(`Child process exited with code ${code}`);

            } else {
                console.log('Child process exited succe`ssfully');

            }
        })



    }



}