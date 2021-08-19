const userRouter = require('express').Router();

// # returns information about the logged-in user (email and name)
// GET /users/me

const { currentUser } = require('../controllers/user');

userRouter.get('/me', currentUser);

module.exports = userRouter;
