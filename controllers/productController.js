const { Product, User, Conjunction, Balance } = require("../models")
const currencyIDR = require('../helpers/currency')
class ProductController {

  static renderPageProduct(req, res) {
    let product
    const { userId } = req.params
    const errors = req.query.succes ? req.query.succes : req.query.failed
    Product.findAll({ order: [[['price', 'DESC']]] })
      .then(productAll => {
        product = productAll
        return Product.addUserProduct(productAll, userId)
      })
      .then(() => {
        res.render('productPage', { product, userId, errors })
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
        res.redirect('/products')
      })
      .catch(err => {
        if (err.name == "SequelizeValidationError"){
          const messages = err.errors.map((e) => e.message)
          res.send(messages)
        } else {
          res.send(err)
        }
      })
  }

  static buyPorduct(req, res) {
    const { userId, productId } = req.params
    let product = ''
    Product.findOne({
      where: {
        id: productId
      },
      include: [
        {
          model: User,
          where: {
            id: userId,
          },
          include: Balance
        }
      ]
    })
      .then(resultProduct => {
        product = resultProduct
        return Balance.validateBalance(product)
      })
      .then(result => {
        const { balance, price, status } = result
        if (status) {
          const lastBalance = balance - price
          return Balance.update({ balance: lastBalance }, { where: { UserId: userId } })
        } else {
          return `Your have to charge ${currencyIDR(Math.abs(balance - price))}`
        }

      })
      .then(result => {
        if (result == 1) {
          return res.redirect(`/products/${userId}/?succes=Buy Item`)
        } else {
          console.log(result)
          return res.redirect(`/products/${userId}/?failed=${result}`)
        }
      })
      .catch(err => {
        res.send(err)
      })
  }

  static renderEditProduct(req,res){
    Product.findByPk(req.params.id)
    .then(product =>{
      res.render("productEdit", { product })
      // res.send(product)
    })
    .catch(err =>{
      res.send(err)
    })
  }

  static updateProduct(req,res){
    const {nameProduct, imgProduct, price, description, stock} = req.body

    Product.update({nameProduct, imgProduct, price, description, stock},{
      where : {
        id : req.params.id
      }
    })
    .then(updated =>{
      res.redirect('/products')
    })
    .catch(err =>{
      res.send(err)
    })
  }


}


module.exports = ProductController