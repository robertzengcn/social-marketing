import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import AuditableEntity from "@/entity/Auditable.entity"
import { VideoDownloadEntity } from "@/entity/VideoDownload.entity" // Adjust if your video entity has a different name

@Entity("video_download_tag")
export class VideoDownloadTagEntity extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("integer")
    video_id: number;

    @Column("text")
    tag: string;

    @Column("text", { nullable: true, default: "en" })
    language: string;

    @ManyToOne(() => VideoDownloadEntity)
    @JoinColumn({ name: "video_id" })
    video: VideoDownloadEntity;
}
