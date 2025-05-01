import { Entity, Column, ManyToOne, JoinColumn } from "typeorm"
import AuditableEntity from "@/entity/Auditable.entity"
import { VideoDownloadEntity } from "@/entity/VideoDownload.entity"

export enum PublishPlatform {
    YOUTUBE = "youtube",
    TIKTOK = "tiktok",
    INSTAGRAM = "instagram",
    FACEBOOK = "facebook",
    TWITTER = "twitter"
}

export enum PublishStatus {
    PENDING = 0,
    PUBLISHED = 1,
    FAILED = 2
}

@Entity("video_publish_record")
export class VideoPublishRecordEntity extends AuditableEntity {
    @Column("integer")
    video_download_id: number;

    @Column({
        type: "enum",
        enum: PublishPlatform,
        default: PublishPlatform.YOUTUBE
    })
    platform: PublishPlatform;

    @Column({
        type: "enum",
        enum: PublishStatus,
        default: PublishStatus.PENDING
    })
    status: PublishStatus;

    @Column("text", { nullable: true })
    platform_video_id: string | null;

    @Column("text", { nullable: true })
    platform_video_url: string | null;

    @Column("text", { nullable: true })
    error_message: string | null;

    @Column("jsonb", { nullable: true })
    platform_metadata: Record<string, any> | null;

    @ManyToOne(() => VideoDownloadEntity)
    @JoinColumn({ name: "video_download_id" })
    video_download: VideoDownloadEntity;
} 