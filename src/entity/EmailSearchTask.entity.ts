import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import AuditableEntity from "@/entity/Auditable.entity";

@Entity("emailsearch_task")
export class EmailSearchTaskEntity extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("text", { nullable: true })
    task_name: string;
    
    @Column("integer", { nullable: true })
    type_id: number;
    
    @Column("text", { nullable: true })
    record_time: string;

    @Column("text", { nullable: true })
    runtime_log: string;

    @Column("text", { nullable: true })
    error_log: string;
    
    @Column("integer", { nullable: true })
    status: number;
}