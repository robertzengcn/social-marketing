"use strict";
export {};
import {TranslateController} from "@/controller/TranslateController"
import {ProcessMessage} from "@/entityTypes/processMessage-type"
import { parentPort, workerData } from "worker_threads";
import {VideoTranslateItem } from "@/entityTypes/videoType";
import {TransItemsParam} from "@/entityTypes/translateType"
import {TranslateProducer} from "@/modules/TranslateProducer"
import {LlmCongfig,TraditionalTranslateCongfig} from '@/entityTypes/commonType'

async function startWorkerProcess() {
    const { action, data } = workerData;
    console.log("output from workerData",workerData)
    switch(action){
        case 'translateVideoInfo':
            console.log("translating video info")
            break;

    }
}

const translateVideoinfo=async (data:TransItemsParam<VideoTranslateItem>)=>{
    if(!data.translate_tool){
        console.error("translate tool is not provided")
        return
    }
    let toolType:string|void=undefined
    const translatePro=new TranslateProducer()
    toolType=translatePro.checkTooltype(data.translate_tool)

    const translateCon=new TranslateController()
    let llmcon:LlmCongfig|void
    let traditionalTranslateCongfig:TraditionalTranslateCongfig|void
    if(toolType=="llm"){
        llmcon= await translateCon.getLlmconfig(data.translate_tool)
    }else if(toolType=="api"){
        traditionalTranslateCongfig=await translateCon.getTranslateConfig(data.translate_tool)
    }


    for (const item in data.items){
        // translatePro.translateText(data.translate_tool,data.items[item].source_language,data.target_language,data.items[item].text,llmcon,traditionalTranslateCongfig)
    }
}

startWorkerProcess();