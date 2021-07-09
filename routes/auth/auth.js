const router = require('express').Router();
const { login, register } = require('../../controllers/auth/auth');
const { getUserById } = require('../../controllers/user/user');

const { checkValidInput, isErrorInput } = require('../../utils/validate');

router.param('userId', getUserById);

router.post(
  '/auth/register',
  checkValidInput('name'),
  checkValidInput('email'),
  checkValidInput('gender'),
  checkValidInput('password'),
  isErrorInput,
  register,
);

router.post(
  '/auth/login',
  checkValidInput('email'),
  checkValidInput('password'),
  isErrorInput,
  login,
);

module.exports = router;
