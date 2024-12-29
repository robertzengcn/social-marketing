import {CookiesProxy} from "@/entityTypes/videoType"
import {Proxy} from "@/entityTypes/proxyType"
import {VideodoanloadSuccessCall} from "@/entityTypes/videoType"
export interface videoDownloadImpl{

    downloadVideo(url: string, savePath: string, isSingleVideo:boolean,useBrowserCookies?:string,cookiesProxy?: CookiesProxy | null, proxy?: Proxy | null, execPath?: string, errorCall?: (errorMsg: string) => void, stroutCall?:(message: string) => void, successCall?: (param:VideodoanloadSuccessCall) => void)

    downloadPlaylist(url:string,savePath:string,cookiesProxy?:CookiesProxy|null,proxy?:Proxy|null,execPath?:string,errorCall?:(errorMsg:string)=>void,stroutCall?:(message:string)=>void)
}