'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Balance extends Model {

    static associate(models) {
      Balance.belongsTo(models.User)
    }

    static validateBalance(product) {
      return product.Users[0].Balance.balance >= product.price
        ?
        {
          balance: product.Users[0].Balance.balance,
          price: product.price,
          status: true,
        }
        :
        {
          balance: product.Users[0].Balance.balance,
          price: product.price,
          status: false,
        }
    }
  }
  Balance.init({
    balance: DataTypes.INTEGER,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Balance',
  });
  return Balance;
};