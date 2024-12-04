"use strict";
export {};
export interface Video {
    checkRequirement():boolean;
    download(link:string,videopath:string,cookies:string,errorcall?: (errorMessage: string) => void,stdoutCall?:(stdout: string) => void,stderrCall?:(stderr: string) => void,finishCall?:()=> void):void;
  
}