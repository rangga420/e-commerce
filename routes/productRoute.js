const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')



router.get('/', ProductController.renderPageProduct)

router.get('/add', ProductController.renderAddProduct)

router.post('/add', ProductController.createAddProduct)

module.exports = router