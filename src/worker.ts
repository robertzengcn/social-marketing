"use strict";
export {};
import {TranslateController} from "@/controller/TranslateController"
import {ProcessMessage} from "@/entityTypes/processMessage-type"
import { parentPort, workerData } from "worker_threads";


async function startWorkerProcess() {
    const { action, data } = workerData;
    console.log("output from workerData",workerData)
}



startWorkerProcess();