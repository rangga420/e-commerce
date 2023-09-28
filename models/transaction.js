'use strict';
const {
  Model
} = require('sequelize');
const currencyIDR = require('../helpers/currency')
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User)
    }

    get currencyIDR() {
      return currencyIDR(this.price)
    }
  }
  Transaction.init({
    detailOrder: DataTypes.STRING,
    price: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};