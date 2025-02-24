// import { Model, DataTypes,InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
// import { SequelizeConfig } from '@/config/SequelizeConfig'; // Adjust the import path as needed
// import {getUserdbpath} from '@/modules/lib/electronfunction'; // Adjust the import path as needed
// export class SystemSettingGroup extends Model<InferAttributes<SystemSettingGroup>, InferCreationAttributes<SystemSettingGroup>> {
// declare id: CreationOptional<number>;
// declare name: string;
// declare description: string;

// }
// SystemSettingGroup.init({
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },  
//     description:{
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
        
// },
// {
//     // Other model options go here
//     sequelize: SequelizeConfig.getInstance(getUserdbpath()), // We need to pass the connection instance
//     modelName: 'SystemSettingGroup', // We need to choose the model name
//     tableName: 'system_setting_group',
//   }
// )
