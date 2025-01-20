import { VideoCaptionImpl } from '@/modules/interface/VideoCaptionImpl';
import { extraFileEntity } from "@/entityTypes/videoType";
import { exec } from 'child_process';
export class Whisper implements VideoCaptionImpl{
    //extract caption from video
    extractCaption(param:extraFileEntity)
    {
        let command = `${param.execPath || 'whisper'} "${param.file}" --output_dir "${param.savePath}"`;
        if(param.model){
            command += ` --model ${param.model}`;
        }

        exec(command, (error, stdout, stderr) => {
            if (error) {
                if (param.errorCall) {
                    param.errorCall(`Error: ${stderr}`);
                }
                return;
            }

            if (param.stroutCall) {
                param.stroutCall(stdout);
            }

            if (param.successCall) {
                param.successCall();
            }
        });
    }
    
}