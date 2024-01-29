const { ipcMain } = require('electron')
import { SocialTaskController } from '@/controller/socialtask-controller'
type dataResponse={
    status:boolean,
    msg:string
}
export default function AsyncMsg() {
    console.log("AsyncMsg");
    ipcMain.on('socialtask:start', async(event, data) => {
        console.log("get social task data")

        const qdata=JSON.parse(data);
        if(!qdata.hasOwnProperty("id")){
            throw new Error("id not found");
        }
        const socialtaskcon=new SocialTaskController()
        
        
         const result=await socialtaskcon.createSocialtask(qdata.id).catch(function (error){
            console.log(error.message)
            return null;
         });

        if(!result){
            const sendRes:dataResponse={
                status:false,
                msg:"start social task failed"
            }
            event.sender.send('socialtask:start', JSON.stringify(sendRes))
        }else{
            const successRes:dataResponse={
                status:true,
                msg:result.taskRunNum
            }
            event.sender.send('socialtask:start', JSON.stringify(successRes))
        }
        //run task
        if(result){
        socialtaskcon.runSocialtask(result)
        }
    })
}
