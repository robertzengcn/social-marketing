import { LlmImpl } from '@/modules/interface/LlmImpl';
import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";

// Assuming LlmImpl interface is defined somewhere in your project
//https://js.langchain.com/docs/integrations/chat/ollama/
export class OllamaLlm implements LlmImpl {
    private llm: ChatOllama;
    constructor(model:string,baseUrl:string="http://127.0.0.1:11434",temperature:number=0,maxRetries:number=2,apikey?:string) {
        // Initialization code here
        this.llm = new ChatOllama({
            model: model,
            temperature: temperature,
            maxRetries: maxRetries,
            baseUrl: baseUrl,
            // other params...
          });
    }

    // Implement the methods defined in LlmImpl interface
    async translate(inputlang:string,outputlang:string,text:string,systemMsg?:string):Promise<string|void>{
        let defaultMsg = "You are a helpful assistant that translates {input_language} to {output_language}. Do not include your own opinion or analysis.";
        if(systemMsg){
            defaultMsg = defaultMsg+" "+systemMsg;
        }
        const prompt = ChatPromptTemplate.fromMessages([
            [
              "system",
              defaultMsg,
            ],
            ["human", "{input}"],
          ]);
          
          const chain = prompt.pipe(this.llm);
          const res=await chain.invoke({
            input_language: inputlang,
            output_language: outputlang,
            input: text,
          });
          return res.content.toString()
    }


}

