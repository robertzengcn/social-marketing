import {Proxy} from "@/entity-types/proxy-type";
export type SocialAccountResponse = {
    status: string,
    msg: string,
    data: {
        total: number,
        records?:SocialAccountListData[]
    },
}
export type SocialAccountListData={
    id: number,
    social_type: string,
    social_type_id: number,
    user: string,
    pass:string,
    status: number,
}
export type SocialAccountDetailData={
    id: number,
    social_type: string,
    social_type_id: number,
    user: string,
    pass:string,
    status: number,
    name: string,
    phone: string,
    email: string, 
    proxy: Proxy 
}
