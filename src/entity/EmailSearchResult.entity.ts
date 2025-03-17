import { Entity, Column } from "typeorm";
import AuditableEntity from "@/entity/Auditable.entity";

@Entity("emailsearch_result")
export class EmailSearchResultEntity extends AuditableEntity {
    @Column("integer")
    task_id: number;
    
    @Column("text", { nullable: true })
    email: string;
    
    @Column("text", { nullable: true })
    name: string;
    
    @Column("text", { nullable: true })
    domain: string;
    
    @Column("text", { nullable: true })
    record_time: string;
}