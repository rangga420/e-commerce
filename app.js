const express = require('express')
const app = express()
const path = require("path")

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use('/assets', express.static('assets'))

app.use('/registers', require('./routes/registerRoute'))

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})