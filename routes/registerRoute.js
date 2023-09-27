const express = require('express')
const router = express.Router()
const RegisterController = require('../controllers/registerController')

router.get('/users', RegisterController.renderRegisterPage)

module.exports = router