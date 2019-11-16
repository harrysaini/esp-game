import sequelize from '../libs/sequelize';
import Sequelize, { Model } from 'sequelize';

class Answer extends Model {
  imageId!: number;
  userId!: number;
  static associate: (models: any) => void;
}
Answer.init({
}, {
  sequelize,
  modelName: 'answer'
});

Answer.associate = (models: any) => {
  Answer.belongsTo(models.Task);
  Answer.belongsTo(models.Image);
  Answer.belongsTo(models.User);
}

export default Answer;
