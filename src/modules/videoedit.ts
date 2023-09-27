'use strict';
export { };
import * as fs from 'fs';
// import { todo } from 'node:test';
const debug = require('debug')('videoedit');
import { spawn,spawnSync } from 'node:child_process';
import * as path from 'path';

export class Videoedit {
  /**
   * 
   * @param videoPath 
   * @param startTime 
   * @param endTime 
   */
  async removeWatermark(videoPath: string, outputpathfile: string,insertId:number|null,callback:Function|undefined) {
    //check video path exist
    if (!fs.existsSync(videoPath)) {
      throw new Error("video path not exist");
    }
    const outputpath=path.dirname(outputpathfile)
    //check output path exist
    if (!fs.existsSync(outputpath)) {
      //create directory
      fs.mkdirSync(outputpath, { recursive: true });
    }
    const pythonProcess = await spawn('Marketingtool', [
      '--action', 'removeWatermark', '-f', videoPath, '-o', outputpathfile
    ]);

    // const result = pythonProcess.stdout?.toString()?.trim();
    // const error = pythonProcess.stderr?.toString()?.trim();
    // debug(result)
    // if(error){
    //   throw new Error(error)
    // }


    pythonProcess.stdout.on('data', (data) => {
      debug(`stdout: ${data}`);
     
    });

    pythonProcess.stderr.on('data', (data) => {
      debug(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      debug(`child process exited with code ${code}`);
      
      if(callback&&(code==0)){
        debug("run callback")
        callback(insertId,outputpathfile);
      }else{
        //fileter watermark failuer, try to convert the 
        
      }
    });

    // const result = pythonProcess.stdout;
    // // const error = pythonProcess.stderr?.toString()?.trim();
    // const error = pythonProcess.stderr;
    // console.log(result)
    // debug(result)
    // //check command run success 
    // if(error){
    //   throw new Error(error)
    // }
  }
  /**
   * get video captions
   */
  async getVideocaptions(videoPath: string, outputPath: string, sourcelang: string, targetlang: string) {
    if (!fs.existsSync(videoPath)) {
      throw new Error("video path not exist");
    }
    const pythonProcess = await spawn('Marketingtool', [
      '--action',
      'translate',
      '-f', videoPath,
      '--source-lang', sourcelang,
      '--target-lang', targetlang
    ]);
  
    // const result = pythonProcess.stdout?.toString()?.trim();
    // const error = pythonProcess.stderr?.toString()?.trim();
    // debug(result)
    // if(error){
    //   throw new Error(error)
    // }
  }

  async convertvideo(videoPath: string, outputpathfile: string){
    if (!fs.existsSync(videoPath)) {
      throw new Error("video path not exist");
    }

    const pythonProcess = await spawnSync('Marketingtool', [
      '--action',
      'convertvideo',
      '-f', videoPath,
      '-o', outputpathfile,
    ]);
    

  }


}
