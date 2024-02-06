const { ipcMain } = require('electron')
import { SocialTaskController } from '@/controller/socialtask-controller'
import { SocialTask } from '@/modules/socialtask'
type dataResponse = {
    status: boolean,
    msg: string
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


        const result = await socialtaskcon.createsocialtask(qdata.id,qdata.runNum).catch(function (error) {
            console.log(error.message)
            return null;
        });

        if (!result) {
            const sendRes: dataResponse = {
                status: false,
                msg: "start social task failed"
            }
            event.sender.send('socialtask:start', JSON.stringify(sendRes))
        } else {
            const successRes: dataResponse = {
                status: true,
                msg: result.taskRunNum
            }
            event.sender.send('socialtask:start', JSON.stringify(successRes))
        }
        //run task
        if (result) {
            socialtaskcon.runsocialtask(result, function (res) {

                event.sender.send('socialtask:log:'+qdata.runNum, JSON.stringify(res))
            })
        }
    })
}
