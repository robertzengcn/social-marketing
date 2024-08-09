import { ipcMain } from 'electron';
import {SEARCHSCRAPERAPI,LISTSESARCHRESUT,SEARCHEVENT} from '@/config/channellist'
import { CommonDialogMsg } from "@/entityTypes/commonType";
import {Usersearchdata,SearchtaskItem } from "@/entityTypes/searchControlType"
import {SearchController} from "@/controller/searchController"
import {CommonResponse} from "@/entityTypes/commonType"
export function registerSearchIpcHandlers() {
    ipcMain.handle(SEARCHSCRAPERAPI, async (event, arg) => {
        //handle search event
        const qdata = JSON.parse(arg) as Usersearchdata;
        if (!("searchEnginer" in qdata)) {
            const comMsgs: CommonDialogMsg = {
                status: false,
                code: 20240705103811,
                data: {
                    action:"",
                    title: "search.scraper_failed",
                    content: "search.search_enginer_empty"
                }
            }
            event.sender.send(SEARCHEVENT, JSON.stringify(comMsgs))
            return comMsgs
        }
        if (!("keywords" in qdata)) {
            const comMsgs: CommonDialogMsg = {
                status: false,
                code: 20240705104323,
                data: {
                    action:"",
                    title: "search.scraper_failed",
                    content: "search.search_enginer_empty"
                }
            }
            event.sender.send(SEARCHEVENT, JSON.stringify(comMsgs))
            return comMsgs
        }
        const searchcon=new SearchController()
        await searchcon.searchData(qdata)
        const comMsgs: CommonDialogMsg = {
            status: true,
            code: 0,
            data:{
                action:"search_task _start",
                title:"",
                content:"" 
            }
        }
        event.sender.send(SEARCHEVENT, JSON.stringify(comMsgs))
        //return comMsgs
    })
    ipcMain.handle(LISTSESARCHRESUT, async (event, data) => {
        //console.log("handle campaign:list")
        const searchControl = new SearchController()
        const res=searchControl.listSearchresult()
        const resp:CommonResponse<SearchtaskItem>={
            status:true,
            msg:"",
            data:{
                records: res.records,
                num: res.total
            }
        }
        return resp
        // return res as CommonResponse<SearchtaskEntityNum>;
      });
}