const express = require('express')
const app = express()
const path = require("path")
const session = require("express-session")


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('assets'))
app.use('/assets', express.static('assets'))
app.use(express.urlencoded({ extended: true }))


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

app.use('/users', require('./routes/userRoute'))


app.use('/products', require('./routes/productRoute'))
// app.use('/products', require('./routes/usersMiddleware'))


app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})