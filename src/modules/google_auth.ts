"use strict";
export {};
const fs = require('fs');
const { google } = require('googleapis');
const readline = require('readline');
const OAuth2 = google.auth.OAuth2;

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/upload_app_session.json
const SCOPES = [
    'https://www.googleapis.com/auth/youtube.upload',
    'https://www.googleapis.com/auth/youtube.readonly'
];
const TOKEN_DIR =
    (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) +
    '/.credentials/';
const TOKEN_PATH = TOKEN_DIR + 'upload_app_session.json';

export interface credentials {
    installed: Installed
  }
  
export interface Installed {
    client_id: string
    project_id: string
    auth_uri: string
    token_uri: string
    auth_provider_x509_cert_url: string
    client_secret: string
    redirect_uris: string[]
  }
export const authorize = (credentials:credentials) => {
    const clientSecret = credentials.installed.client_secret;
    const clientId = credentials.installed.client_id;
    const redirectUrl = credentials.installed.redirect_uris[0];
    const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (error, token) => {
        if (error) {
            return getNewToken(oauth2Client);
        } else {
            oauth2Client.credentials = JSON.parse(token);
            return oauth2Client;
        }
    });
};
export const cb=(error) => {console.log(error)}

const getNewToken = (oauth2Client) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter the code from that page here: ', code => {
        rl.close();
        oauth2Client.getToken(code, (error, token) => {
            if (error) {
                    throw new Error(
                        'Error while trying to retrieve access token'
                    )  
            }
            oauth2Client.credentials = token;
            storeToken(token);
            return oauth2Client;
        });
    });
};

const storeToken = token => {
    try {
        fs.mkdirSync(TOKEN_DIR);
    } catch (error) {
        if (error.code != 'EEXIST') {
            throw error;
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), error => {
        if (error) throw error;
        console.log('Token stored to ' + TOKEN_PATH);
    });
};

// module.exports = { authorize };