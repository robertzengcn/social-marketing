export type HttpClientOptions = {
    headers?:HeadersInit;
}
// export type FetchOptions = {
//     headers?: HeadersInit;
// }
import { AuthInterceptor } from '@/modules/lib/authInterceptor';
export class HttpClient {
    private _headers: HeadersInit = {};
    constructor() {
      AuthInterceptor()
    }
  
    public async _fetchJSON(endpoint, options:RequestInit): Promise<Response> {

      const res = await fetch(endpoint,options
       );
  
      if (!res.ok) throw new Error(res.statusText);
  
    //   if (options.parseResponse !== false && res.status !== 204)
    //     return res.json();
  
      return res;
    }
  
    setHeader(key, value) {
      this._headers[key] = value;
      return this;
    }
  
    getHeader(key) {
      return this._headers[key];
    }
  
    setBasicAuth(username, password) {
      this._headers['Authorization'] = `Basic ${btoa(`${username}:${password}`)}`;
      return this;
    }
  
    setBearerAuth(token) {
      this._headers['Authorization'] = `Bearer ${token}`;
      return this;
    }
  
    public async get(endpoint, params = {}, options = {}): Promise<Response> {
      const body = new URLSearchParams(params).toString();  
      return this._fetchJSON(endpoint, {
        ...options,
        body,
        method: "GET",
        headers: this._headers,
      });
    }
  
    public async post(endpoint, formData, options = {}): Promise<Response>{
        const body=new URLSearchParams(formData)
        return this._fetchJSON(endpoint, {
        ...options,
        headers: this._headers,
        body: body,
        method: "POST"
      });
    }
  
    public async put(endpoint, data): Promise<Response> {
        return this._fetchJSON(endpoint, {
        headers: this._headers,
        body: data ? JSON.stringify(data) : undefined,
        method: "PUT"
      });
    }
  
    public async patch(endpoint, operations, options = {}): Promise<Response> {
      return this._fetchJSON(endpoint, {
        ...options,
        body: JSON.stringify(operations),
        method: "PATCH",
        headers: this._headers,
      });
    }
  
    public async delete(endpoint, options = {}) {
      return this._fetchJSON(endpoint, {
        ...options,
        method: "DELETE",
        headers: this._headers,
      });
    }
  }
  
  export default HttpClient;