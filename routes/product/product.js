const router = require('express').Router();

const {
  getProductById,
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  removeProduct,
  updateProductImage,
} = require('../../controllers/product/product');
const { getUserById } = require('../../controllers/user/user');
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require('../../controllers/auth/auth');
router.param('productId', getProductById);
router.param('userId', getUserById);

router.get('/products', getAllProducts);
router.get('/product/:productId', getOneProduct);

router.post(
  '/product/create/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct,
);

router.put(
  '/product/update/:productId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct,
);
router.put(
  '/product/update/image/:productId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProductImage,
);

router.delete(
  '/product/remove/:productId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeProduct,
);

module.exports = router;
