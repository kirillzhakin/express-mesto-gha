/* eslint-disable import/no-unresolved */
/* eslint-disable func-names */
/* eslint-disable no-undef */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const validator = require('validator');

// const isEmail = require('validator/lib/isEmail');
// const isUrl = require('validator/lib/isUrl');
const ReqAuthError = require('../errors/ReqAuthError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Длина имени пользователя меньше 2-х символов'],
    maxlength: [30, 'Длина имени пользователя более 30-и символов'],
  },

  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Длина информации о пользователе меньше 2-х символов'],
    maxlength: [30, 'Длина информации о пользователе более 30-и символов'],
  },

  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: 'Некорректный адрес ссылки',
    },
  },

  email: {
    type: String,
    unique: true,
    required: [true, 'Вы не указали почтовый адрес'],
    validate: {
      validator(link) {
        return validator.isEmail(link);
      },
      message: 'Неправильный формат почты',
    },
  },

  password: {
    type: String,
    required: [true, 'Вы не указали пароль'],
    minlength: [4, 'Длина пароля меньше 4-х символов'],
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }, { runValidators: true }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new ReqAuthError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new ReqAuthError('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
