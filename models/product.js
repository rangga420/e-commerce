'use strict';
const {
  Model
} = require('sequelize');

const currencyIDR = require('../helpers/currency')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {

    static associate(models) {
      Product.belongsToMany(models.User, {
        through: models.Conjunction
      })
    }

    get currencyIDR() {
      return currencyIDR(this.price)
    }

    showStock() {
      return this.stock > 0 ? this.stock : ''
    }

    static addUserProduct(productAll, userId) {
      return productAll.map(product => {
        return sequelize.models.Conjunction.findOrCreate({
          where: {
            UserId: userId,
            ProductId: product.id
          }
        });
      });
    }
  }
  Product.init({
    nameProduct: DataTypes.STRING,
    imgProduct: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};