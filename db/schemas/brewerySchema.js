const Schema = require('mongoose').Schema
const beerSchema = require('./beerSchema')

const brewerySchema = new Schema ({
    nameofBrewery: {
        type: String,
        require: true
    },
    picture: String,
    location: String,
    hoursOfOperation: String,
    popularBeers: [beerSchema],
    Tried: Boolean,
})

module.exports = brewerySchema