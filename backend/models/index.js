import { Sequelize } from 'sequelize';
import config from '../config/config.cjs';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port
  }
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
