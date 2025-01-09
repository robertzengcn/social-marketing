import {CookiesProxy} from "@/entityTypes/videoType"
import {Proxy} from "@/entityTypes/proxyType"
import {VideodoanloadSuccessCall} from "@/entityTypes/videoType"
export interface videoDownloadImpl{

    downloadVideo(url: string, savePath: string, useBrowserCookies?:string,cookiesProxy?: CookiesProxy | null, proxy?: Proxy | null, execPath?: string, videoQuality?:number,errorCall?: (link:string,errorMsg: string) => void, stroutCall?:(message: string) => void, successCall?: (param:VideodoanloadSuccessCall) => void)

    downloadPlaylist(url: string, savePath: string, useBrowserCookies?:string,cookiesProxy?: CookiesProxy | null, proxy?: Proxy | null, execPath?: string, videoQuality?:number,errorCall?: (link:string,errorMsg: string) => void, stroutCall?: (message: string) => void, successCall?: (param:VideodoanloadSuccessCall) => void,endCall?:(error:string)=>void)
}