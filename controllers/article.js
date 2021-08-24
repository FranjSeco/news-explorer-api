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
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => {
      res.status(200).send({ data: article });
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  ArticleModel.findById(req.params._id)
    .then((article) => {
      if (!article) {
        throw new NotFoundError('This article doesn´t exist');
      } else if (article.owner._id.toString() !== req.user._id) {
        throw new NotAuthorizedError('Not Authorized');
      } else {
        ArticleModel.findByIdAndDelete(req.params._id)
          .then(() => {
            res.status(200).send({ message: 'Article deleted' });
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
