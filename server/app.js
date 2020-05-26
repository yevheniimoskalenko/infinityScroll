const express = require('express')
const mongoose = require('mongoose')
const parination = require('./routers/pagination.routes')
const app = express()
mongoose
  .connect(
    'mongodb+srv://yevhenii:was123456789was@cluster0-vrxpp.mongodb.net/test',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log('connect has started...')
  })
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', parination)
module.exports = app
