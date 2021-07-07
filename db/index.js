const Sequelize = require('sequelize');
const dbConfig = require('./config/config');
const sequelize = new Sequelize(
  dbConfig.dbname,
  dbConfig.user,
  dbConfig.password,
  {
    logging: false,
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  },
);
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
