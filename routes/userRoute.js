const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')


router.get('/login', UserController.renderLoginPage)
router.post('/login', UserController.loginUser)

router.get('/registers', UserController.renderRegisterPage)
router.post('/registers', UserController.createRegister)

router.get('/logout', UserController.getLogoutUser)

module.exports = router