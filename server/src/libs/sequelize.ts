import Seqeuelize from 'sequelize';
import config from 'config';

const database: string = config.get('db.database');
const host: string = config.get('db.host');
const password: string = config.get('db.password');
const username: string = config.get('db.username');

const sequelize = new Seqeuelize.Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export const checkConnection = async () => {
  try {
    sequelize.authenticate();
    console.log("Connection established successfully");
  } catch (e) {
    console.log("Failed to establish connection");
  }
}

export default sequelize;
