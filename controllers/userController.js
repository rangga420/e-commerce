const { User, Product, Balance, Transaction } = require('../models')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
class UserController {

  static sendEmail(username, email) {
    return new Promise((resolve, reject) => {
      nodemailer.createTestAccount((err, account) => {
        if (err) {
          reject(err);
          return;
        }

        const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
            user: 'monte.lindgren44@ethereal.email',
            pass: 'dtWSaeaZxBx9Ud764h',
          },
        });

        const info = {
          from: '"Fred Foo 👻" Apparel.xyz',
          to: `raul62@ethereal.email`,
          subject: 'SUCCES LOGIN',
          text: 'Hello world?',
          html: `<p>Username: ${username}\n Email: ${email}</p>`,
        };

        transporter.sendMail(info)
          .then(result => {
            const previewURL = nodemailer.getTestMessageUrl(result);
            resolve(previewURL);
          })
          .catch(reject);
      });
    });
  }

  static renderTransactionPage(req, res) {
    const { userId } = req.params
    User.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          all: true,
        },
      ]
    })
      .then(user => {
        res.render('transactionPage', { user })
      })

      .catch(err => {
        res.send(err)
      })

  }

  static renderBalancePage(req, res) {
    res.render('balancesUser')
  }

  static addBalance(req, res) {
    const { balance } = req.body
    const { userId } = req.params
    Balance.increment({ balance }, { where: { UserId: userId } })
      .then(() => {
        res.redirect(`/products/${userId}`)
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

  static renderUserPage(req, res) {
    const { userId } = req.params
    User.findByPk(userId)
      .then(user => {
        res.render('editUser', { user })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static updateUser(req, res) {
    const { userId } = req.params
    const { username, email } = req.body
    User.update({ username, email }, {
      where: {
        id: userId
      }
    })
      .then(result => {
        res.redirect(`/users/edit/${req.params.userId}`)
      })
      .catch(err => {
        res.send(err)
      })
  }

  static loginUser(req, res) {
    const { username, password } = req.body
    let dataUser = ''
    User.findOne({
      where: {
        username
      }
    })
      .then(user => {
        if (user) {
          const valuePassword = bcrypt.compareSync(password, user.password)
          if (user.username && valuePassword) {
            dataUser = user
            req.session.role = user.role
            return UserController.sendEmail(user.username, user.email)
          }
        }
      })

      .then(result => {
        if (result) {
          return res.redirect(`/products/${dataUser.id}`)
        } else {
          return res.redirect(`/users/login?errors=Username or Password Wrong`)
        }
      })

      .catch(err => {
        console.log(err)
        res.send(err)
      })
  }

  static createRegister(req, res) {
    const { username, email, password } = req.body

    User.create({ username, email, password })
      .then((result) => {
        User.addValueBalance(result.id)
        res.redirect('/users/login')
      })

      .catch(err => {
        console.log(err)
        res.send(err)
      })

  }

  static getLogoutUser(req, res) {
    req.session.destroy((err) => err ? res.send(err) : res.redirect('/users/login'))
  }

}


module.exports = UserController