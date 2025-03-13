import {OllamaLlm} from '@/modules/llm/OllamaLlm';
import { LlmImpl } from '@/modules/interface/LlmImpl';
import {AbstractTranslateFactory} from '@/modules/AbstractTranslateFactory';
import {TraditionalTranslateImpl} from '@/modules/interface/TraditionalTranslateImpl';
import {TranslateToolEnum} from "@/config/generate";
export class LlmFactory extends AbstractTranslateFactory{
    public getTraditionalTool(name: string): TraditionalTranslateImpl | undefined{
        return undefined;
    }
    
    public getLlmTool(sitename: string,url?:string,apikey?:string):LlmImpl | undefined {
        switch (sitename) {
            case TranslateToolEnum.DEEPSEEK_LOCAL:
                return new OllamaLlm("deepseek-r1",url);
            case TranslateToolEnum.LLAMA:
                return new OllamaLlm("llama",url);
            default:
                return undefined;
        }
    }
}