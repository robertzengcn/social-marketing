import { RemoteSource} from '@/modules/remotesource'
export class userController {

    private user:string;
    private pass:string;
    //defined login function which will call remote source with request
    //and return the result
    public async login(user:string, pass:string) {
        this.user = user;
        this.pass = pass;
        const remoteSourmodel = RemoteSource.getInstance();
        
    }
}