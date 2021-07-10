//importing dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// importing routes
const authRoutes = require('./routes/auth/auth');
const categoryRoutes = require('./routes/category/category');
const productRoutes = require('./routes/product/product');
const cartRoutes = require('./routes/cart/cart');
//importing database instance
const db = require('./db/index');

// creating express app instance
const app = express();

//adding middlewares to the app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(__dirname + '/public/images'));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND,
  }),
);

// adding routes to api
const apiPrefix = '/api';
app.use(apiPrefix, authRoutes);
app.use(apiPrefix, categoryRoutes);
app.use(apiPrefix, productRoutes);
app.use(apiPrefix, cartRoutes);
app.use((req, res) =>
  res.status(404).json({ isError: true, msg: 'Api not found' }),
);

// handling database connection
db.sequelize
  .sync({ alter: true })
  .then(() => console.log('DB CONNECTED'))
  .catch((error) => console.log('ERROR IS', error));

// finally running of a PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🏃🏃 @ ${PORT}`));
