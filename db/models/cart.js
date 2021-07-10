module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define('cart', {
    count: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return Cart;
};
