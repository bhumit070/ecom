require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../db/index').user;
const {
  okMessage,
  unProcessableEntity,
  badRequest,
  serverError,
  unAuthenticated,
  accessDenied,
} = require('../../utils/messages');
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      const isValidPassword = bcrypt.compareSync(password, user.password);
      const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
      if (isValidPassword) {
        res.cookie('token', token, {
          expire: new Date() + 1,
          path: process.env.FRONTEND,
        });
        delete user.dataValues.password;
        delete user.dataValues.createdAt;
        delete user.dataValues.updatedAt;
        const payload = {
          token,
          user,
        };
        return okMessage(res, 'Signin Successful', payload);
      } else return badRequest(res, 'Password is not Valid');
    } else return badRequest(res, 'No user found with given email');
  } catch (error) {
    return serverError(res, 'Server is unable to handle request');
  }
};

exports.register = async (req, res) => {
  try {
    let { email, password } = req.body;
    const isUser = await User.findOne({ where: { email } });
    if (isUser) return unProcessableEntity(res, 'User Email Already Exists');
    password = bcrypt.hashSync(password, 10);
    req.body.password = password;
    const data = await User.create(req.body);
    delete data.dataValues.password;
    delete data.dataValues.createdAt;
    delete data.dataValues.updatedAt;
    return okMessage(res, 'Register Successful', data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.isSignedIn = (req, res, next) => {
  const { token } = req.cookies;
  if (token) next();
  else return unAuthenticated(res, 'You are not Signedin');
};

exports.isAuthenticated = (req, res, next) => {
  const { token } = req.cookies;
  const data = jwt.decode(token);
  if (data.id === req.user.id) next();
  else return accessDenied(res, 'access denied');
};

exports.isAdmin = (req, res, next) => {
  const user = req.user;
  if (user.isAdmin) return next();
  return accessDenied(res, 'Only admins are allowed to view this route');
};
