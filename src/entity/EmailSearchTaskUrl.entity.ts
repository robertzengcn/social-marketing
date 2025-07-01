import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import AuditableEntity from "@/entity/Auditable.entity";
import { EmailSearchTaskEntity } from "./EmailSearchTask.entity";

@Entity("emailsearch_task_url")
export class EmailSearchTaskUrlEntity extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("integer", { nullable: false })
    email_search_task_id: number;
    
    @Column("text", { nullable: false })
    url: string;
    
    @Column("text", { nullable: true })
    title: string;
    
    @Column("text", { nullable: true })
    description: string;
    
    @Column("integer", { nullable: true, default: 0 })
    status: number; // 0: pending, 1: processing, 2: completed, 3: failed
    
    @Column("text", { nullable: true })
    error_message: string;
    
    @Column("integer", { nullable: true })
    retry_count: number;
    
    @Column("datetime", { nullable: true })
    processed_at: Date;
    
    @ManyToOne(() => EmailSearchTaskEntity, task => task.urls)
    @JoinColumn({ name: "email_search_task_id" })
    emailSearchTask: EmailSearchTaskEntity;
} 