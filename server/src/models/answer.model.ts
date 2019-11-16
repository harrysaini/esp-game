import sequelize from '../libs/sequelize';
import Sequelize, { Model } from 'sequelize';
import Task from './task.model';
import Image from './image.model';

class Answer extends Model {
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
}

export default Answer;
