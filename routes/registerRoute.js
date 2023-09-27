const express = require('express')
const router = express.Router()
const RegisterController = require('../controllers/registerController')

router.get('/users', RegisterController.renderRegisterPage)
router.post('/users', RegisterController.createRegister)

module.exports = router