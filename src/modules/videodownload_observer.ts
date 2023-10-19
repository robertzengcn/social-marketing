'use strict';
export { };
import {Observer} from './subject';
import {ScrapeVideo} from './social_scraper';
// import {Scraperdb} from "../model/scraperdb";
import {RemoteSource} from "./remotesource";
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
        const vemodel=new Videoedit();
        const outputpath=path.resolve(appRoot+"/tmp/video/filterwater/")
        const outputpathfilename=outputpath+path.sep+Math.random().toString(16).slice(2)+".mp4"
        //save video data to db
        videoDb.saveVideo(data.video,(insertId) =>vemodel.removeWatermark(data.video.localpath,outputpathfilename,insertId,function updatevidedata(insertId:number,outputpathfilename:string){
            const videoDbs=new Videodb();
            debug("start to update video filter, the insert id is "+insertId+" the output path is "+outputpathfilename)
            videoDbs.updateVideofilter(insertId,outputpathfilename)
        }))
        //update remote data
        const remoteSourmodel = RemoteSource.getInstance();
        remoteSourmodel.Updateprocesstime(data.scrapeinfo.id);     
        
    }
    }