const ArticleModel = require('../models/article');

const NotFoundError = require('../errors/NotFound');
const NotAuthorizedError = require('../errors/NotAuthorized');

const getArticles = (req, res, next) => {
  ArticleModel.find({})
    .then((articles) => {
      res.status(200).send({ data: articles });
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  ArticleModel.create({
    keyword, title, text, date, source, link, image,
  })
    .then((article) => {
      res.status(200).send({ data: article });
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  ArticleModel.findByIdAndRemove(req.params._id)
    .then((article) => {
      if (!article) {
        throw new NotFoundError('This article doesn´t exist');
      } else if (!article.owner._id === req.user._id) {
        throw new NotAuthorizedError.NotAuthorized('Not Autorized');
      } else {
        res.status(200).send({
          data: article,
          message: 'Article deleted',
        });
      }
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
