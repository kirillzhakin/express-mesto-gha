/* eslint-disable no-unused-vars */
const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { reg } = require('../utils/reg');

const {
  cardsController, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

// GET /cards — возвращает все карточки
cardRouter.get('/', cardsController);

// POST /cards — создаёт карточку
cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().pattern(reg).required(),
  }),
}), createCard);

// DELETE /cards/:cardId — удаляет карточку по идентификатору
cardRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), deleteCard);

// PUT /cards/:cardId/likes — поставить лайк карточке
cardRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), likeCard);

// DELETE /cards/:cardId/likes — убрать лайк с карточки
cardRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), dislikeCard);

module.exports = cardRouter;
