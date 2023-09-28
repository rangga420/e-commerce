const { Product, User, Conjunction, Balance } = require("../models")

class ProductController {

  static renderPageProduct(req, res) {
    let product
    const { userId } = req.params
    Product.findAll({ order: [[['price', 'DESC']]] })
      .then(productAll => {
        product = productAll
        return Product.addUserProduct(productAll, userId)
      })
      .then(() => {
        res.render('productPage', { product, userId })
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
        res.send(err)
      })
  }

  static buyPorduct(req, res) {
    const { userId, productId } = req.params
    Product.decrement({ stock: 1 }, { where: { id: productId } })
      .then(() => {
        return Product.findOne({
          where: {
            id: productId
          },
          include: [
            {
              model: User,
              include: Balance
            }
          ]
        })
      })
      .then(result => {
        res.send(result)
        // res.redirect(`/products/${userId}`)
      })

      .catch(err => {
        res.send(err)
      })
  }

}


module.exports = ProductController