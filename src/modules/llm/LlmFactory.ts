import {OllamaLlm} from '@/modules/llm/OllamaLlm';
import { LlmImpl } from '@/modules/interface/LlmImpl';
export class LlmFactory {

    public getLlmTool(sitename: string,url?:string):LlmImpl | undefined {
        switch (sitename) {
            case 'deepseek-r1':
                return new OllamaLlm("deepseek-r1",url);
            case 'llama':
                return new OllamaLlm("llama",url);
            default:
                return undefined;
        }
    }
}