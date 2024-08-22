import { ipcMain } from 'electron';
import {CHECKALLPROXY,CHECKALLPROXYMESSAGE,} from "@/config/channellist";
import { ProxyApi } from '@/modules/proxy_api'
import { ProxyParseItem } from '@/entityTypes/proxyType'
import { ProxyController } from '@/controller/proxy-controller'
import { CommonMessage,NumProcessdata } from "@/entityTypes/commonType"

export function registeProxyIpcHandlers() {
    
    ipcMain.on(CHECKALLPROXY, async (event, data) => {
        const proxyCon = new ProxyController()
        await proxyCon.checkAllproxy(function(num, total) {
            const messageData: CommonMessage<NumProcessdata> = {
                status: true,
                msg: "success",
                data: {
                    num: num,
                    total: total
                }
            }
            event.sender.send(CHECKALLPROXYMESSAGE, JSON.stringify(messageData))
        })
    })

    ipcMain.handle("proxy:detail", async (event, data) => {
        const qdata = JSON.parse(data);
        if (!("id" in qdata)) {
          return {
            status: false,
            msg: "id not found",
          };
        }
    
        const proxyModule = new ProxyApi()
        const resp = await proxyModule.getProxyDetail(qdata.id).then(function (res) {
          return res;
        }).catch(function (err) {
          console.log(err);
          if (err instanceof Error) {
            return {
              status: false,
              msg: err.message,
            };
          } else {
            return {
              status: false,
              msg: "unknow error",
            };
          }
        })
        return resp
      })
      ipcMain.handle("proxy:save", async (event, data) => {
        const qdata = JSON.parse(data);
        const proxyModule = new ProxyApi()
        const pres = await proxyModule.saveProxy(qdata).then(function (res) {
          return res;
        }).catch(function (err) {
          console.log(err);
          if (err instanceof Error) {
            return {
              status: false,
              msg: err.message,
            };
          } else {
            return {
              status: false,
              msg: "unknow error",
            };
          }
        })
        return pres
      })
      //check proxy
      ipcMain.handle("proxy:check", async (event, data) => {
        const qdata = JSON.parse(data) as ProxyParseItem;
        
        const proxyCon = new ProxyController()
        const res=await proxyCon.checkProxy(qdata).catch(function (err) {
          return {status:false,msg:err.message,data:false};
        })
        return res
      })
      //import proxy
      ipcMain.handle("proxy:import", async (event, data) => {
        const qdata = JSON.parse(data) as Array<ProxyParseItem>;
        const proxyModel=new ProxyApi()
        const res=await proxyModel.importProxy(qdata).catch(function (err) {
          return {status:false,msg:err.message,data:false};
        })
        return res
      })
       //get proxy list
  ipcMain.handle("proxy:list", async (event, data) => {
    const qdata = JSON.parse(data);
    if (!("page" in qdata)) {
      qdata.page = 0;
    }
    if (!("size" in qdata)) {
      qdata.size = 10;
    }
    if (!("search" in qdata)) {
      qdata.search = "";
    }
    const proxyCon = new ProxyController()
    const res = await proxyCon.getProxylist(qdata.page, qdata.size, qdata.search).then(function (res) {
    return res
    }).catch(function (err) {
      console.log(err);
      if (err instanceof Error) {
        return {
          status: false,
          msg: err.message,
        };
      } else {
        return {
          status: false,
          msg: "unknow error",
        };
      }
    })
    return res
  })
  ipcMain.handle("proxy:delete", async (event, data) => {
    const qdata = JSON.parse(data);
    if (!("id" in qdata)) {
      return {
        status: false,
        msg: "id not found",
      };
    }

    const proxyModule = new ProxyApi()
    const resp = await proxyModule.deleteProxy(qdata.id).then(function (res) {
      return res;
    }).catch(function (err) {
      console.log(err);
      if (err instanceof Error) {
        return {
          status: false,
          msg: err.message,
        };
      } else {
        return {
          status: false,
          msg: "unknow error",
        };
      }
    })


    return resp
  })

}