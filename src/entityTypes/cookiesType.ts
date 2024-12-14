export interface CookiesType{
    domain:string;
    flag: boolean;
    path?:string;
    secure:boolean;
    expirationDate:number,
    hostOnly?:boolean,
    httpOnly?:boolean,
    session?:boolean,  
    sameSite?:string,
    name:string,
    value:string,
}