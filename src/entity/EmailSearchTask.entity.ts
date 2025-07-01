import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import AuditableEntity from "@/entity/Auditable.entity";
import { EmailSearchTaskUrlEntity } from "@/entity/EmailSearchTaskUrl.entity";

@Entity("emailsearch_task")
export class EmailSearchTaskEntity extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("text", { nullable: true })
    task_name: string;
    
    @Column("integer", { nullable: true })
    type_id: number;

    @Column("integer", { nullable: true })
    concurrency: number;

    @Column("integer", { nullable: true })
    pagelength: number;

    @Column("boolean", { nullable: true })
    notShowBrowser: boolean;
    @Column("integer", { nullable: true })
    processTimeout: number;

    @Column("integer", { nullable: true })
    maxPageNumber: number;

    @Column("integer", { nullable: true })
    page_length: number;

    @Column("boolean", { nullable: true })
    is_active: boolean;
    
    @Column("text", { nullable: true })
    record_time: string;

    @Column("text", { nullable: true })
    runtime_log: string;

    @Column("text", { nullable: true })
    error_log: string;
    
    @Column("integer", { nullable: true })
    status: number;

    @OneToMany(() => EmailSearchTaskUrlEntity, url => url.emailSearchTask)
    urls: EmailSearchTaskUrlEntity[];
}