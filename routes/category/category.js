const router = require('express').Router();
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require('../../controllers/auth/auth');
const {
  getCategoryById,
  getAllCategories,
  getOneCategory,
  createCategory,
  editCategory,
  removeCategory,
} = require('../../controllers/category/category');
const { getUserById } = require('../../controllers/user/user');
const { checkValidInput, isErrorInput } = require('../../utils/validate');

router.param('userId', getUserById);
router.param('categoryId', getCategoryById);

router.get('/categories', getAllCategories);
router.get('/category/:categoryId', getOneCategory);

router.post(
  '/category/create/:userId',
  checkValidInput('category'),
  isErrorInput,
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory,
);

router.put(
  '/category/edit/:categoryId/:userId',
  checkValidInput('category'),
  isErrorInput,
  isSignedIn,
  isAuthenticated,
  isAdmin,
  editCategory,
);

router.delete(
  '/category/remove/:categoryId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory,
);

module.exports = router;
