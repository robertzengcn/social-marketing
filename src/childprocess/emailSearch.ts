import {EmailSearchData,EmailDatascraper,EmailResult} from "@/entityTypes/emailextraction-type"
import { ProxyParseItem} from "@/entityTypes/proxyType"
import {proxyEntityToUrl} from "@/modules/lib/function"
import { SMstruct } from "@/entityTypes/scrapeType"
import { Cluster } from "puppeteer-cluster"
import {EmailCluster} from "@/childprocess/emailCluster"
export class EmailSearch{
    
    public async searchEmail(data: EmailSearchData,callback?:(arg: EmailResult) => void) {
        const proxyStrList:Array<string> = []
        console.log("proxy are following")
       // console.log(data.proxys)
        if (data.proxys) {
               data.proxys.forEach((value, key) => {
                   const proxyitem:ProxyParseItem = {
                       host: value.host,
                       port: value.port,
                       user: value.user,
                       pass: value.pass,
                       protocol: value.protocol
                   }
                   const proxyStr=proxyEntityToUrl(proxyitem)
                   proxyStrList.push(proxyStr)
               })
           }
           const smConfig: SMstruct = {
            headless: data.notShowBrowser,
            debug_level: 1,
            puppeteer_cluster_config: {
                timeout: 30 * 60 * 1000, // max timeout set to 10 minutes
                monitor: true,
                concurrency: Cluster.CONCURRENCY_BROWSER,
                //concurrency:data.concurrency, // one scraper per tab
               maxConcurrency: data.concurrency, // scrape with 1 tab
               
            },
            page_length:data.pageLevel,
            proxies: proxyStrList,
        }
        const emailCluster=new EmailCluster(smConfig)
        const sedata:EmailDatascraper={
            urls:data.urls,
            callback:callback
        }

        emailCluster.searchdata(sedata)
    }
}