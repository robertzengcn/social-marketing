'use strict';
export { };
import * as fs from 'fs';
import { todo } from 'node:test';
const { spawnSync } = require('child_process');

export class Videoedit {
  /**
   * 
   * @param videoPath 
   * @param startTime 
   * @param endTime 
   */
  async removeWatermark(videoPath: string, outputpath: string) {
    //check video path exist
    if (!fs.existsSync(videoPath)) {
      throw new Error("video path not exist");
    }
    const pythonProcess = await spawnSync('Marketingtool', [
      '--action', 'removeWatermark', '-f', videoPath, '-o', outputpath
    ]);
    const result = pythonProcess.stdout?.toString()?.trim();
    const error = pythonProcess.stderr?.toString()?.trim();
    //@todo
    //check command run success 
  }
  /**
   * get video captions
   */
  async getVideocaptions(videoPath: string,outputPath:string,sourcelang:string,targetlang:string){
    if (!fs.existsSync(videoPath)) {
      throw new Error("video path not exist");
    }
    const pythonProcess = await spawnSync('Marketingtool', [
      '--action', 
      'translate', 
      '-f', videoPath,
      '--source-lang',sourcelang,
      '--target-lang',targetlang
    ]);
    const result = pythonProcess.stdout?.toString()?.trim();
    const error = pythonProcess.stderr?.toString()?.trim();

  }


}
