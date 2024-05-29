export type CookiesType={
    name:string,
    value:string,
    domain?:string,
    hostOnly?:boolean,
    path?:string,
    secure?:boolean,
    httpOnly?:boolean,
    session?:boolean,
    expirationDate?:number,
    sameSite?:string
}