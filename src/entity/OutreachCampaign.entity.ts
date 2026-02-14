import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import AuditableEntity from "@/entity/Auditable.entity";
import { OutContactEntity } from "./OutContact.entity";
import { CampaignStatus } from "@/entityTypes/outreach.enums";

@Entity("outreach_campaign")
export class OutreachCampaignEntity extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    name: string;

    @Column("integer", { default: CampaignStatus.PREPARING })
    status: CampaignStatus;

    @Column("integer", { default: 0 })
    total_contacts: number;

    @Column("integer", { default: 0 })
    sent_count: number;

    @Column("integer", { default: 0 })
    failed_count: number;

    @Column("text", { nullable: true })
    error_log: string;

    @OneToMany(() => OutContactEntity, contact => contact.campaign, { onDelete: 'SET NULL' })
    contacts: OutContactEntity[];
}
