import { ipcMain } from 'electron';
import {SEARCHSCRAPERAPI} from '@/config/channellist'
import { CommonDialogMsg } from "@/entityTypes/commonType";
import { SearchResponse,Usersearchdata } from "@/entityTypes/searchControlType"
import {SearchController} from "@/controller/searchController"
export function registerSearchIpcHandlers() {
    ipcMain.on(SEARCHSCRAPERAPI, async (event, arg) => {
        //handle search event
        const qdata = JSON.parse(arg) as Usersearchdata;
        if (!("searchEnginer" in qdata)) {
            const comMsgs: CommonDialogMsg = {
                status: false,
                code: 20240705103811,
                data: {
                    title: "search.scraper_failed",
                    content: "search.search_enginer_empty"
                }
            }
            event.sender.send(SEARCHSCRAPERAPI, comMsgs)
            return
        }
        if (!("keywords" in qdata)) {
            const comMsgs: CommonDialogMsg = {
                status: false,
                code: 20240705104323,
                data: {
                    title: "search.scraper_failed",
                    content: "search.search_enginer_empty"
                }
            }
            event.sender.send(SEARCHSCRAPERAPI, comMsgs)
            return
        }
        const searchcon=new SearchController()
        await searchcon.searchData(qdata)
    })
}