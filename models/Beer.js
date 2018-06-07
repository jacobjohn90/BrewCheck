const mongoose = require('mongoose')
const beerSchema = require('../db/schemas/beerSchema')

const Beer = mongoose.model('beer', beerSchema)

module.exports = Beer