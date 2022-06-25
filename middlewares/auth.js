const jwt = require('jsonwebtoken');
const ReqAuthError = require('../errors/ReqAuthError');

const JWT_TOKEN = 'super-strong-secret';

const handleAuthError = (_req, _res, next) => {
  next(new ReqAuthError('Необходима авторизация'));
};

// eslint-disable-next-line consistent-return
const authorization = (req, _res, next) => {
  const auth = req.cookies;
  if (!auth) {
    return handleAuthError(next);
  }
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_TOKEN);
  } catch (err) {
    return handleAuthError(next);
  }
  req.user = payload;
  next();
};

module.exports = authorization;
