/* eslint-disable linebreak-style */
class ReqAuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = ReqAuthError;
