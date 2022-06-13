/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://0.0.0.0:27017/mestodb')
  .then(() => {
    console.log('Подключен к базе данных');
  });

app.use((req, _res, next) => {
  req.user = {
    _id: '62a6c7b03a2c9ad6eacf306d', // _id созданного пользователя
  };

  next();
});

app.use('/', userRouter);
app.use('/', cardRouter);

app.use('*', (_req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`Порт ${PORT}`);
});
