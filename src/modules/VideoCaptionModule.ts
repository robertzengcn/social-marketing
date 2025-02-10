
import { BaseModule } from "@/modules/baseModule";
import { VideoCaptiondb } from "@/model/VideoCaptiondb";
import { VideoCaptionEntity } from "@/entityTypes/videoType";
export class VideoCaptionModule extends BaseModule {
    private videoCaptiondb: VideoCaptiondb
    constructor() {
        super()
        this.videoCaptiondb = new VideoCaptiondb(this.dbpath)
    }
    create(videoCaption: VideoCaptionEntity): number {
        return this.videoCaptiondb.create(videoCaption);
    }

    read(id: number): VideoCaptionEntity | null {
       return this.videoCaptiondb.read(id);
    }

    update(id: number, videoCaption: VideoCaptionEntity) {
        return this.videoCaptiondb.update(id, videoCaption);
    }

    delete(id: number): void {
       this.videoCaptiondb.delete(id);
    }
    getCaptionByVid(vid: number): Array<VideoCaptionEntity> {
        return this.videoCaptiondb.getCaptionByVid(vid);
    }
    


}