"use strict";
export {};
import {TranslateController} from "@/controller/TranslateController"
import {ProcessMessage} from "@/entityTypes/processMessage-type"

// Import statement for using postMessage in a worker environment
const worker: Worker = self as any;

// Function to safely send messages to the main thread
function sendMessage(data: any): void {
    worker.postMessage(data);
}

worker.onmessage=   async (e) => {
    if (!e.data) {
        return 
    } 
    const pme=JSON.parse(e.data) as ProcessMessage<any>
    if(e.data=="translate"){

    }
}

