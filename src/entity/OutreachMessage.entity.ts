import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import AuditableEntity from "@/entity/Auditable.entity";
import { OutContactEntity } from "./OutContact.entity";

@Entity("outreach_message")
export class OutreachMessageEntity extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    content: string;

    @Column("text", { nullable: true })
    ai_metadata: string; // JSON: { model: "gpt-4", tokens: 150, timestamp: 1234567890 }

    @Column("boolean", { default: false })
    user_edited: boolean;

    @Column("boolean", { default: false })
    reviewed: boolean;

    @Column("integer")
    contact_id: number;

    @OneToOne(() => OutContactEntity, contact => contact.message)
    @JoinColumn({ name: "contact_id" })
    contact: OutContactEntity;
}
