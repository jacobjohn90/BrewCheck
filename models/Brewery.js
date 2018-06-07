const mongoose = require('mongoose')
const brewerySchema = require('../db/schemas/brewerySchema')

const Brewery = mongoose.model('brewery', brewerySchema)

module.exports = Brewery