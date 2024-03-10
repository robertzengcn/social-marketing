import { Token } from "@/modules/token"
import { RemoteSource } from "@/modules/remotesource"
export class User {
    private tokenname: string = "social-market-token";
    public async Signout(){
         const remoteModel=new RemoteSource()
       await remoteModel.removeRemoteToken()
        const token = new Token();
        token.setValue(this.tokenname, "");
        
    }
}