const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')


router.use((req, res, next) => {
  console.log('jalan kah')
  if (req.session.role === 'Customers' || req.session.role === 'Admin') {
    next()
  } else {
    res.redirect('/users/login?errors=Please Login First')
  }

})
router.get('/:userId', ProductController.renderPageProduct)
router.get('/:userId/buy/:productId', ProductController.buyPorduct)


module.exports = router