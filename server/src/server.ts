import app from './libs/express';
import sequelize, { checkConnection } from './libs/sequelize';
import './models';
import { addImagesToDb } from './utils/addImagesInDb';

const port = app.get('port');

const setServer = async () => {
  await sequelize.sync(
    //{force: true}
    );
  await addImagesToDb();
}

setServer().then(() => {
  app.listen(port, () => {
    console.log('caastle-consumer-app2:server:' +  `Listening on ${port}`);
  });
});


