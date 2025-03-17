import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import AuditableEntity from "@/entity/Auditable.entity";

@Entity("proxy_check")
export class ProxyCheckEntity extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("integer")
    proxy_id: number;
    
    @Column("text", { nullable: true })
    check_time: string;
    
    @Column("integer", { nullable: true })
    status: number;
}