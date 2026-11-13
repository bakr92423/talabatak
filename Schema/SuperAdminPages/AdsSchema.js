const mongoose = require('mongoose')

const adSchema = new mongoose.Schema({
  image: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('Ad', adSchema)