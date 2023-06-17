export { };
const axios = require("axios");
const debug = require('debug')('RemoteSource:RemoteSource');
type sosetting = {
  sotype: string;
  socialuser: string;
  socialpass: string;
  proxy: {
    proxy: string;
    user: string;
    pass: string;
  },
}
type socialTask = {
  id: string,
  campaign_id: string,
  campaign_name: string,
  tag: string,
  type: string,
  keywords: Array<string>,
}
type configType={
  REMOTEADD: string,
  REMOTEUSERNAME: string,
  REMOTEPASSWORD:string,
}
class RemoteSource {
  REMOTEADD: string;
  REMOTEUSERNAME: string;
  REMOTEPASSWORD: string;
  constructor() {
    const config = this.readenv();
    this.REMOTEADD = config.REMOTEADD;
    this.REMOTEUSERNAME = config.REMOTEUSERNAME;
    this.REMOTEPASSWORD = config.REMOTEPASSWORD;
  }


  readenv():configType {
    //read config from .env file
    let envcofig = this.readConfig();
    debug(envcofig)
    //check key exist in object
    if (!envcofig.hasOwnProperty("REMOTEADD")) {
      throw new Error(`REMOTEADD not found in .env file`);
    }
    if (!envcofig.hasOwnProperty("REMOTEUSERNAME")) {
      throw new Error(`USERNAME not found in .env file`);
    }
    if (!envcofig.hasOwnProperty("REMOTEPASSWORD")) {
      throw new Error(`PASSWORD not found in .env file`);
    }
    return envcofig as configType;
  }

  /**
   * read config from .env File
   *
   * @returns {object} config
   * */
  readConfig(): object {
    const result = require("dotenv").config();
    if (result.error) {
      throw result.error;
    }
    return result.parsed;
  }

  /**
   * get response from remote servive
   * @return object
   */
  async getRemoteConfig(campaignId): Promise<sosetting> {
    // let envconfig = await readenv();

    let sosetvar = await axios
      .get(this.REMOTEADD + "/api/getsobyCam/?campaign_id=" + campaignId, {
        auth: {
          username: this.REMOTEUSERNAME,
          password: this.REMOTEPASSWORD,
        },
      })
      .then(function (res) {
        if (parseInt(res.status) != 200) {
          throw new Error("code not equal 200");
        }
        if (!res.data.status) {
          throw new Error("code not equal 200");
        }
        // console.log(res.status)
        // console.log(res.data.data.user)
        // console.log(res.data.data.pass)
        // console.log(res.data.data.proxy)
        const sosetting = {
          sotype: res.data.data.sotype,
          socialuser: res.data.data.user,
          socialpass: res.data.data.pass,
          proxy: {
            proxy: res.data.data.proxy.url,
            user: res.data.data.proxy.user,
            pass: res.data.data.proxy.pass,
          },
        };
        return sosetting;
      })
      .catch(function (error) {
        console.error(error);
      });

    return sosetvar;
  }

  /**
   * get campaign from remote servive
   */
  async getCampaignlist(): Promise<Array<socialTask>> {
    const campignlist = await axios
      .get(this.REMOTEADD + "/api/listsotask", {
        auth: {
          username: this.REMOTEUSERNAME,
          password: this.REMOTEPASSWORD,
        },
      })
      .then(function (res) {
        if (parseInt(res.status) != 200) {
          throw new Error("code not equal 200");
        }
        if (!res.data.data) {
          throw new Error("data not exist");
        }
        return res.data.data as Array<socialTask>;
        
      })
      .catch(function (error) {
        throw new Error("code not equal 200");
        // console.error(error);
      });
    return campignlist;
  }
  async saveLinkremote({ data }) {
    axios.post(this.REMOTEADD + "/api/savelink", data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

module.exports = {
  RemoteSource: RemoteSource,
};
