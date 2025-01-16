import { ExtraModule } from "@/entityTypes/extramodule-type";
export const MacExtraModuleConfig:ExtraModule[]=[

    {
        name:"youtube-dl",
        // description:"video download is a module that can download video from tiktok, Instagram and other platforms",
        packagename:"yt-dlp_macos",
        version:"2024.12.06",
        link:"https://github.com/yt-dlp/yt-dlp/releases/download/2024.12.06/yt-dlp_macos",
        requirePy:false,
        ispip:false
    },
    {
        name:"faster-whisper",
        packagename:"faster-whisper",
        version:"1.1.1",
        link:"https://github.com/SYSTRAN/faster-whisper",
        requirePy:true,
        ispip:true
    }

]