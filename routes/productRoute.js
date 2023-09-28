const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')


// router.use((req, res, next) => {
//   if (!req.session.role) {
//     res.redirect('/users/login?errors=Please Login First')
//   } else {
//     next()
//   }

// })


router.get('/add', ProductController.renderAddProduct)

router.post('/add', ProductController.createAddProduct)


router.get('/list', (req, res) => {
  res.send('product list')
})


router.get('/:id/edit', ProductController.renderEditProduct)

router.post('/:id/edit', ProductController.updateProduct)

router.get('/:userId', ProductController.renderPageProduct)

router.get('/:userId/buy/:productId', ProductController.buyPorduct)


module.exports = router