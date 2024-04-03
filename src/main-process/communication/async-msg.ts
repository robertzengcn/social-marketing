const { ipcMain } = require('electron')
// import { SocialTaskController } from '@/controller/socialtask-controller'
import { SocialTask } from '@/modules/socialtask'
// import { BrowserWindow } from 'electron'
import {SocialAccountController} from "@/controller/socialaccount-controller";
import { ProxyController } from '@/controller/proxy-controller';
type dataResponse = {
    status: boolean,
    code:number,
    msg: string,
    data?:any
}
export default function AsyncMsg() {
    console.log("AsyncMsg");
    ipcMain.on('socialtask:start', async (event, data) => {
        console.log("get social task data")

        const qdata = JSON.parse(data);
        if (!qdata.hasOwnProperty("id")) {
            throw new Error("id not found");
        }

        if (!qdata.hasOwnProperty("runNum")) {
            throw new Error("runNum not found");
        }
        const socialtaskcon = new SocialTask()


        const result = await socialtaskcon.createsocialtask(qdata.id, qdata.runNum).catch(function (error) {
            console.log(error.message)
            return null;
        });

        if (!result) {
            const sendRes: dataResponse = {
                status: false,
                code:20240322143237,
                msg: "start social task failed"
            }
            event.sender.send('socialtask:start', JSON.stringify(sendRes))
        } else {
            const successRes: dataResponse = {
                status: true,
                code:0,
                msg: result.taskrun_num
            }
            event.sender.send('socialtask:start', JSON.stringify(successRes))
        }
        //run task
        if (result) {
            socialtaskcon.runsocialtask(result, function (res) {

                event.sender.send('socialtask:log:' + qdata.runNum, JSON.stringify(res))
            })
        }
    })
    //login social account
    ipcMain.on('socialaccount:login', async (event, data) => {
        const qdata = JSON.parse(data);
        if (!qdata.hasOwnProperty("id")) {
            throw new Error("id not found");
        }
        const sac=new SocialAccountController()
        try{
        sac.loginSocialaccount(qdata.id)
        }catch(e){
            if(e instanceof Error){
            console.log(e.message)
            event.sender.send('socialaccount:login:msg', JSON.stringify({msg:e.message,status:false}))
        }
    }
        // const win = new BrowserWindow()
        
        // win.loadURL('https://github.com')
        // win.once('ready-to-show', () => {
        //     win.show()
        // })
    })

    //send csv file name to server, and server will parse it
    // ipcMain.on('proxy:parsecsv', async (event, data) => {
    //     const qdata = JSON.parse(data);
        
    //     const proxyCon=new ProxyApi()
    //     const result=await proxyCon.importProxy(qdata.filename)
    //     if (!result) {
    //         const sendRes: dataResponse = {
    //             status: false,
    //             code:20240322143391,
    //             msg: "parse csv failed"
                
    //         }
    //         event.sender.send('proxy:parsecsv', JSON.stringify(sendRes))
    //     } else {
    //         const successRes: dataResponse = {
    //             status: true,
    //             msg: "parse csv success",
    //             code:0,
    //             data:result
    //         }
    //         event.sender.send('proxy:parsecsv', JSON.stringify(successRes))
    //     }
    // })
}
