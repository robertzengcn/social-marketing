import { Model, DataTypes } from 'sequelize';
import { SequelizeConfig } from '@/config/SequelizeConfig'; // Adjust the import path as needed
import {getUserdbpath} from '@/modules/lib/electronfunction'; // Adjust the import path as needed
export class SystemSetting extends Model {
    declare id: number;
    declare key: string;
    declare value: string;
    declare description: string;
    declare group_id: number;
}
SystemSetting.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    key: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
    value: {
        type: DataTypes.STRING,
        allowNull: false,
      },  
    description:{
        type: DataTypes.STRING,
        allowNull: true,
      },
    group_id:{
        type: DataTypes.INTEGER,
        allowNull: true, 
    }  
        
},
{
    // Other model options go here
    sequelize: SequelizeConfig.getInstance(getUserdbpath()), // We need to pass the connection instance
    modelName: 'SystemSetting', // We need to choose the model name
    tableName: 'system_setting',
  }
)
