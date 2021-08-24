require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const mongoServer = 'mongodb://localhost:27017/news-explorer-api';

const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

module.exports = {
  mongoServer,
  secretKey,
};
