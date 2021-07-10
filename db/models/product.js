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
      type: Sequelize.STRING,
      allowNull: false,
      get() {
        const value = this.getDataValue('photo');
        return value
          ? JSON.parse(value)
          : {
              name: '',
              path: '',
            };
      },
      set(value) {
        this.setDataValue('photo', JSON.stringify(value));
      },
    },
    category: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return Product;
};
