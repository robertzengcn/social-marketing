'use strict';
export { };
import * as fs from 'fs';
// import { todo } from 'node:test';
const debug = require('debug')('videoedit');
const { spawnSync } = require('node:child_process');
import * as path from 'path';

export class Videoedit {
  /**
   * 
   * @param videoPath 
   * @param startTime 
   * @param endTime 
   */
  async removeWatermark(videoPath: string, outputpathfile: string) {
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
    const pythonProcess = await spawnSync('Marketingtool', [
      '--action', 'removeWatermark', '-f', videoPath, '-o', outputpathfile
    ]);

    const result = pythonProcess.stdout?.toString()?.trim();
    const error = pythonProcess.stderr?.toString()?.trim();
    debug(result)
    if(error){
      throw new Error(error)
    }


    // pythonProcess.stdout.on('data', (data) => {
    //   console.log(`stdout: ${data}`);
    // });

    // pythonProcess.stderr.on('data', (data) => {
    //   console.error(`stderr: ${data}`);
    // });

    // pythonProcess.on('close', (code) => {
    //   console.log(`child process exited with code ${code}`);
    // });

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
    const pythonProcess = await spawnSync('Marketingtool', [
      '--action',
      'translate',
      '-f', videoPath,
      '--source-lang', sourcelang,
      '--target-lang', targetlang
    ]);
  
    const result = pythonProcess.stdout?.toString()?.trim();
    const error = pythonProcess.stderr?.toString()?.trim();
    debug(result)
    if(error){
      throw new Error(error)
    }
  }


}
