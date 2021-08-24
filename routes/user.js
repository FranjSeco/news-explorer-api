const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

// # returns information about the logged-in user (email and name)
// GET /users/me

const { currentUser, getAllUsers, getUser } = require('../controllers/user');

userRouter.get('/me', currentUser);
userRouter.get('/', getAllUsers);
userRouter.get('/:_id', celebrate({
  body: Joi.object({
    id: Joi.string().required().hex().length(24),
  }),
}), getUser);

module.exports = userRouter;
