const { Product } = require("../models")

class ProductController {

  static renderPageProduct(req, res) {

    Product.findAll()
      .then(product => {
        res.render('productpage', { product })
      })
      .catch(err => {
        res.send(err)
      })

  }

}


module.exports = ProductController