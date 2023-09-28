const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')



router.get('/', ProductController.renderPageProduct)

router.get('/add', ProductController.renderAddProduct)

router.post('/add', ProductController.createAddProduct)

router.get('/edit/:id', ProductController.renderEditProduct)

router.post('/edit/:id', ProductController.updateProduct)

module.exports = router