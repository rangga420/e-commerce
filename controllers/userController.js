const { User, Product, Balance } = require('../models')
const bcrypt = require('bcryptjs')

class UserController {

  static renderBalancePage(req, res) {
    res.render('balancesUser')
  }

  static addBalance(req, res) {

    const { balance } = req.body
    const { userId } = req.params
    User.increment("balance", {
      include: Balance,
      where: { id: userId }
    })
      .then((balance) => {
        console.log(balance)
        res.send(balance)
      })
      .catch(err => {
        res.send(err)
      })
  }






  static renderLoginPage(req, res) {
    const { errors } = req.query
    res.render('loginUser', { errors })
  }

  static renderRegisterPage(req, res) {
    res.render('registerUser')
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
            return res.redirect(`/products/${user.id}`)
          } else {
            return res.redirect(`/users/login?errors=Username or Password Wrong`)
          }
        } else {
          return res.redirect(`/users/login?username=failed`)
        }
      })

      .catch(err => res.send(err))
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

  static getLogoutUser(req, res) {
    req.session.destroy((err) => err ? res.send(err) : res.redirect('/users/login'))
  }

}


module.exports = UserController