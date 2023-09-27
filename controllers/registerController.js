const { User } = require('../models')

class RegisterController {

  static renderRegisterPage(req, res) {
    res.render('registerUser')
  }

  static createRegister(req, res) {
    const { username, email, password } = req.body

    User.create({ username, email, password })
      .then(() => {
        res.redirect('/registers/users')
      })

      .catch(err => {
        res.send(err)
      })

  }

}


module.exports = RegisterController