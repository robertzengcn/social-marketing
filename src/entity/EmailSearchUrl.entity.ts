import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import AuditableEntity from "@/entity/Auditable.entity";

@Entity("emailsearch_url")
export class EmailSearchUrlEntity extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("integer")
    task_id: number;
    
    @Column("text")
    url: string;
    
    @Column("text", { nullable: true })
    record_time: string;
}