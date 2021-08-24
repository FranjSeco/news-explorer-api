const jwt = require('jsonwebtoken');
const NotAuthorized = require('../errors/NotAuthorized');

const { secretKey } = require('../config/utils');

const auth = (req, res, next) => {
  const { cookie } = req.headers;
  const token = cookie.replace('jwt=', '');
  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    next(new NotAuthorized('Not Authorizeddd'));
  }

  req.user = payload;
  next();
};

module.exports = auth;
