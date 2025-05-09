import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import AuditableEntity from "@/entity/Auditable.entity";

@Entity("search_task")
export class SearchTaskEntity extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text", { nullable: true })
    enginer_id: string;
    
    @Column("text", { nullable: true })
    error_log: string;
    @Column("text", { nullable: true })
    runtime_log: string;    
    
    @Column("text", { nullable: true })
    record_time: string;
    
    @Column("integer", { nullable: true })
    status: number;
}