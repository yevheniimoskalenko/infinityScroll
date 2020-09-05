const express = require('express')
const mongoose = require('mongoose')
const parination = require('./routers/pagination.routes')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/', parination)
module.exports = app
