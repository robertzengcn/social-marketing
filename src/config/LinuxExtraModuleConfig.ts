import { ExtraModule } from "@/entityTypes/extramoduleType";
export const LinuxExtraModuleConfig:ExtraModule[]=[

    {
        name:"youtube-dl",
        // description:"video download is a module that can download video from tiktok, Instagram and other platforms",
        packagename:"yt-dlp",
        version:"2024.08.07",
        link:"https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp",
        requirePy:true,
        ispip:false,
        requireFfmpeg:false
    },
    {
        name:"openai-whisper",
        packagename:"openai-whisper",
        version:"v20240930",
        link:"https://github.com/openai/whisper",
        requirePy:true,
        ispip:true,
        requireFfmpeg:true
    }

]