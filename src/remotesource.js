const axios = require("axios");
const debug = require('debug')('RemoteSource:RemoteSource');

class RemoteSource {
  constructor() {
    const config = this.readenv();
    this.REMOTEADD = config.REMOTEADD;
    this.REMOTEUSERNAME = config.REMOTEUSERNAME;
    this.REMOTEPASSWORD = config.REMOTEPASSWORD;
  }
  static async build () {
    
    // return new RemoteSource(config);
  }

  readenv() {
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
    return envcofig;
  }

  /**
   * read config from .env File
   *
   * @returns {object} config
   * */
  readConfig() {
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
  async getRemoteConfig(campaignId) {
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
}
module.exports = {
    RemoteSource: RemoteSource,
};
