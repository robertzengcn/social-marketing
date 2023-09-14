'use strict';
import {Videoedit} from '../../src/modules/videoedit';
const appRoot = require('app-root-path');

describe('Module Watermark', function(){

    it('remove-watermark', function(){
        const originvideo='';
        const outputvideo='';
        const videoedit = new Videoedit();
        videoedit.removeWatermark(originvideo,outputvideo);
    });
});