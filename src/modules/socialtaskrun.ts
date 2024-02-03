import { getApplogpath, getdate } from "@/modules/lib/function"
import { Taskrundb } from "@/model/taskrundb"
// import { v4 as uuidv4 } from 'uuid';
import * as randomstring from "randomstring";
import {SocialTaskRunEntity} from "@/entity-types/socialtask-type"
const path = require("path");

//the social task run created each time when task run
export class SocialTaskRun {
    public createsocialtaskrun(socailtaskId: number): SocialTaskRunEntity {
        const taskrunmodel = new Taskrundb()
        const logfile = this.getlogfile(socailtaskId)
        const taskrunNum = this.gentaskrunNum(socailtaskId)
        taskrunmodel.saveTaskrun(socailtaskId, taskrunNum, logfile, null)
        const socialtaskRun: SocialTaskRunEntity = {
            taskId: socailtaskId,
            taskRunNum: taskrunNum,
            logfile: logfile
        }
        return socialtaskRun
    }
   

    private getlogfile(socailtaskId: number): string {
        const logDir = getApplogpath();
        if (!logDir) {
            throw new Error("get user home dir error")
        }
        const recorddate = getdate()
        return path.join(logDir, "social-task-log", recorddate, socailtaskId.toString() + ".log");
    }

    //generate unique task run number
    private gentaskrunNum(taskId: number): string {
        return taskId.toString() + ":" + randomstring.generate();
    }
    //get task id by task run id
    public getTaskidbytaskrunNum(taskrunNum: string): number {
        const taskrunmodel = new Taskrundb()
        return taskrunmodel.getTaskidbytaskrunNum(taskrunNum)
    }
}
