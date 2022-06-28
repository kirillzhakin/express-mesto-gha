/* eslint-disable import/no-unresolved */
const mongoose = require('mongoose');
// const isUrl = require('validator/lib/isUrl');

const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Вы не указали название карточки'],
    minlength: [2, 'Длина названия карточки меньше 2-х символов'],
    maxlength: [30, 'Длина названия карточки более 30-и символов'],
  },
  link: {
    type: String,
    required: [true, 'Вы не указали адрес ссылки карточки'],
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: 'Некорректный адрес ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

const cardModel = mongoose.model('card', cardSchema);
module.exports = cardModel;
