// import { Model, DataTypes,InferAttributes, InferCreationAttributes, CreationOptional  } from 'sequelize';
// // import { SequelizeConfig } from '@/config/SequelizeConfig'; // Adjust the import path as needed
// import {getUserdbpath} from '@/modules/lib/electronfunction'; // Adjust the import path as needed
// import {InputTypeEnum} from "@/entityTypes/commonType"
// // export enum SettingTypeEnum {
// //   INPUT = 'input',
// //   SELECT = 'select',
// //   RADIO = 'radio',
// //   CHECKBOX = 'checkbox'
// // }
// export class SystemSetting extends Model<InferAttributes<SystemSetting>, InferCreationAttributes<SystemSetting>> {
//     declare id: CreationOptional<number>;
//     declare key: string;
//     declare value: string;
//     declare description: string;
//     declare group_id: number;
//     declare type: InputTypeEnum;
// }
// SystemSetting.init({
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//     key: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       }, 
//     value: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },  
//     description:{
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//     group_id:{
//         type: DataTypes.INTEGER,
//         allowNull: true, 
//     },
//     type: {
//       type: DataTypes.ENUM(...Object.values(InputTypeEnum)), // spread the enum values
//       allowNull: false,
//       defaultValue: InputTypeEnum.INPUT
//     }  
        
// },
// {
//     // Other model options go here
//     sequelize: SequelizeConfig.getInstance(getUserdbpath()), // We need to pass the connection instance
//     modelName: 'SystemSetting', // We need to choose the model name
//     tableName: 'system_setting',
//   }
// )
