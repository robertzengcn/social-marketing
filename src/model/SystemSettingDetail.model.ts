import { Model, DataTypes,InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { SequelizeConfig } from '@/config/SequelizeConfig';
import { getUserdbpath } from '@/modules/lib/electronfunction';
import { SystemSetting } from '@/model/SystemSetting.model';

export class SystemSettingDetail extends Model<InferAttributes<SystemSettingDetail>, InferCreationAttributes<SystemSettingDetail>> {
  declare id: CreationOptional<number>;
  declare setting_id: number;
  declare optionValue: string;
  declare optionLabel: string;
}

// Define the SystemSettingDetail model
SystemSettingDetail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // Foreign key referencing SystemSetting
    setting_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    optionValue: {
      type: DataTypes.STRING,
      allowNull: false
    },
    optionLabel: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize: SequelizeConfig.getInstance(getUserdbpath()),
    modelName: 'SystemSettingDetail',
    tableName: 'system_setting_detail'
  }
);

// Establish a one-to-many relationship
SystemSettingDetail.belongsTo(SystemSetting, {
  foreignKey: 'setting_id',
  onDelete: 'CASCADE'
});

SystemSetting.hasMany(SystemSettingDetail, {
  foreignKey: 'setting_id'
});