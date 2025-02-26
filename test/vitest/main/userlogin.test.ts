'use strict';
import { userController,userlogin } from '@/controller/user-controller';
import {  test } from 'vitest'

test('user-login', async function () {
    const userCon=new userController()
    const data:userlogin={
        user:'test@test.com',
        pass:'testlala123'
    }

    await userCon.login(data)
},500000)