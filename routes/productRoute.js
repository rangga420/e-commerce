const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')


router.use((req, res, next) => {
  if (!req.session.role) {
    res.redirect('/login/users?errors=Please Login First')
  } else {
    next()
  }

})
router.get('/', ProductController.renderPageProduct)


module.exports = router