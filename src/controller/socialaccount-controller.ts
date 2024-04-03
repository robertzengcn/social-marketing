import {SocialAccount} from "@/modules/socialaccount";
import { BrowserWindow,session } from 'electron'
import {AccountCookiesdb,AccountCookiesEntity} from "@/model/account_cookiesdb";
export class SocialAccountController {
    //open open and login social account
    public async loginSocialaccount(id: number): Promise<void> {
        
        const socialaccountModel=new SocialAccount();
        const accinfo=await socialaccountModel.getAccountdetail(id)
        if(!accinfo||!accinfo.data.id){
            throw new Error("get account info failed")
        }
        if(!accinfo.status){
            throw new Error(accinfo.msg)
        }
        //get account cookies
        const accoutndb=new AccountCookiesdb()
        const cookies=accoutndb.getAccountCookies(accinfo.data.id)
        let partition_path="persist:path/"+ Date.now() + '-' + Math.random().toString(36).slice(2, 9)
        if(cookies){
            if(cookies.partition_path){
                partition_path=cookies.partition_path
            }
        }
        const ses = session.fromPartition(partition_path)
        const win = new BrowserWindow({autoHideMenuBar:true,webPreferences:{
           session:ses
        }}) 
      
        // winsession.cookies.set({url:accinfo.data.social_type_url})
        // win.loadURL(accinfo.data.social_type_url)
        win.loadURL("https://www.google.com")
        
        win.once('ready-to-show', () => {
            win.show()
            // win.webContents.executeJavaScript('alert("Hello, world!")');
        
        })
        const winsession=win.webContents.session
        // winsession.cookies.remove()
        win.on('close', async function() { //   <---- Catch close event
            const cookiescontent=await winsession.cookies.get({})
            console.log("get cookies:")
            console.log(cookiescontent)
            const cookiesstr=JSON.stringify(cookiescontent)
            if(accinfo.data.id){
            const ace:AccountCookiesEntity={
                account_id:accinfo.data.id,
                cookies:cookiesstr,
                partition_path:partition_path
            }
            const acdb=new AccountCookiesdb()
            acdb.saveAccountCookies(ace)
            }
        });
        
    }

}