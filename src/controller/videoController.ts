import { videoFactory } from "@/modules/video/videoFactory";
import { downloadVideoparam, videoDownloadTaskEntity, processVideoDownloadParam, CookiesProxy } from "@/entityTypes/videoType";
// import { VideoDownloadTaskdb } from "@/model/videoDownloadTaskdb";
// import { VideoDownloaddb} from "@/model/videoDownloaddb"
import {VideoDownloadModule} from "@/modules/VideoDownloadModule"
import {VideoDownloadTaskModule} from "@/modules/VideoDownloadTaskModule"
import { Token } from "@/modules/token"
import * as path from 'path';
import * as fs from 'fs';
import { utilityProcess, MessageChannelMain } from "electron";
import { USERLOGPATH, USEREMAIL } from '@/config/usersetting';
import { WriteLog, getApplogspath, getRandomValues } from "@/modules/lib/function"
import { v4 as uuidv4 } from 'uuid';
import { CustomError } from '@/modules/customError'
import { AccountCookiesModule } from "@/modules/accountCookiesModule"
import { SocialAccountApi } from "@/api/socialAccountApi"
import {ProcessMessage} from "@/entityTypes/processMessage-type"
import {VideodownloadMsg} from "@/entityTypes/videoType";
import {ListData} from "@/entityTypes/commonType"

//import {} from "@/entityTypes/proxyType"
export class videoController {
    private videoDownloadModule: VideoDownloadModule
    private videoDownloadTaskModule: VideoDownloadTaskModule
    private accountCookiesModule: AccountCookiesModule
    private socialAccountApi: SocialAccountApi
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
    }
    public async downloadVideo(param: downloadVideoparam, startCall?: (taskId: number) => void) {
        const videoFactoryInstance = new videoFactory()
        //get random one from array of param.accountId
        // const randomItem = param.accountId[Math.floor(Math.random() * param.accountId.length)]
        const videoTool = await videoFactoryInstance.getVideotool(param.platform)
        console.log("video tool:" + videoTool)
        if (!videoTool) {

            throw new CustomError("video tool not found", 20241205111934)
        }
        videoTool.checkRequirement()
        const execFilepath = videoTool.getPackagepath()

        //save log to download task table
        // const videoTaskdb=new VideoDownloadTaskdb(dbpath)
        const videoEntity: videoDownloadTaskEntity = {
            platform: param.platform,
            // url: JSON.stringify(param.link),
            savepath: param.savePath
        }
        const taskId = this.videoDownloadTaskModule.saveVideoDownloadTask(videoEntity)
        if (!taskId) {
            throw new CustomError("video.create_download_task_failuer", 20241206153256)
        }
        // console.log("task id:"+taskId)
        // const res=videoTool.checkRequirement()
        if (startCall) {
            startCall(Number(taskId))
        }

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

        const child = utilityProcess.fork(childPath, [], { stdio: "pipe" })
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
        
        this.videoDownloadTaskModule.updateTasklog(taskId,runLogfile)
        this.videoDownloadTaskModule.updateTaskErrorlog(taskId,errorLogfile)
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
                if(!param.ProxyOverride){//not use account proxy
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
        const paramData: processVideoDownloadParam = {
            exePath: execFilepath,
            platform: param.platform,
            link: param.link,
            isplaylist: param.isplaylist,
            cookiesProxy: cookiesProxies,
            savePath: param.savePath,
            proxy: param.proxy
        }

        child.on("spawn", () => {
            console.log("child process satart, pid is" + child.pid)
            child.postMessage(JSON.stringify({ action: "downloadVideo", data: paramData }), [port1])

        })

        child.stdout?.on('data', (data) => {
            console.log(`Received data chunk ${data}`)
            WriteLog(runLogfile, data)
            // child.kill()
        })

        child.stderr?.on('data', (data) => {
            const ingoreStr = ["Debugger attached"]
            if (!ingoreStr.some((value) => data.includes(value))) {

                // seModel.saveTaskerrorlog(taskId,data)
                console.log(`Received error chunk ${data}`)
                WriteLog(errorLogfile, data)
            }

        })

        child.on("exit", (code) => {
            if (code !== 0) {
                console.error(`Child process exited with code ${code}`);
                // this.emailSeachTaskModule.updateTaskStatus(taskId,EmailsearchTaskStatus.Error)
            } else {
                console.log('Child process exited successfully');
                // this.emailSeachTaskModule.updateTaskStatus(taskId,EmailsearchTaskStatus.Complete)
            }
        })
        child.on('message', (message) => {
            console.log("get message from child")
            console.log('Message from child:', JSON.parse(message));
            const childdata=JSON.parse(message) as ProcessMessage<VideodownloadMsg>
            if(childdata.action=="saveres"){
                if(childdata.data){
                //save result
                // this.emailSeachTaskModule.saveSearchResult(taskId,childdata.data)
                
                }
                //child.kill()
            }
        });


    }
    //get video download list
    public videoDownloadtasklist(page: number, size: number):ListData<videoDownloadTaskEntity> {
        // const tokenService=new Token()
        // const dbpath=await tokenService.getValue(USERSDBPATH)
        // if(!dbpath){
        //     throw new Error("user db path not exist")
        // }
        // const videoDownloaddb=new VideoDownloaddb(dbpath)
        const list = this.videoDownloadTaskModule.getVideoDownloadTaskList(page, size)
        const count = this.videoDownloadTaskModule.countVideoDownloadTaskList()
        return {records:list,num:count} as ListData<videoDownloadTaskEntity>
        
    }
   

}