const { okMessage, serverError, badRequest } = require('../../utils/messages');
const Cart = require('../../db/index').cart;
const db = require('../../db/index');
const { Op } = require('sequelize');
exports.getCartItems = async (req, res) => {
  const data = await Cart.findAll(
    { where: { userId: parseInt(req.user.id) } },
    { include: [{ model: db.product }] },
  );
  return okMessage(res, 'cart', data);
};

exports.addItemToCart = async (req, res) => {
  try {
    const productId = req.product.id;
    const userId = req.user.id;
    await Cart.create({ productId, userId });
    return okMessage(res, 'Item added to cart');
  } catch (error) {
    return serverError(res);
  }
};

exports.removeItemFromCart = async (req, res) => {
  try {
    console.log('remove');
    const productId = parseInt(req.product.id);
    const userId = parseInt(req.user.id);
    await Cart.destroy({
      where: {
        [Op.and]: [{ userId }, { productId }],
      },
    });
    return okMessage(res, 'Items deleted successfully');
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
};
