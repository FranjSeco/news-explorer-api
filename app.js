/* eslint-disable no-undef */
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
const { mongoServer } = require('./config/utils');

app.use(limiter);

mongoose.connect(mongoServer, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use(helmet());

app.use(requestLogger);

app.use(cors());

app.use(routes);

app.use(errorLogger); // enabling the error logger
app.use(errors()); // celebrate error handler

app.use((err, req, res, next) => {
  let { statusCode = 500 } = err;
  if (err.name === 'ValidationError') statusCode = 400;
  else if (err.name === 'MongoError' && err.code === 11000) statusCode = 409;
  else if (err.name === 'Error') statusCode = 401;

  const { message = 'An error occurred on the server' } = err;

  res.status(statusCode).send({ message });
});

app.listen(PORT, () => {
  console.log(`Link to the server: ${PORT}`);
});
