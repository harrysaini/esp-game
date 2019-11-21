import app from './libs/express';
import sequelize, { checkConnection } from './libs/sequelize';
import './models/loadModels';
import { addImagesToDb, adduserToDb } from './utils/addImagesInDb';

const port = app.get('port');

const setServer = async () => {
  await sequelize.sync(
    //{force: true}
  );
  await addImagesToDb();
  await adduserToDb();
}

setServer().then(() => {
  app.listen(port, () => {
    console.log('esp-game:server:' +  `Listening on ${port}`);
  });
});


