import { Token } from "@/modules/token"
import { RemoteSource } from "@/modules/remotesource"
import {USERSDBPATH,TOKENNAME} from '@/config/usersetting';
export class User {
    //private tokenname= "social-market-token";
    public async Signout(){
         const remoteModel=new RemoteSource()
       await remoteModel.removeRemoteToken()
        const token = new Token();
        token.setValue(TOKENNAME, "");
        token.setValue(USERSDBPATH, "");
    }
}