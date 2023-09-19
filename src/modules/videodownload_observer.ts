'use strict';
export { };
import {Observer} from './subject';
import {ScrapeVideo} from './social_scraper';
// import {Scraperdb} from "../model/scraperdb";
import {RemoteSource} from "../remotesource";
import {Videoedit} from "./videoedit";
const debug = require("debug")("Observer:videodownloadObserver");
const appRoot = require('app-root-path');
import * as path from "path";
import {Videodb} from "../model/videodb";

export class videodownloadObserver implements Observer{
    constructor() {
    }
    update(type:string,data:any){
        switch(type){
            case 'downloadvideoend':
                this.videodownloadend(data as ScrapeVideo);
                break;
            default:
                break;
        }
    }
    videodownloadend(data:ScrapeVideo){
        debug(data);
        //save data to video db
        // const scraperDb = Scraperdb.getInstance(); 
        const videoDb=new Videodb();
        const insertId=videoDb.saveVideo(data.video)
        //update remote data
        const remoteSourmodel = RemoteSource.getInstance();
        remoteSourmodel.Updateprocesstime(data.scrapeinfo.id);
        const vemodel=new Videoedit()
        const outputpath=path.resolve(appRoot+"")
        vemodel.removeWatermark(data.video.localpath,outputpath)
        videoDb.updateVideofilter(insertId,outputpath)
    }
    }