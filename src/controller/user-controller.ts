import { RemoteSource, jwtUser } from '@/modules/remotesource'
// import Store,{ Schema } from 'electron-store';
import {getUserpath,checkAndCreatePath,getApplogspath} from "@/modules/lib/function"
import { Scraperdb } from "@/model/scraperdb";
import {SequelizeConfig} from "@/config/SequelizeConfig"
// import * as fs from 'fs';
// import * as path from 'path';
import {USERSDBPATH,USERLOGPATH,USEREMAIL} from '@/config/usersetting';
import { Token } from "@/modules/token"

// import {Token} from "@/modules/token"

// const debug = require('debug')('user-controller');
export type userlogin = {
    user: string,
    pass: string,
}
export type userResponse = {
    status: boolean,
    msg: string,
    data?: jwtUser,
}
// interface SchemaData {
//     userPath: string;
//   }
export class userController {

    // private user: string;
    // private pass: string;
    //defined login function which will call remote source with request
    //and return the result
    public async login(data: userlogin): Promise<jwtUser> {

        const remoteSourmodel = new RemoteSource;
        //console.log(data)
        const jwtuser = await remoteSourmodel.Login(data.user, data.pass).then(async function (res) {
            //console.log(res);
            res as jwtUser
            if(res.email.length>0){
                
                //check db exist, create one if not exist
                
                //console.log('test')
                // store.set('useremail',res.email)
                const userdataPath=getUserpath(res.email)
                console.log(userdataPath)
                // const schema: Schema<SchemaData> = {
                //     // type: 'object',                 
                const logPath=getApplogspath(res.email)

                await checkAndCreatePath(userdataPath)
                await checkAndCreatePath(logPath)
                const tokenService=new Token()
                //tokenService.setValue('useremail',res.email)
                tokenService.setValue(USEREMAIL,res.email)
                tokenService.setValue(USERSDBPATH,userdataPath)
                tokenService.setValue(USERLOGPATH,logPath)
                const scraperModel = Scraperdb.getInstance(userdataPath);
                
                scraperModel.init()
                const sequelize=SequelizeConfig.getInstance(userdataPath);
                await sequelize.sync({ force: true });
            }
            return res;
        }).catch(function (error) {
            console.log(error.stack)
                //debug(error);
                throw new Error(error.message);
        });
        return jwtuser;
    }
    //check user login status
    public async checklogin(): Promise<jwtUser|null> {
        const remoteSourmodel = new RemoteSource;
        const userInfo=await remoteSourmodel.GetUserInfo().then(function (res) {
            console.log(res);
            return res;
        }).catch(function (error) {
            console.log(error)
                //debug(error);
                //throw new Error(error.message);
            return null
        });
        return userInfo;
    }
}