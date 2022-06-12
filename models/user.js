const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return v < 2 || v > 30;
      },
      message: 'Введите информацию о пользователе длинной от 2-х до 30-ти символов',
    },
  },

  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return v < 2 || v > 30;
      },
      message: 'Введите информацию о пользователе длинной от 2-х до 30-ти символов',
    },
  },

  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
        return urlRegex.test(v);
      },
      message: 'Некорректный адрес ссылки',
    },
  },
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
