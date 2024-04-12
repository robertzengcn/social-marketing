const request = require('request');
const Agent = require('socks5-http-client/lib/Agent');
const Agents = require('socks5-https-client/lib/Agent');

var checkProxy = function (protocol, id, ip, port, url, user, pass, callback) {
    if (protocol == "http") {
        var proxyRequest = request.defaults({
            agentClass: Agent,
            agentOptions: {
                socksHost: ip,
                socksPort: port,
                socksUsername: user,
                socksPassword: pass
            }
        });

        proxyRequest({ url: url, timeout: 120000 }, function (err, res) {
            var testText = 'content="Brum Brum ..."';
            if (err) {

                callback(id, ip, port, false, -1, err);
            } else if (res.statusCode != 200) {
                callback(id, ip, port, false, res.statusCode, err);
            } else if (!res.body) {
                callback(id, ip, port, false, res.statusCode, "regex problem" + options.regex + ".");
            } else {
                callback(id, ip, port, true, res.statusCode);
            }

        });
    } else if (protocol == "https") {


    } else {
        throw new Error("protocol is not valid");
    }
}
