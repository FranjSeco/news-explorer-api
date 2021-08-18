const userRouter = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');

// # returns information about the logged-in user (email and name)
// GET /users/me

const { currentUser } = require('../controllers/user');

// const method = (value) => {
//   const result = validator.isURL(value);
//   if (result) {
//     return value;
//   }
//   throw new Error('URL validation err');
// };

useRouter.get('/me', currentUser);

module.exports = userRouter;