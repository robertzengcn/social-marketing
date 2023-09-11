'use strict';
export { };
import {Observer} from './subject';
import {ScrapeVideo} from './social_scraper';
import {Scraperdb} from "../scraperdb";
import {RemoteSource} from "../remotesource";
const debug = require("debug")("Observer:videodownloadObserver");

export class videodownloadObserver implements Observer{
    constructor() {
    }
    update(type:string,data:any){
        switch(type){
            case 'downloadvideoend':
                this.videodownload(data as ScrapeVideo);
                break;
            default:
                break;
        }
    }
    videodownload(data:ScrapeVideo){
        debug(data);
        //save data to video db
        const scraperDb = Scraperdb.getInstance(); 
        scraperDb.saveVideo(data.video)
        //update remote data
        const remoteSourmodel = RemoteSource.getInstance();
        remoteSourmodel.Updateprocesstime(data.scrapeinfo.id);
    }
    }