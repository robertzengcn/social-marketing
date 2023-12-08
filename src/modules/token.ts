"use strict";
export {};
const keytar = require('keytar')
const os = require('os');

export class Token {
    private keytarService = 'SocialScraper-token';
    //get account name
    private getaccountname():string{
        return os.userInfo().username;
    }
    //save user token
    public setToken(token: string): void {
        keytar.setPassword(this.keytarService, this.getaccountname(), token)
    } 
    //get user token
    public async getToken():Promise<string>{
       
        const token=await keytar.getPassword(this.keytarService, this.getaccountname())
        console.log(token);
        console.log(1111);
        return token;
        
    }
}

