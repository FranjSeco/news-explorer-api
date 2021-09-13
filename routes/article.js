const articleRouter = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');

const method = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};

const { getArticles, saveArticle, deleteArticle } = require('../controllers/article');

// # returns all articles saved by the user
// GET /articles

articleRouter.get('/', getArticles);

// # creates an article with the passed
// # keyword, title, text, date, source, link, and image in the body
// POST /articles

articleRouter.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    link: Joi.string().required().custom(method),
    image: Joi.string().required().custom(method),
  }),
}), saveArticle);

// # deletes the stored article by _id
// DELETE /articles/articleId

articleRouter.delete('/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  }), deleteArticle);

module.exports = articleRouter;
