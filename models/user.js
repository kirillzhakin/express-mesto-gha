const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Вы не указали имя пользователя'],
    minlength: [2, 'Длина имени пользователя меньше 2-х символов'],
    maxlength: [30, 'Длина имени пользователя более 30-и символов'],
  },

  about: {
    type: String,
    required: [true, 'Вы не указали информацию пользователя'],
    minlength: [2, 'Длина информации о пользователе меньше 2-х символов'],
    maxlength: [30, 'Длина информации о пользователе более 30-и символов'],
  },

  avatar: {
    type: String,
    required: [true, 'Вы не указали адрес ссылки изображения'],
    validate: {
      validator(v) {
        const url = /^(http:\/\/|https:\/\/w*\w)/;
        return url.test(v);
      },
      message: 'Некорректный адрес ссылки',
    },
  },
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
