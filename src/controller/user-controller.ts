import { RemoteSource, jwtUser } from '@/modules/remotesource'
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
export class userController {

    // private user: string;
    // private pass: string;
    //defined login function which will call remote source with request
    //and return the result
    public async login(data: userlogin): Promise<jwtUser> {

        const remoteSourmodel = RemoteSource.getInstance();

        const jwtuser = await remoteSourmodel.Login(data.user, data.pass).then(function (res) {
            //debug(22);
            return res;
        }).catch(function (error) {
                //debug(error);
                throw new Error(error.message);
        });
        return jwtuser;
    }
}