import {videoScraper} from "@/entityTypes/videoType"
import {douyinVideo} from "@/modules/douyinVideo"
import {AccountCookiesdb} from "@/model/account_cookiesdb"
import {CookiesType} from "@/entityTypes/cookiesType"
import {bilibiliVideo} from "@/modules/bilibiliVideo"
import { Video } from '@/modules/video';
import { SocialAccount } from "@/modules/socialaccount"


export class videoFactory {
    public async getVideotool(sitename: string,accountId:number):Promise<Video|null> {
        //get account detail
        const socialAccount=new SocialAccount();
        const accountdetail=await socialAccount.getAccountdetail(accountId)
        if(!accountdetail){
            throw new Error("account not found")
        }
        //get account cookies
        const accountCookiesModel=new AccountCookiesdb()
        const cookiesEntity=accountCookiesModel.getAccountCookies(accountId)
        if(!cookiesEntity.cookies){
            throw new Error("cookies not found for the account, you need login first")
        }
        //convert cookies string to cookies array[object]
        const cookiesList=JSON.parse(cookiesEntity.cookies)
        const cookies=cookiesList.map((item:CookiesType)=>{
            return item.name+"="+item.value
        }).join(";")
        const videoScraper:videoScraper={
            cookies:cookies
        }
        if(accountdetail.data.proxy&&(accountdetail.data.proxy.length>0)){
            //get random proxy from array
            const randomIndex=Math.floor(Math.random() * accountdetail.data.proxy.length)
            if(accountdetail.data.proxy[randomIndex].id&&(accountdetail.data.proxy[randomIndex].id>0)){
            videoScraper.proxy=accountdetail.data.proxy[randomIndex]
            }
        }
        switch(sitename){
           
            case 'douyin':
                return new douyinVideo(videoScraper);
                break;
            case 'bilibili':
                return new bilibiliVideo(videoScraper);
                break;                
        }
       return null;
        
    }
}