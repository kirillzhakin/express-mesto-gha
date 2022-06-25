/* eslint-disable linebreak-style */
class ReqAuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ReqAuthError';
    this.statusCode = 401;
  }
}

module.exports = ReqAuthError;
