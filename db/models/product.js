module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('product', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    photo: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    category: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return Product;
};
