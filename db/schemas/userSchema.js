const Schema = require('mongoose').Schema
const brewerySchema = require('./brewerySchema')

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    profilePicture: String,
    favoriteBeer: String,
    favoriteBrewery: String,
    BrewCheck: [brewerySchema]
})

module.exports = userSchema