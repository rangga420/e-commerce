const { Product, User, Conjunction, Balance, Transaction } = require("../models")
const { Op } = require('sequelize')
const currencyIDR = require('../helpers/currency')
class ProductController {

  static deleteProduct(req, res) {
    Conjunction.destroy({
      where: {
        ProductId: req.params.id
      }
    })
      .then(() => {
        return Product.destroy({
          where: {
            id: req.params.id
          }
        })
      })

      .then(() => {
        res.redirect('/products/admin/list')
      })

      .catch(err => {
        res.send(err)
      })

  }

  static renderListPage(req, res) {
    let options = {
      where: {}
    }
    const { search } = req.query
    if (search) {
      options.where.nameProduct = {
        [Op.iLike]: `%${search}%`
      }
    }
    Product.findAll(options)
      .then(product => {
        res.render('listPage', { product })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static renderPageProduct(req, res) {
    let product
    let currentBalance = ''
    const { userId } = req.params
    const errors = req.query.succes ? req.query.succes : req.query.failed
    Product.findAll({
      order: [[['price', 'DESC']]],
      include: {
        model: User,
        include: Balance
      }
    })
      .then(productAll => {
        product = productAll
        return Balance.findOne({
          where: {
            UserId: userId
          }
        })

      })
      .then((balance) => {
        if (balance) {
          currentBalance = currencyIDR(balance.balance)
        }
        return Product.addUserProduct(product, userId)
      })
      .then(() => {
        console.log(currentBalance)
        res.render('productPage', { product, userId, errors, currentBalance })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static renderAddProduct(req, res) {
    res.render('productAdd')
  }

  static createAddProduct(req, res) {
    const { nameProduct, imgProduct, price, description, stock } = req.body
    Product.create({ nameProduct, imgProduct, price, description, stock })
      .then(result => {
        res.redirect('/products/list')
      })
      .catch(err => {
        if (err.name == "SequelizeValidationError") {
          const messages = err.errors.map((e) => e.message)
          res.redirect('/products/add', { messages })
        } else {
          res.send(err)
        }
      })
  }

  static buyPorduct(req, res) {
    const { userId, productId } = req.params
    let data = {}
    let currentBalance = ''
    Product.findOne({
      where: {
        id: productId
      },
      include: {
        model: User,
        where: {
          id: userId,
        },
        include: Balance
      }
    })
      .then(product => {
        console.log(product)
        if (product.Users[0].Balance.balance >= product.price) {
          data = {
            price: product.price,
            product: product.nameProduct
          }
          currentBalance = product.Users[0].Balance.balance - product.price
          return Balance.update({ balance: currentBalance }, {
            where: {
              UserId: userId
            }
          })
        }
        currentBalance = product.Users[0].Balance.balance - product.price
      })

      .then(currentBalance => {
        if (currentBalance) {
          console.log('ini jalan')
          return Product.decrement({ stock: 1 }, {
            where: {
              id: productId
            }
          })
        }
      })

      .then(decrementStock => {
        if (decrementStock) {
          const { price, product } = data
          return Transaction.create({ UserId: userId, detailOrder: `${product}-${Date.now()}`, price })
        }
      })

      .then(transaction => {
        if (transaction) {
          return res.redirect(`/products/${userId}/?succes=Buy Item`)
        } else {
          const result = `You have to top up your balance ${currencyIDR(Math.abs(currentBalance))} to buy this product`
          return res.redirect(`/products/${userId}/?failed=${result}`)
        }
      })

      .catch(err => {
        console.log(err)
        res.send(err)
      })
  }

  static renderEditProduct(req, res) {
    Product.findByPk(req.params.id)
      .then(product => {
        res.render("productEdit", { product })
        // res.send(product)
      })
      .catch(err => {
        res.send(err)
      })
  }

  static updateProduct(req, res) {
    const { nameProduct, imgProduct, price, description, stock } = req.body

    Product.update({ nameProduct, imgProduct, price, description, stock }, {
      where: {
        id: req.params.id
      }
    })
      .then(updated => {
        res.redirect('/products')
      })
      .catch(err => {
        res.send(err)
      })
  }


}

module.exports = ProductController