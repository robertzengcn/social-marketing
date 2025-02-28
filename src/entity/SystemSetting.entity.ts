import { Entity, Column, PrimaryGeneratedColumn,ManyToOne } from "typeorm"
import AuditableEntity from "@/entity/Auditable.entity"
import {SystemSettingGroupEntity} from "@/entity/SystemSettingGroup.entity"
@Entity("system_setting")
export class SystemSettingEntity extends AuditableEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column('text')
    key: string;
    @Column("text")
    value: string;
    @Column("text")
    description: string;
    @Column("text")
    type: string;
    @ManyToOne(() => SystemSettingGroupEntity, (systemSettingGroupEntity) => systemSettingGroupEntity.settings)
    group: SystemSettingGroupEntity;

}