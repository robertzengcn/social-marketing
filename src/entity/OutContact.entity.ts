import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, Index } from "typeorm";
import AuditableEntity from "@/entity/Auditable.entity";
import { OutreachTaskEntity } from "./OutreachTask.entity";
import { OutreachCampaignEntity } from "./OutreachCampaign.entity";
import { OutreachMessageEntity } from "./OutreachMessage.entity";
import { ContactStatus } from "@/entityTypes/outreach.enums";

@Entity("out_contact")
@Index(["email"], { unique: true })
@Index(["source_url"])
@Index(["website_url"])
export class OutContactEntity extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    email: string;

    @Column("text", { nullable: true })
    website_url: string;

    @Column("text", { nullable: true })
    name: string;

    @Column("text")
    source_url: string;

    @Column("integer", { default: ContactStatus.PENDING })
    status: ContactStatus;

    @Column("integer")
    task_id: number;

    @Column("integer", { nullable: true })
    campaign_id: number;

    @ManyToOne(() => OutreachTaskEntity, task => task.contacts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "task_id" })
    task: OutreachTaskEntity;

    @ManyToOne(() => OutreachCampaignEntity, campaign => campaign.contacts, { onDelete: 'SET NULL' })
    @JoinColumn({ name: "campaign_id" })
    campaign: OutreachCampaignEntity;

    @OneToOne(() => OutreachMessageEntity, message => message.contact, { onDelete: 'CASCADE' })
    message: OutreachMessageEntity;
}
