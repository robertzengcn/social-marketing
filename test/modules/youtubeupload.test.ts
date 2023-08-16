'use strict';
import {authorize,cb,credentials} from '../../src/modules/google_auth';
import {uploadVideo} from '../../src/modules/youtube_upload';
const appRoot = require('app-root-path');
import * as path from "path";
const fs = require('fs');

describe('Module Youtubeupload', function(){
    //test google auth
    it('google-auth', function(){
        const client_secret_file:string=path.resolve(appRoot+"/tmp/test/client_secret.json");
        fs.readFile(client_secret_file, (error, content) => {
            if (error) {
                console.log('Error loading client secret file: ' + error);
                return cb(error);
            }
            // Authorize a client with the loaded credentials
            authorize(JSON.parse(content) as credentials);
        });
    });
    //test youtube upload video
    it('youtube-upload', function(){
        uploadVideo(authorize(JSON.parse(fs.readFileSync(path.resolve(appRoot+"/tmp/test/client_secret.json")) as any)));
    });
});