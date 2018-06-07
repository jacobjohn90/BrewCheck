const Schema = require('mongoose').Schema

const beerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: String,
    abv: Number,
    Tried: Boolean,
    rating: Number
})

module.exports = beerSchema