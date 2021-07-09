require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

const db = require('./db/index');

const authRoutes = require('./routes/auth/auth');
const categoryRoutes = require('./routes/category/category');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND,
  }),
);

const apiPrefix = '/api';
app.use(apiPrefix, authRoutes);
app.use(apiPrefix, categoryRoutes);

db.sequelize
  .sync({ alter: true })
  .then(() => console.log('DB CONNECTED'))
  .catch((error) => console.log('ERROR IS', error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🏃🏃 @ ${PORT}`));
