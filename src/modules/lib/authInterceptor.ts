import fetchIntercept from 'fetch-intercept';
import {Token} from "@/modules/token"

export const AuthInterceptor = () => {
  fetchIntercept.register({
    request: function (url, config) {
      // Modify the url or config here
      url=import.meta.env.VITE_REMOTEADD+url
      const tokenModel=new Token()
    const tokenval=tokenModel.getValue("social-market-token")
    // Add X-Access-Token header to every request, you can add other custom headers here
    if (tokenval) {
      config.headers.Authorization = 'Bearer ' + tokenval
    }
      return [url, config];
    },

    requestError: function (error) {
      // Called when an error occured during another 'request' interceptor call
      return Promise.reject(error);
    },

    response: function (response) {
      // Modify the reponse object
      return response;
    },

    responseError: function (error) {
      // Handle an fetch error
      return Promise.reject(error);
    },
  });
};