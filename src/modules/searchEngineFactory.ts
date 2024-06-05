import {searchEngineImpl} from "@/modules/interface/searchEngineImpl"
import {GoogleScraper} from "@/modules/googleScraper"
import {ScrapeOptions} from "@/entityTypes/scrapeType"
export class searchEngineFactory{
    public getSearchEngine(name:string,options: ScrapeOptions):searchEngineImpl{
        switch(name){
            default:
            case "google":
                return new GoogleScraper(options);
                break;
        }
    }
}