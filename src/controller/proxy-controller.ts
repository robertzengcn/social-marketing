// import * as path from "path"
// import * as fs from "fs"
import Papa from 'papaparse';
import fetch from 'node-fetch';
import { fetch as undicifetch } from "undici";
import { HttpsProxyAgent } from 'https-proxy-agent';
import { ProxyParseItem, ProxyCheckres } from "@/entityTypes/proxyType"
// import * as url from 'url';
import { socksDispatcher } from "fetch-socks";
export class ProxyController {
    //import proxy from csv file
    // public async importProxyfile(filename: string) {
    //     //check filename is csv and exist
    //     if (!(path.extname(filename) === '.csv')) {
    //         throw new Error('File is not a csv');
    //     }
    //     fs.access(filename, fs.constants.F_OK, async (err) => {
    //         if (err) {
    //             throw new Error('File does not exist');
    //         } else {

    //         }
    //     });


    //     //return proxy list
    //     const response = await fetch(filename);
    //     return response;
    // }
    //handle csv file
    public async handleCsvdata(filename: string) {
        const response = await fetch(filename);
        const csvData = await response.text();
        const results = Papa.parse(csvData, { header: true });
        return results.data;
    }
    //convert proxy entity to url
    public proxyEntityToUrl(proxyEntity: ProxyParseItem): string{
        if (!proxyEntity.protocol) {
            throw new Error("protocol is required");
        }
        if (!proxyEntity.host) {
            throw new Error("host is required");
        }
        if (!proxyEntity.port) {
            throw new Error("port is required");
        }
        let proxyUrl = "";
        if (proxyEntity.protocol.includes('http')) {
            if ((proxyEntity.user && (proxyEntity.user?.length > 0)) && (proxyEntity.pass && (proxyEntity.pass?.length > 0))) {
                proxyUrl = `${proxyEntity.protocol}://${proxyEntity.user}:${proxyEntity.pass}@${proxyEntity.host}:${proxyEntity.port}`;
            } else {
                proxyUrl = `${proxyEntity.protocol}://${proxyEntity.host}:${proxyEntity.port}`;
            }
        } else if (proxyEntity.protocol.includes('socks')) {
            // let socketType:4|5=5
            // if(proxyEntity.protocol.includes('4')){
            //     let socketType=4
            // }
            proxyUrl = `${proxyEntity.protocol}://${proxyEntity.host}:${proxyEntity.port}`;
        } else {
            throw new Error("protocol is not valid");
        }
        return proxyUrl;
    }
    //check proxy valid
    public async checkProxy(proxyEntity: ProxyParseItem): Promise<ProxyCheckres> {
        try {

            let proxyUrl = "";
            if (!proxyEntity.protocol) {
                throw new Error("protocol is required");
            }

            if (proxyEntity.protocol.includes('http')) {
                if ((proxyEntity.user && (proxyEntity.user?.length > 0)) && (proxyEntity.pass && (proxyEntity.pass?.length > 0))) {
                    proxyUrl = `${proxyEntity.protocol}://${proxyEntity.user}:${proxyEntity.pass}@${proxyEntity.host}:${proxyEntity.port}`;
                } else {
                    proxyUrl = `${proxyEntity.protocol}://${proxyEntity.host}:${proxyEntity.port}`;
                }
                const agent = new HttpsProxyAgent(proxyUrl);
                const res = await fetch('https://ident.me/ip', { agent: agent ,signal: AbortSignal.timeout( 2000 ),});

                if (res.status == 200) {
                    console.log(res.status);
                    return { status: true, msg: "", data: true };
                }
                console.log("status is" + res.status.toString());
                return { status: false, msg: "proxy check failure, status code" + res.status.toString(), data: false };
                // console.log('Proxy is valid');
            } else if (proxyEntity.protocol.includes('socks')) {
                let socketType:4|5=5
                if(proxyEntity.protocol.includes('4')){
                    socketType=4
                }
                // console.log(proxyEntity.host)
                // console.log(proxyEntity.port)
                const dispatcher = socksDispatcher({
                    type: socketType,
                    host: proxyEntity.host,
                    port: parseInt(proxyEntity.port),
                    userId: proxyEntity.user,
                    password: proxyEntity.pass,
                });
                const res = await undicifetch("https://ident.me/ip", { dispatcher });
                if (res.status == 200) {
                    console.log(res.status);
                    return { status: true, msg: "", data: true };
                }
                console.log("status is" + res.status.toString());
                return { status: false, msg: "proxy check failure, status code" + res.status.toString(), data: false };
            } else {
                throw new Error("protocol is not valid");
            }
        } catch (error) {
            // console.log('Proxy is not valid');
            let message=""
            if(error instanceof Error){
                message=error.message
            }
            throw new Error('Proxy is not valid,'+message);             
        }
    }

}