const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/registerController')



router.get('/', ProductController.renderRegisterPage)


module.exports = router