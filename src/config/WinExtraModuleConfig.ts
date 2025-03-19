import { ExtraModule } from "@/entityTypes/extramoduleType";
export const WinExtraModuleConfig:ExtraModule[]=[

    {
        name:"youtube-dl",
        // description:"video download is a module that can download video from tiktok, Instagram and other platforms",
        packagename:"yt-dlp.exe",
        version:"2025.02.19",
        link:"https://github.com/yt-dlp/yt-dlp/releases/download/2025.02.19/yt-dlp.exe",
        requirePy:false,
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