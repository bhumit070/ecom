const router = require('express').Router();
const {
  getCartItems,
  addItemToCart,
  removeItemFromCart,
} = require('../../controllers/cart/cart');
const { getUserById } = require('../../controllers/user/user');
const { getProductById } = require('../../controllers/product/product');

router.param('userId', getUserById);
router.param('productId', getProductById);

router.get('/cart/items/:userId', getCartItems);

router.post('/cart/add/:productId/:userId', addItemToCart);

router.delete('/cart/remove/:productId/:userId', removeItemFromCart);

module.exports = router;
