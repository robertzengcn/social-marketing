// const keytar = require('keytar')
// import keytar from 'keytar'
const keytar = require('keytar')

export class StoreService {
    private service:string;
    constructor(service:string){
        this.service=service;
    }
    public setPassword(account:string, password:string){
        keytar.setPassword(this.service, account, password)
    } 
    //get password
    public async getPassword(account:string):Promise<string | null>{
        return await keytar.getPassword(this.service, account)
    }

}