const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')

// router.use((req, res, next) => {
//   if (req.session.role === 'Customers' || req.session.role === 'Admin') {
//     next()
//   } else {
//     res.redirect('/users/login?errors=Please Login First')
//   }

// })
router.get('/:userId', ProductController.renderPageProduct)
router.get('/:userId/buy/:productId', ProductController.buyPorduct)

// router.use((req, res, next) => {
//   if (req.session.role === 'Admin') {
//     next()
//   } else {
//     res.redirect('/users/login?errors=Please Login First')
//   }

// })

router.get('/admin/list', ProductController.renderListPage)

router.get('/:id/edit', ProductController.renderEditProduct)

router.post('/:id/edit', ProductController.updateProduct)
router.get('/:id/delete', ProductController.deleteProduct)

router.get('/admin/add/', ProductController.renderAddProduct)

router.post('/admin/add', ProductController.createAddProduct)







module.exports = router