/* eslint-disable no-unused-vars */
const userRouter = require('express').Router();

const {
  usersController, userController, createUser, updateUserProfile, updateAvatarProfile,
} = require('../controllers/users');

// GET /users — возвращает всех пользователей
userRouter.get('/users', usersController);

// GET /users/:userId - возвращает пользователя по _id
userRouter.get('/users/:userId', userController);

// POST /users — создаёт пользователя
userRouter.post('/users', createUser);

// PATCH /users/me — обновляет профиль
userRouter.patch('/users/me', updateUserProfile);

// PATCH /users/me/avatar — обновляет аватар
userRouter.patch('/users/me/avatar', updateAvatarProfile);

module.exports = userRouter;
