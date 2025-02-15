import {LlmFactory} from '@/modules/llm/LlmFactory';
import { LlmImpl } from '@/modules/interface/LlmImpl';
export class TranslateProducer {
    protected avaialableLlm:string[]=["deepseek-r1","llama"];
    protected availableApi:string[]=["google","baidu"];

    getLLMtranslate(model:string,url?:string):LlmImpl | undefined{
        const llmfactory=new LlmFactory()
        return llmfactory.getLlmTool(model,url);
    }
    translateWithLLM(model:string,url:string,inputlang:string,outputlang:string,text:string,systemMsg?:string):Promise<string|void>{
        const llm=this.getLLMtranslate(model,url);
        if(llm){
            return llm.translate(inputlang,outputlang,text,systemMsg);
        }
        return Promise.resolve(undefined);
    }

}