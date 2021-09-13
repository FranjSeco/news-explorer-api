const jwt = require('jsonwebtoken');
const NotAuthorized = require('../errors/NotAuthorized');

const { secretKey } = require('../config/utils');

const auth = (req, res, next) => {
  console.log(req.headers, 'HERE');
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new NotAuthorized('Not Authorized'));
    return;
  }
  const token = authorization.replace('Bearer ', '');
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
