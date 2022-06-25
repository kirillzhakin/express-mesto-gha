const jwt = require('jsonwebtoken');
const ReqAuthError = require('../errors/ReqAuthError');

const JWT_TOKEN = 'super-strong-secret';

const handleAuthError = (next) => {
  next(new ReqAuthError('Необходима авторизация'));
};

// eslint-disable-next-line consistent-return
const authorization = (req, _res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return handleAuthError(next);
  }
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
