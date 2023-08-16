"use strict";
export {};
import { google } from "googleapis";
const service = google.youtube('v3');
const fs = require('fs');
//upload video to youtube
export const uploadVideo = (auth,title,description) => {
    service.videos.insert(
        {
            auth: auth,
            part: ['snippet,contentDetails,status'],
            requestBody: {
                // Video title and description
                snippet: {
                    title: title,
                    description:description
                },
                // I set to private for tests
                status: {
                    privacyStatus: 'private'
                }
            },

            // Create the readable stream to upload the video
            media: {
                body: fs.createReadStream('video.flv') // Change here to your real video
            }
        },
        (error, data) => {
            if (error) {
                throw new Error(error.message);
            }
            console.log('https://www.youtube.com/watch?v=' + data.data.id);
            return data.data.id;
        }
    );
};


module.exports = { uploadVideo };