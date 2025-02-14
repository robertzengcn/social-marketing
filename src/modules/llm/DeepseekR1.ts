import { LlmImpl } from '@/modules/interface/LlmImpl';
import { ChatOllama } from "@langchain/ollama";
// Assuming LlmImpl interface is defined somewhere in your project

export class DeepseekR1 implements LlmImpl {
    private llm: ChatOllama;
    constructor() {
        // Initialization code here
        this.llm = new ChatOllama({
            model: "deepseek-r1",
            temperature: 0,
            maxRetries: 2,
            // other params...
          });
    }

    // Implement the methods defined in LlmImpl interface
    async translate(inputlang:string,outputlang:string,text:string,systemMsg?:string):Promise<string>{

    }

  

    // Add other methods as required by LlmImpl interface
}

