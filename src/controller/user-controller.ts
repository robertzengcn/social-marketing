import { RemoteSource, jwtUser } from '@/modules/remotesource'
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
            return res;
        })
            .catch(function (error) {
                // console.log(error);
                throw new Error(error.message);
            });
        return jwtuser;
    }
}