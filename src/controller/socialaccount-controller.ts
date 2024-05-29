import { SocialAccount } from "@/modules/socialaccount";
import { BrowserWindow, session } from 'electron'
import { AccountCookiesdb, AccountCookiesEntity } from "@/model/account_cookiesdb";
import { ProxyController } from "./proxy-controller";
import { ProxyParseItem } from "@/entityTypes/proxyType";
import {showNotification} from "@/modules/lib/function"
export class SocialAccountController {
    //open open and login social account
    public async loginSocialaccount(id: number): Promise<void> {

        const socialaccountModel = new SocialAccount();
        const accinfo = await socialaccountModel.getAccountdetail(id)
        if (!accinfo || !accinfo.data.id) {
            throw new Error("get account info failed")
        }
        if (!accinfo.status) {
            throw new Error(accinfo.msg)
        }
        //get account cookies
        const accoutndb = new AccountCookiesdb()
        const cookies = accoutndb.getAccountCookies(accinfo.data.id)
        let partition_path = "persist:path/" + Date.now() + '-' + Math.random().toString(36).slice(2, 9)
        if (cookies) {
            if (cookies.partition_path) {
                partition_path = cookies.partition_path
            }
        }
        const ses = session.fromPartition(partition_path)
        //set title for window
        let winTitle=""
        if(accinfo.data.social_type){
        winTitle=accinfo.data.social_type
        }
        if (accinfo.data.proxy) {
            const randomProxy = accinfo.data.proxy[Math.floor(Math.random() * accinfo.data.proxy.length)];

            if (randomProxy.host && randomProxy.port) {
                winTitle+=" Use proxy host:"+randomProxy.host+" port:"+randomProxy.port
                const proxyCon = new ProxyController()
                const proxyitem: ProxyParseItem = {
                    host: randomProxy.host,
                    port: randomProxy.port,
                    user: randomProxy.username,
                    pass: randomProxy.password,
                    protocol: randomProxy.protocol
                }
                const proxyUrl = proxyCon.proxyEntityToUrl(proxyitem)
                // console.log(randomProxy.url)
                //convert proxy to string
                ses.setProxy({ proxyRules: proxyUrl }).then(() => {
                    console.log('set proxy success, use proxy host:' + randomProxy.host + " port:" + randomProxy.port)
                }).catch((error) => {
                    console.log('set proxy failed, error:' + error)
                })
            }
        }
       
        
        const win = new BrowserWindow({
            autoHideMenuBar: true, webPreferences: {
                session: ses
            }
        })
        win.setTitle(winTitle)
        win.setMenu(null)
        // showNotification("test title","test message")
        if (accinfo.data.social_type_url) {
            await win.loadURL(accinfo.data.social_type_url).catch((error) => {
                console.log('load url failed, error:' + error.message)
                // showNotification("error","load url failed, error:" + error.message)
                win.close()
                throw new Error('load url failed, error:' + error.message)
            })
            // win.loadURL('https://ident.me/ip')
        }
        win.once('ready-to-show', () => {
            win.show()
            // win.webContents.executeJavaScript('alert("Hello, world!")');
        })
        const winsession = win.webContents.session
        // winsession.cookies.remove()
        win.on('close', async function () { //   <---- Catch close event
            const cookiescontent = await winsession.cookies.get({})
            console.log("get cookies:")
            console.log(cookiescontent)
            const cookiesstr = JSON.stringify(cookiescontent)
            if (accinfo.data.id) {
                const ace: AccountCookiesEntity = {
                    account_id: accinfo.data.id,
                    cookies: cookiesstr,
                    partition_path: partition_path
                }
                const acdb = new AccountCookiesdb()
                acdb.saveAccountCookies(ace)
            }
        });

    }

}