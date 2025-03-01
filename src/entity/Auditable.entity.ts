import "reflect-metadata"
import { BaseEntity, Column,DataSource } from 'typeorm';
import { Order, getOrder } from '@/entity/order.decorator'
export default abstract class AuditableEntity extends BaseEntity {
    @Order(9999)
    @Column('datetime', {
      default: () => 'CURRENT_TIMESTAMP',
      nullable: true
    })
    createdAt?: Date;
    @Order(9999)
    @Column('datetime', {
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
      nullable: true,
      
    })
    updatedAt?: Date;
    static useDataSource(dataSource: DataSource) {
      BaseEntity.useDataSource.call(this, dataSource)
      const meta = dataSource.entityMetadatasMap.get(this)
      if (meta != null) {
          // reorder columns here
          meta.columns = [...meta.columns].sort((x, y) => {
              const orderX = getOrder((x.target as any).prototype, x.propertyName)
              const orderY = getOrder((y.target as any).prototype, y.propertyName)
              return orderX - orderY
          })
      }
  }
  }