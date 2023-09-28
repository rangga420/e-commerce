const express = require('express')
const router = express.Router()
const LoginController = require('../controllers/loginController')

router.get('/users', LoginController.renderLoginPage)
router.post('/users', LoginController.loginUser)


module.exports = router