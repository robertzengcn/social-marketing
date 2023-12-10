import { RemoteSource, jwtUser } from '@/modules/remotesource'
// import {Token} from "@/modules/token"

const debug = require('debug')('user-controller');
export type userlogin = {
    user: string,
    pass: string,
}
export type userResponse = {
    status: boolean,
    msg: string,
    data?: jwtUser,
}
export class userController {

    // private user: string;
    // private pass: string;
    //defined login function which will call remote source with request
    //and return the result
    public async login(data: userlogin): Promise<jwtUser> {

        const remoteSourmodel = new RemoteSource;
        //console.log(data)
        const jwtuser = await remoteSourmodel.Login(data.user, data.pass).then(function (res) {
            //console.log(res);
            return res;
        }).catch(function (error) {
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