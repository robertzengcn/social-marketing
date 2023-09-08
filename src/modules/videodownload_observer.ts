'use strict';
export { };
import {Observer} from './subject';
import {VideoInfo} from './social_scraper';
const debug = require("debug")("Observer:videodownloadObserver");

export class videodownloadObserver implements Observer{
    constructor() {
    }
    update(type:string,data:any){
        switch(type){
            case 'downloadvideoend':
                this.videodownload(data as VideoInfo);
                break;
            default:
                break;
        }
    }
    videodownload(data:VideoInfo){
        debug(data);

    }
}