const { User, Product, Balance, Transaction } = require('../models')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
class UserController {
  static sendMail(username) {
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
            user: account.user,
            pass: account.pass,
          },
        });

        const info = {
          from: '"Fred Foo 👻" esther.rath25@ethereal.email',
          to: 'carolyn87@ethereal.email',
          subject: 'SUKSES LOGIN',
          text: 'Hello world?',
          html: `<p>Username: ${username}</p>\n<p>Email: ${username}</p>`,
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
        // res.send(user)
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
          dataUser = user
          const valuePassword = bcrypt.compareSync(password, user.password)
          if (user.username && valuePassword) {
            req.session.role = user.role
            return UserController.sendMail(user.username)
          }
        }
      })

      .then(result => {
        if (result) {
          console.log(result)
          return res.redirect(`/products/${dataUser.id}`)
        } else {
          return res.redirect(`/users/login?errors=Username or Password Wrong`)
        }
      })

      .catch(err => {
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