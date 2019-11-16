import sequelize from '../libs/sequelize';
import Sequelize, { Model } from 'sequelize';


class Task extends Model {
  id!: number;
  gameId!: number;
  imageId!: number;
  static associate: (models: any) => void;
}
Task.init({
}, {
  sequelize,
  modelName: 'task'
});

Task.associate = (models: any) => {
  Task.belongsTo(models.Game);
  Task.belongsTo(models.Image);
  Task.hasMany(models.Answer);
}


export default Task;
