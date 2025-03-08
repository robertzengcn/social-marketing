import {TranslateToolEnum} from "@/config/generate";
import {LlmCongfig,TraditionalTranslateCongfig} from '@/entityTypes/commonType'
export class TranslateController {

    async translateText(toolName:string, sourceLan: string, targetLan: string, text: string): Promise<string | void> {
        if(!toolName){
            throw new Error("toolName is required");
        }
        const llmConfig=await this.getLlmconfig(toolName);
    
    }
    async getLlmconfig(toolName:string):Promise<LlmCongfig|void>{
        switch(toolName){
            case TranslateToolEnum.DEEPSEEK:
            //get deepseek config
            
               break;
            case TranslateToolEnum.OPENAI:

               break; 
            case TranslateToolEnum.XAI:

                break;
            default:
                throw new Error("toolName not found");
        }
    }

}