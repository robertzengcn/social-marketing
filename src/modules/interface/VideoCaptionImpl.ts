//the interface main for extracting caption from video
export interface videoCaptionImpl{
    //extract caption from video
    extractCaption(file: string, savePath: string,  execPath?:string,errorCall?: (errorMsg: string) => void, stroutCall?:(message: string) => void, successCall?: () => void)
    // //extract caption from playlist
    // extractPlaylistCaption(url: string, savePath: string, useBrowserCookies?:string,cookiesProxy?: CookiesProxy | null, proxy?: Proxy | null, execPath?: string, ignoreLink?:Array<string>,errorCall?: (link:string,errorMsg: string) => void, stroutCall?: (message: string) => void, successCall?: (param:VideodoanloadSuccessCall) => void,endCall?:(error:string)=>void)

}