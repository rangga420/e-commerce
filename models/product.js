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
    nameProduct: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name Product is required"
        },
        notEmpty: {
          msg: "Name Product is required"
        }
      }
    },
    imgProduct: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Image Product is required"
        },
        notEmpty: {
          msg: "Image Product is required"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price Product is required"
        },
        notEmpty: {
          msg: "Price Product is required"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description Product is required"
        },
        notEmpty: {
          msg: "Description Product is required"
        },
        validationDescriptionLength(value) {
          if (value.length > 200) {
            throw new Error('Description can not more than 400 character')
          }
        }
      }
    },
    stock: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Stock Product is required"
        },
        notEmpty: {
          msg: "Stock Product is required"
        }
      }
    },

  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};