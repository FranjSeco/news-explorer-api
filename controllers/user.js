const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const { secretKey } = require('../config/utils');

const NotFoundError = require('../errors/NotFound');
const NotAuthorized = require('../errors/NotAuthorized');

const currentUser = (req, res, next) => {
  UserModel.findById(
    req.user._id,
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('No user with matching ID found');
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  UserModel.findById(req.params._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('No user with matching ID found');
      }
      return res.status(200).send({ data: user });
    })
    .catch(next);
};

const getAllUsers = (req, res, next) => {
  UserModel.find({})
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.status(200).send({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return UserModel.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new NotAuthorized('Not Authorized');
      }

      const token = jwt.sign({ _id: user._id },
        secretKey,
        { expiresIn: '7d' });

      res.cookie('jwt', token, {
        maxAge: 360000 * 24 * 7,
        httpOnly: true,
      });

      return res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUser,
  getAllUsers,
  currentUser,
  createUser,
  login,

};
