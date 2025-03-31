import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import AuditableEntity from "@/entity/Auditable.entity";

@Entity("search_task")
export class SearchTaskEntity extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("text", { nullable: true })
    task_name: string;
    
    @Column("text", { nullable: true })
    record_time: string;
    
    @Column("integer", { nullable: true })
    status: number;
}