import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from "typeorm";
import AuditableEntity from "@/entity/Auditable.entity";
import { OutreachTaskEntity } from "./OutreachTask.entity";
import { ScrapingLogStatus } from "@/entityTypes/outreach.enums";

@Entity("scraping_log")
@Index(["url"])
@Index(["status"])
export class ScrapingLogEntity extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    url: string;

    @Column("integer", { default: ScrapingLogStatus.SUCCESS })
    status: ScrapingLogStatus;

    @Column("text", { nullable: true })
    error_message: string;

    @Column("integer", { default: 0 })
    pages_processed: number;

    @Column("integer", { default: 0 })
    emails_found: number;

    @Column("integer")
    task_id: number;

    @ManyToOne(() => OutreachTaskEntity, task => task.scraping_logs, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "task_id" })
    task: OutreachTaskEntity;
}
