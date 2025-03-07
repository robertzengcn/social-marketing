import {LlmFactory} from '@/modules/llm/LlmFactory';
import { LlmImpl } from '@/modules/interface/LlmImpl';
import {LanguageItem} from '@/entityTypes/commonType'

export class TranslateProducer {
    protected avaialableLlm:string[]=["deepseek-r1","llama","grok"];
    protected availableApi:string[]=["google","baidu"];

    TranslateText(name:string,sourceLan:LanguageItem,targetLan:LanguageItem,text:string,systemMsg?:string):Promise<string|void>{
        if(this.avaialableLlm.includes(name)){
            return this.translateWithLLM(name,sourceLan.code,targetLan.code,text,systemMsg);
        }else if(this.availableApi.includes(name)){
            //return this.translateWithAPI(name,sourceLan.code,targetLan.code,text,systemMsg);
        }
        return Promise.resolve(undefined);
    }
    translateWithLLM(model:string,inputlang:string,outputlang:string,text:string,systemMsg?:string):Promise<string|void>{
        let factory=new LlmFactory();
        let tool:LlmImpl|undefined=factory.getLlmTool(model);
        if(tool){
            return tool.translate(inputlang,outputlang,text,systemMsg);
        }
        return Promise.resolve(undefined);
    }

}