const Schema = require('mongoose').Schema
const beerSchema = require('./beerSchema')

const brewerySchema = new Schema ({
    nameOfBrewery: {
        type: String,
        require: true
    },
    picture: String,
    location: String,
    hoursOfOperation: String,
    popularBeers: [beerSchema],
    tried: Boolean,
})

module.exports = brewerySchema