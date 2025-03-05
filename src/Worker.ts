"use strict";
export {};
import {TranslateController} from "@/controller/TranslateController"
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
    if(e.data=="translate"){

    }
}

