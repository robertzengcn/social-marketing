'use strict';
export { };
import * as fs from 'fs';
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
    const status = result === 'OK';
    if (!status) {

      throw new Error(error)
    }
  }

}
