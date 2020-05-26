const { Schema, model } = require('mongoose')

const tickets = new Schema({
  id_catalog: {
    type: Schema.Types.ObjectId,
    ref: 'product'
  },
  id_user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  number_tikets: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isBuy: {
    type: Boolean,
    default: false
  }
})
module.exports = model('tickets', tickets)
