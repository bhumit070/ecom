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

db.user = require('./models/user')(sequelize, Sequelize);
db.category = require('./models/category')(sequelize, Sequelize);
db.product = require('./models/product')(sequelize, Sequelize);
db.cart = require('./models/cart')(sequelize, Sequelize);

db.user.hasMany(db.cart);
db.cart.belongsTo(db.user);

db.product.hasMany(db.cart);
db.cart.belongsTo(db.product);

db.category.hasMany(db.product);
db.product.belongsTo(db.category);

module.exports = db;
