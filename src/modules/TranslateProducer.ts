import {LlmFactory} from '@/modules/llm/LlmFactory';
import { LlmImpl } from '@/modules/interface/LlmImpl';
import {LanguageItem} from '@/entityTypes/commonType'
import {LlmCongfig,TraditionalTranslateCongfig} from '@/entityTypes/commonType'


export class TranslateProducer {
    protected avaialableLlm:string[]=["deepseek-r1","llama","grok"];
    protected availableApi:string[]=["google","baidu"];

    checkTooltype(name:string):string|void{
        if(this.avaialableLlm.includes(name)){
            return "llm";
        }else if(this.availableApi.includes(name)){
            return "api";
        }
        return undefined;
    }

    async translateText(name:string,sourceLan:LanguageItem,targetLan:LanguageItem,text:string,llmconfig?:LlmCongfig,traditionConfig?:TraditionalTranslateCongfig):Promise<string|void>{
        if(this.avaialableLlm.includes(name)){
            if(!llmconfig){
                throw new Error("llmconfig is required");
            }
            return this.translateWithLLM(sourceLan.code,targetLan.code,text,llmconfig);
        }else if(this.availableApi.includes(name)){
            //return this.translateWithAPI(name,sourceLan.code,targetLan.code,text,systemMsg);
        }
        return Promise.resolve(undefined);
    }
    async translateWithLLM(inputlang:string,outputlang:string,text:string,llmconfig:LlmCongfig):Promise<string|void>{
        let factory=new LlmFactory();
        let tool:LlmImpl|undefined=factory.getLlmTool(llmconfig.model,llmconfig.url);
        if(tool){
            return tool.translate(inputlang,outputlang,text);
        }else{
            throw new Error("llm tool not found");
        }
        
    }

}