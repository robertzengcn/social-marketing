'use strict';
import { HttpClient } from "@/modules/lib/httpclient"
const expect = require('expect.js');
describe('Module httpclient', function () {
    const httpclientModel = new HttpClient();
    it('test-send', async function () {
        const username = "test";
        const password = "test";
        const FormData = require('form-data');
        const data = new FormData();
        data.append('username', username);
        data.append('password', password);
        const res=await httpclientModel.post("/api/user/login", data)
        console.log(res)
        expect(res).to.be.an('object');
    })
});