/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

const User = require('../models/user');

const usersController = (_req, res) => {
  User.find()
    .then((data) => {
      if (!data) {
        throw new Error();
      }
      res.send(data);
    })
    .catch((_) => res.status(500).send({ message: 'Произошла ошибка' }));
};

const userController = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new Error();
      }
      res.send(user);
    })
    .catch((err) => {
      if (err) {
        return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((_) => res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' }));
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.send(user))
    .catch((_) => res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' }));
};

const updateAvatarProfile = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports = {
  usersController, userController, createUser, updateUserProfile, updateAvatarProfile,
};