import "reflect-metadata"
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import AuditableEntity from "@/entity/Auditable.entity"
@Entity("system_setting_group")
export class SystemSettingGroupEntity extends AuditableEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column('text')
    name: string;
    @Column("text")
    description: string;
}
