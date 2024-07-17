'use strict';
import { expect, test } from 'vitest'
import {UserSearch} from "@/modules/userSearch"
import {Usersearchdata } from "@/entityTypes/searchControlType"

test('user-search', async function () {
    const userSearchdata:Usersearchdata={
        searchEnginer:1,
        keywords:['Williams','doctor'],
        notShowBrowser:false,
        num_pages:1,
        concurrency:1,
    }
    //user search test
    const userSer=new UserSearch()
    await userSer.searchData(userSearchdata)
},500000)