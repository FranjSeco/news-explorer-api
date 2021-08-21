const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const NotFoundError = require('../errors/NotFound');
const userRouter = require('./user');
const articleRouter = require('./article');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/user');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
    name: Joi.string().required(),
  }).unknown(true),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }).unknown(true),
}), login);

router.use(auth);
router.use('/users', userRouter);
router.use('/articles', articleRouter);

router.get('*', () => {
  throw new NotFoundError('Requested resource not found');
});

module.exports = router;
