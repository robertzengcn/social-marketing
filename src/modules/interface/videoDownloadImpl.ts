import {CookiesProxy} from "@/entityTypes/videoType"
import {Proxy} from "@/entityTypes/proxyType"
export interface videoDownloadImpl{

    downloadVideo(url:string,savePath:string,cookiesProxy?:CookiesProxy|null,proxy?:Proxy|null,execPath?:string,errorCall?:(errorMsg:string)=>void,stroutCall?:(message:string)=>void)

    downloadPlaylist(url:string,savePath:string,cookiesProxy?:CookiesProxy|null,proxy?:Proxy|null,execPath?:string,errorCall?:(errorMsg:string)=>void,stroutCall?:(message:string)=>void)
}