import Task from '../models/task.model';
import Game from '../models/game.model';
import Image from '../models/image.model';
import _ from 'lodash';

class TaskDAO {
  static async getAllTasks() {
    const tasks = await Task.findAll();
    return tasks;
  }

  static async createTasks(userId: number, game: Game, images: Image[]) {
    const tasksPromises = _.map(images, async (image: Image) => {
      const task = await Task.create({
        imageId: image.get('id'),
        gameId: game.get('id'),
        userId: userId
      });

      return task;
    });

    const tasks =  Promise.all(tasksPromises);
    return tasks;
  }
}

export default TaskDAO;
