const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Длина названия карточки меньше 2-х символов'],
    maxlength: [30, 'Длина названия карточки более 30-и символов'],
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const url = /^(http:\/\/|https:\/\/w*\w)/;
        return url.test(v);
      },
      message: 'Некорректный адрес ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const cardModel = mongoose.model('card', cardSchema);
module.exports = cardModel;
