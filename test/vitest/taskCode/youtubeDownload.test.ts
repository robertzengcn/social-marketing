'use strict';
import { expect, test } from 'vitest'
import {YoutubeDownload} from '@/modules/videodownload/youtubeDownload'


test('get-youtube-url', async function () {
    const youtubeDownload=new YoutubeDownload()
    const url="https://www.youtube.com/watch?v=eaFaD_IBYW4&list=PLeo1K3hjS3us_ELKYSj_Fth2tIEkdKXvV&index=2"
    const result=await youtubeDownload.getPlaylist(url)
    expect(result).toBeInstanceOf(Array)
    expect(result?.length).toBeGreaterThan(0)

},500000)