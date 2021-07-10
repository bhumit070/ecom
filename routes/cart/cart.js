const router = require('express').Router();
const {
  getCartItems,
  addItemToCart,
  removeItemFromCart,
  clearCart,
} = require('../../controllers/cart/cart');
const { getUserById } = require('../../controllers/user/user');
const { getProductById } = require('../../controllers/product/product');
const { isSignedIn, isAuthenticated } = require('../../controllers/auth/auth');

router.param('userId', getUserById);
router.param('productId', getProductById);

router.get('/cart/items/:userId', isSignedIn, isAuthenticated, getCartItems);

router.post(
  '/cart/add/:productId/:userId',
  isSignedIn,
  isAuthenticated,
  addItemToCart,
);

router.delete(
  '/cart/remove/:productId/:userId',
  isSignedIn,
  isAuthenticated,
  removeItemFromCart,
);
router.delete('/cart/clear/:userId', isSignedIn, isAuthenticated, clearCart);

module.exports = router;
