const express = require('express')
const router = express.Router()
const RegisterController = require('../controllers/registerController')
const ControllerTest = require('../controllers/test')

router.get('/users', ControllerTest.showData)

module.exports = router