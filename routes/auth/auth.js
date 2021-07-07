const router = require('express').Router();
const {
  login,
  register,
  isSignedIn,
  isAuthenticated,
} = require('../../controllers/auth/auth');
const { getUserById } = require('../../controllers/user/user');

const { checkValidInput, isErrorInInput } = require('../../utils/validate');

router.param('userId', getUserById);

router.post(
  '/auth/register',
  checkValidInput('name'),
  checkValidInput('email'),
  checkValidInput('password'),
  isErrorInInput,
  register,
);

router.post(
  '/auth/login',
  checkValidInput('email'),
  checkValidInput('password'),
  login,
);

router.get('/protected/:userId', isSignedIn, isAuthenticated, (req, res) =>
  res.status(200).json('ok'),
);

module.exports = router;
