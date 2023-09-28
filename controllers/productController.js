const { Product } = require("../models")

class ProductController {

  static renderPageProduct(req,res) {

    Product.findAll()
    .then(product =>{
      res.render('productpage', { product })
    })
    .catch(err =>{
      res.send(err)
    })

  }

  static renderAddProduct(req,res){
    res.render('productAdd')
  }

  static createAddProduct(req,res){
    const {nameProduct, imgProduct, price, description, stock} = req.body
    Product.create({nameProduct, imgProduct, price, description, stock})
    .then(result =>{
      res.redirect('/products')
    })
    .catch(err =>{
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