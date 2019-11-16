import sequelize from '../libs/sequelize';
import Sequelize, { Model } from 'sequelize';

class Image extends Model {
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
}



export default Image;
