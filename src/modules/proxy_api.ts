export { };
import { HttpClient } from "@/modules/lib/httpclient";
import { ProxylistResp, ProxyEntity,SaveProxyResp,ProxyParseItem,ImportProxyResp } from "@/entity-types/proxy-type";
export class ProxyApi {
  private _httpClient: HttpClient;
  constructor() {
    this._httpClient = new HttpClient();
  }
  //get proxy list
  public async getProxylist(page: number,
    size: number,
    search: string): Promise<ProxylistResp> {
    const searchParams: Record<string, any> = new URLSearchParams();
    searchParams.append("page", page);
    searchParams.append("size", size);

    if (search.length > 0) {
      searchParams.append("search", search);
    }
    // const params = new URLSearchParams({page: page, pagesize: "100"}).toString();
    const paramstring = searchParams.toString();
    // const finalurl='/api/campaign?'+paramstring;
    const finalurl = "/api/proxy/list?" + paramstring;

    const proxylistres = await this._httpClient.get(finalurl);
    if (!proxylistres) {
      throw new Error("remote return empty");
    }
    // console.log("campaign list is following")
    // console.log(campignlistres.data)
    const resp: ProxylistResp = {
      status: proxylistres.status,
      msg: proxylistres.msg,
      data: proxylistres.data,
    };
    return resp;
  }
  //delete proxy from api
  public async deleteProxy(id: number): Promise<any> {

    const searchParams: Record<string, any> = new URLSearchParams();
    searchParams.append("id", id);
    const paramstring = searchParams.toString();
    const finalurl = "/api/proxy/delete?" + paramstring;
    const resp = await this._httpClient.delete(finalurl);
    if (!resp) {
      throw new Error("remote return empty");
    }
    return resp;
  }
  //get proxy detail from api
  public async getProxyDetail(id: number): Promise<any> {
    const searchParams: Record<string, any> = new URLSearchParams();
    searchParams.append("id", id);
    const paramstring = searchParams.toString();
    const finalurl = "/api/proxy?" + paramstring;

    const resp = await this._httpClient.get(finalurl, { id: id });
    if (!resp) {
      throw new Error("remote return empty");
    }
    return resp;
  }
  //save proxy
  public async saveProxy(entity: ProxyEntity): Promise<SaveProxyResp> {
    let data = new FormData();
    if (entity.id) {
      data.append("Id", entity.id.toString());
    }
    if (entity.host) {
      data.append("Host", entity.host);
    }
    if (entity.port) {
      data.append("Port", entity.port);
    }
    if (entity.user) {
      data.append("User", entity.user);
    }
    if (entity.pass) {
      data.append("Pass", entity.pass);
    }
    if (entity.protocol) {
      data.append("Protocol", entity.protocol);
    }
    if (entity.country_code) {
      data.append("CountryCode", entity.country_code);
    }

    const resp = await this._httpClient.post("/api/proxy/save", data);
    if (!resp) {
      throw new Error("remote return empty");
    }
    return resp;
  }
  //import proxy list into server
  public async importProxy(data: Array<ProxyParseItem>): Promise<ImportProxyResp> {
    const resp = await this._httpClient.postJson("/api/proxy/import", data);
    if (!resp) {
      throw new Error("remote return empty");
    }
    return resp as ImportProxyResp;
  }
}