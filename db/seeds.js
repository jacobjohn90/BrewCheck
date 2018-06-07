const mongoose = require('mongoose')
const User = require('../models/User')
const Brewery = require('../models/Brewery')
const Beer = require('../models/Beer')

// Connect to Database
mongoose.connect('mongodb://localhost/BrewCheck')
    .then(() => {
        console.log( 'Connected to mongoDB')
    })
    .catch((err) => {
        console.log('Error connecting to mongoDB. This is the error: ' + err)
    })

//Remove old Homework Data
