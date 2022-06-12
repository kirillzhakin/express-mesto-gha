/* eslint-disable no-unused-vars */
const cardRouter = require('express').Router();

const {
  cardsController, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

// GET /cards — возвращает все карточки
cardRouter.get('/cards', cardsController);

// POST /cards — создаёт карточку
cardRouter.post('/cards', createCard);

// DELETE /cards/:cardId — удаляет карточку по идентификатору
cardRouter.delete('/cards/:cardId', deleteCard);

// PUT /cards/:cardId/likes — поставить лайк карточке
cardRouter.put('/cards/:cardId/likes', likeCard);

// DELETE /cards/:cardId/likes — убрать лайк с карточки
cardRouter.delete('/cards/:cardId/likes', dislikeCard);

module.exports = cardRouter;
