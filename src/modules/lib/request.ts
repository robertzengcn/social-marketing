import axios from 'axios'
import {Token} from "@/modules/token"
// import { Message, MessageBox } from 'element-ui'
// import { UserModule } from '@/store/modules/user'


const service = axios.create({
  baseURL: import.meta.env.VITE_REMOTEADD, // url = base url + request url
  timeout: 5000,
  //adapter: require('axios/lib/adapters/http'),
  // withCredentials: true // send cookies when cross-domain requests
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    //console.log("get token...")
    const tokenModel=new Token()
    const tokenval=tokenModel.getValue("social-market-token")
    // Add X-Access-Token header to every request, you can add other custom headers here
    if (tokenval) {
      config.headers.Authorization = 'Bearer ' + tokenval
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    // Some example codes here:
    // code == 20000: success
    // code == 50001: invalid access token
    // code == 50002: already login in other place
    // code == 50003: access token expired
    // code == 50004: invalid user (user not exist)
    // code == 50005: username or password is incorrect
    // You can change this part for your own usage.
    if(response.status!=200){
      throw new Error("response status not equal 200, code is "+response.status.toString())
    }
    const res = response.data
    if (!res.status) {
      console.log(res.msg)
      console.log(res.code)
      // Message({
      //   message: res.message || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // alert('你已被登出，可以取消继续留在该页面，或者重新登录');
        // MessageBox.confirm(
        //   '你已被登出，可以取消继续留在该页面，或者重新登录',
        //   '确定登出',
        //   {
        //     confirmButtonText: '重新登录',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        //   }
        // ).then(() => {
        //   UserModule.ResetToken()
        //   location.reload() // To prevent bugs from vue-router
        // })
      // }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      // console.log("res is")
      // console.log(res)
      return response
    }
  },
  (error) => {
    console.log(error.message);
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
