import sequelize from '../libs/sequelize';
import Sequelize, { Model } from 'sequelize';

class Image extends Model {
  url!: string;
  name!: string;
  isPrimaryImage!: boolean;
  setPrimaryImage!: Sequelize.BelongsToSetAssociationMixin<Image, 'id'>

  static associate: (models: any) => void;
}
Image.init({
  url: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  isPrimaryImage: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'image'
});

Image.associate = (models: any) => {
  Image.belongsTo(models.Image, {
    as: 'primaryImage',
    foreignKey: 'primaryImageId'
  });
  Image.hasMany(models.Task);
}


export default Image;
