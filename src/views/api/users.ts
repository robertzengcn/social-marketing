'use strict';
export {};
//const {ipcRenderer: ipc} = require('electron-better-ipc');
// import request from '@/views/utils/request'
// import {ipcRenderer as ipc} from 'electron-better-ipc'
import {Iresponse} from '@/views/api/types'
import {windowInvoke} from '@/views/utils/apirequest'

// export const getUsers = (params: any) =>
//   request({
//     url: '/users',
//     method: 'get',
//     params
//   })

export const getUserInfo = () =>
(async () => {
  const result:Iresponse =await window.api.invoke("user:checklogin")
  // console.log(result);
  return result as Iresponse;
})();
  
export const login = (data: any) =>
(async () => {
  const result =await window.api.invoke("user:Login", data)
  console.log(result);
  return result;
})();
  // request({
  //   url: '/user/login',
  //   method: 'post',
  //   data
  // })

export const Signout = async() =>
await windowInvoke("user:Signout")
  // request({
  //   url: '/users/logout',
  //   method: 'post'
  // })

// export const register = (data: any) =>
//   request({
//     url: '/users/register',
//     method: 'post',
//     data
//   })
