require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const db = require('./db/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND,
  }),
);

db.sequelize
  .sync({ alter: true })
  .then(() => console.log('DB CONNECTED'))
  .catch(() => process.exit(1));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🏃🏃 @ ${PORT}`));
