'use strict';
import { expect, test,expectTypeOf } from 'vitest'
import {Taskrundb} from "@/model/taskrundb"
import {TaskRunEntity} from "@/entityTypes/taskrun-type";

test('insert-task-result-db', async function () {
    //save task run
    const taskrundb = new Taskrundb();
    const taskrun:TaskRunEntity={
        task_id: 1,
        taskrun_num: "1",
        log_path: "logfilepath"
    }

    taskrundb.saveTaskrun(taskrun,(info)=>{
        expect(info).toBeTypeOf('object');
    });   
});

test('get-task-run-list', async function () {
    const taskrundb = new Taskrundb();
    taskrundb.getTaskrunlist(69,(taskrunlist)=>{
        console.log(taskrunlist);
        expect(taskrunlist).toBeTypeOf('object');
    })
})