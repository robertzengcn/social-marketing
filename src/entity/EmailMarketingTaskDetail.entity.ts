import { Entity, Column,PrimaryGeneratedColumn } from "typeorm";
import AuditableEntity from "@/entity/Auditable.entity";

@Entity("emailmarketing_task_detail")
export class EmailMarketingTaskDetailEntity extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column("integer")
    task_id: number;
    
    @Column("text", { nullable: true })
    smtp_host: string;
    
    @Column("integer", { nullable: true })
    smtp_port: number;
    
    @Column("text", { nullable: true })
    smtp_user: string;
    
    @Column("text", { nullable: true })
    smtp_pwd: string;
    
    @Column("text", { nullable: true })
    email_title: string;
    
    @Column("text", { nullable: true })
    email_content: string;
}