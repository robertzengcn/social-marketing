import { videoCaptionImpl } from '@/modules/interface/VideoCaptionImpl';
import { exec } from 'child_process';
export class Whisper implements videoCaptionImpl{
    //extract caption from video
    extractCaption(file: string, savePath: string,  execPath?:string,model?:string,errorCall?: (errorMsg: string) => void, stroutCall?:(message: string) => void, successCall?: () => void)
    {
        let command = `${execPath || 'whisper'} "${file}" --output_dir "${savePath}"`;
        if(model){
            command += ` --model ${model}`;
        }

        exec(command, (error, stdout, stderr) => {
            if (error) {
                if (errorCall) {
                    errorCall(`Error: ${stderr}`);
                }
                return;
            }

            if (stroutCall) {
                stroutCall(stdout);
            }

            if (successCall) {
                successCall();
            }
        });
    }
    
}