const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')


router.get('/login', UserController.renderLoginPage)
router.post('/login', UserController.loginUser)

router.get('/registers', UserController.renderRegisterPage)
router.post('/registers', UserController.createRegister)

router.get('/logout', UserController.getLogoutUser)

router.get('/balances/:userId', UserController.renderBalancePage)
router.post('/balances/:userId', UserController.addBalance)

router.get('/edit/:userId', UserController.renderUserPage)
router.post('/edit/:userId', UserController.updateUser)

router.get('/transactions/:userId', UserController.renderTransactionPage)

module.exports = router