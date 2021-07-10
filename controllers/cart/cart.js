const { okMessage, serverError, badRequest } = require('../../utils/messages');
const Cart = require('../../db/index').cart;
const db = require('../../db/index');
const { Op } = require('sequelize');

exports.getCartItems = async (req, res) => {
  const data = await Cart.findAll(
    { where: { userId: parseInt(req.user.id) } },
    { include: [{ model: db.product }, { model: db.user }] },
  );
  return okMessage(res, 'cart', data);
};

exports.addItemToCart = async (req, res) => {
  try {
    const productId = req.product.id;
    const userId = req.user.id;
    const data = await Cart.findOne({
      where: {
        [Op.and]: [{ userId }, { productId }],
      },
    });
    if (data) {
      await Cart.update(
        { count: data.count + 1 },
        {
          where: {
            [Op.and]: [{ userId }, { productId }],
          },
        },
      );
      return okMessage(res, 'Item added to cart');
    } else {
      await Cart.create({ productId, userId, count: 1 });
      return okMessage(res, 'Item added to cart');
    }
  } catch (error) {
    return serverError(res);
  }
};

exports.removeItemFromCart = async (req, res) => {
  try {
    const productId = req.product.id;
    const userId = req.user.id;
    const data = await Cart.findOne({
      where: {
        [Op.and]: [{ userId }, { productId }],
      },
    });
    if (data && data.count > 1) {
      await Cart.update(
        { count: data.count - 1 },
        {
          where: {
            [Op.and]: [{ userId }, { productId }],
          },
        },
      );
      return okMessage(res, 'Items deleted successfully');
    } else {
      await Cart.destroy({
        where: {
          [Op.and]: [{ userId }, { productId }],
        },
      });
      return okMessage(res, 'Items deleted successfully');
    }
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    await Cart.destroy({
      where: {
        userId,
      },
    });
    return okMessage(res, 'Cart cleared successfully');
  } catch (error) {
    return serverError(res);
  }
};
