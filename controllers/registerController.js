const { User } = require('../models')
const bcrypt = require('bcryptjs');
class RegisterController {

  static renderRegisterPage(req, res) {
    // var salt = bcrypt.genSaltSync(10);
    // console.log(bcrypt.hashSync("password", salt))
    // console.log(bcrypt.compareSync("passwordd", "$2a$10$3T/aqfmxvIJQXrPJIYAQNeotDnhzGitia8MthXkTRRhXWb0vOrF3a"))
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