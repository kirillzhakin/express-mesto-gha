/* eslint-disable no-unused-vars */
const userRouter = require('express').Router();

const {
  usersController, userController, createUser, updateUserProfile, updateAvatarProfile,
} = require('../controllers/users');

userRouter.get('/users', usersController);

userRouter.get('/users/:userId', userController);

userRouter.post('/users', createUser);

userRouter.patch('/users/me', updateUserProfile);

userRouter.patch('/users/me/avatar', updateAvatarProfile);

module.exports = userRouter;

// GET /users — возвращает всех пользователей
// GET /users/:userId - возвращает пользователя по _id
// POST /users — создаёт пользователя
// PATCH /users/me — обновляет профиль
// PATCH /users/me/avatar — обновляет аватар
