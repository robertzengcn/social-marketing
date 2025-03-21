import { RemoteSource, jwtUser } from '@/modules/remotesource'
// import Store,{ Schema } from 'electron-store';
import { getUserpath, checkAndCreatePath, getApplogspath } from "@/modules/lib/function"
import { Scraperdb } from "@/model/scraperdb";
// import {SequelizeConfig} from "@/config/SequelizeConfig"
// import * as fs from 'fs';
// import * as path from 'path';
import { USERSDBPATH, USERLOGPATH, USEREMAIL,USERNAME } from '@/config/usersetting';
import { Token } from "@/modules/token"
//import {runAfterTableCreate} from "@/modules/lib/databaseinit"
import { SqliteDb } from "@/modules/SqliteDb"
import { runafterbootup } from "@/modules/bootuprun"
import {UserInfoType} from "@/entityTypes/userType"
import { CommonMessage } from "@/entityTypes/commonType";
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
export class UserController {

    // private user: string;
    // private pass: string;
    //defined login function which will call remote source with request
    //and return the result
    public async login(data: userlogin): Promise<jwtUser> {

        const remoteSourmodel = new RemoteSource;
       // console.log(data)
        const jwtuser = await remoteSourmodel.Login(data.user, data.pass).then(async function (res) {
            //console.log(res);
            res as jwtUser
            if (res.email.length > 0) {

                //check db exist, create one if not exist

                //console.log('test')
                // store.set('useremail',res.email)
                const userdataPath = getUserpath(res.email)
                console.log(userdataPath)
                // const schema: Schema<SchemaData> = {
                //     // type: 'object',                 
                const logPath = getApplogspath(res.email)

                await checkAndCreatePath(userdataPath)
                await checkAndCreatePath(logPath)
                const tokenService = new Token()
                console.log(res)
                //tokenService.setValue('useremail',res.email)
                tokenService.setValue(USEREMAIL, res.email)
                tokenService.setValue(USERNAME, res.name)
                tokenService.setValue(USERSDBPATH, userdataPath)
                tokenService.setValue(USERLOGPATH, logPath)
                const scraperModel = Scraperdb.getInstance(userdataPath);
                //const dbdatapath=scraperModel.getdbpath(userdataPath)
                // console.log(dbdatapath)

                scraperModel.init()
                const appDataSource = SqliteDb.getInstance(userdataPath)
                try {
                    await appDataSource.connection.initialize()
                } catch (error) {
                    console.error('Failed to initialize database connection:', error)

                    // Log detailed error information
                    if (error instanceof Error) {
                        console.error(`Error name: ${error.name}`)
                        console.error(`Error message: ${error.message}`)
                        console.error(`Error stack: ${error.stack}`)


                        // Handle specific error types
                        if (error.message === 'SQLITE_CANTOPEN') {
                            console.error('Could not open SQLite database file. Check path and permissions.')
                        } else if (error.message === 'SQLITE_CORRUPT') {
                            console.error('SQLite database file is corrupted.')
                        } else if (error.name === 'CannotConnectAlreadyConnectedError') {
                            console.log('SQLite database file is already connected.')
                        } else {
                            // Throw a more descriptive error or return a specific error response
                           throw new Error(`Database initialization failed: ${error.message}`)
                        }


                    }
                }
                console.log('initialize')
                // const sequelize=SequelizeConfig.getInstance(userdataPath);
                // await sequelize.sync({ force: true,alter: true });
                // Insert some sample data after the sync completes
                //  runAfterTableCreate()

                await runafterbootup()
            }
            return res;
        }).catch(function (error) {
            console.log(error.stack)
            //debug(error);
            throw new Error(error.message);
        });
        return jwtuser;
    }
    //get user email
    public getUserInfo(): UserInfoType {
        const tokenService = new Token()
        const email = tokenService.getValue(USEREMAIL)
        const name = tokenService.getValue(USERNAME)
        const data:UserInfoType={
            name:name,
            email:email

        }
        return data;
    }
    //check user login status
    public async checklogin(): Promise<jwtUser | null> {
        const remoteSourmodel = new RemoteSource;
        const userInfo = await remoteSourmodel.GetUserInfo().then(function (res) {
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