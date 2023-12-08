//const {ipcRenderer: ipc} = require('electron-better-ipc');
import request from '@/utils/request'
// import {ipcRenderer as ipc} from 'electron-better-ipc'



export const getUsers = (params: any) =>
  request({
    url: '/users',
    method: 'get',
    params
  })

export const getUserInfo = () =>
(async () => {
  const result =await window.api.invoke("user:checklogin")
  console.log(result);
  return result;
})();
  // request({
  //   url: '/users/info',
  //   method: 'post',
  //   data
  // })

export const getUserByName = (username: string) =>
  request({
    url: `/users/${username}`,
    method: 'get'
  })

export const updateUser = (username: string, data: any) =>
  request({
    url: `/users/${username}`,
    method: 'put',
    data
  })

// export const deleteUser = (username: string) =>
//   request({
//     url: `/users/${username}`,
//     method: 'delete'
//   })

export const login = (data: any) =>
// (async () => {
// 	const result = await ipc.callMain('user-login', data);
// 	console.log(result);
// })();
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

export const logout = () =>
  request({
    url: '/users/logout',
    method: 'post'
  })

// export const register = (data: any) =>
//   request({
//     url: '/users/register',
//     method: 'post',
//     data
//   })
