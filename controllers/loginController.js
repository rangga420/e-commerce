const { User } = require('../models')
const bcrypt = require('bcryptjs');
class LoginController {

  static renderLoginPage(req, res) {
    const { errors } = req.query
    res.render('loginUser', { errors })
  }

  static loginUser(req, res) {
    const { username, password } = req.body
    User.findOne({
      where: {
        username
      }
    })
      .then(user => {
        if (user) {
          const valuePassword = bcrypt.compareSync(password, user.password)
          if (user.username && valuePassword) {
            req.session.role = user.role
            console.log('suskes login')
            return res.redirect('/products')
          } else {
            return res.redirect(`/login/users?errors=Username or Password Wrong`)
          }
        } else {
          return res.redirect(`/login/users?username=failed`)
        }
      })

      .catch(err => res.send(err))
  }
}

module.exports = LoginController