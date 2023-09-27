const express = require('express')
const router = express.Router()
const LoginController = require('../controllers/loginController')


router.get('/users', LoginController.renderLoginPage)


module.exports = router