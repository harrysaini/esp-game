import Answer from './answer.model';
import User from './user.model';
import Game from './game.model';
import Task from './task.model';
import Image from './image.model';
import * as _ from 'lodash';

const Models = {
  Answer,
  Game,
  User,
  Task,
  Image
}


_.each(Models, (Model) => {
  Model.associate(Models);
});

export default Models;
