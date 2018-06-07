const mongoose = require('mongoose')
const User = require('../models/User')
const Brewery = require('../models/Brewery')
const Beer = require('../models/Beer')

// Connect to Database
mongoose.connect('mongodb://localhost/BrewCheck')
    .then(() => {
        console.log('Connected to mongoDB')
    })
    .catch((err) => {
        console.log('Error connecting to mongoDB. This is the error: ' + err)
    })

//Removing old Data and adding new test users
User.remove({})
    .then(() => {
        const test1User = new User({
            username: 'Test_1Name',
            favoriteBeer: 'Beer1',
            favoriteBrewery: 'Brewery1'
        })

        const brewery1 = new Brewery({
            nameOfBrewery: 'Brewery1',
            picture: 'www.brewery1.com',
            location: 'location1',
            hoursOfOperation: 'test1-test2',
            tried: false,
        })
        const beer1 = new Beer({
            name: 'beer1',
            type: 'type1',
            abv: 1,
            tried: false,
            rating: 1,
        })
        brewery1.popularBeers.push(beer1)

        const brewery2 = new Brewery({
            nameOfBrewery: 'Brewery2',
            picture: 'www.brewery2.com',
            location: 'location2',
            hoursOfOperation: 'test2-test3',
            tried: true,
        })
        const beer2 = new Beer({
            name: 'beer2',
            type: 'type2',
            abv: 2,
            tried: true,
            rating: 2,
        })
        brewery2.popularBeers.push(beer2)
        test1User.brewCheck.push(brewery1, brewery2)

        return test1User.save()
    })
    .then(() => {
        return User.create({
            username: 'Test_2Name',
            profilePicture: 'www.test2.com',
            favoriteBeer: 'Beer2',
            favoriteBrewery: 'Brewery2',
        })
    })
    .then((test2u) => {
        const brewery3 = new Brewery({
            nameOfBrewery: 'Brewery3',
            picture: 'www.brewery3.com',
            location: 'location3',
            hoursOfOperation: 'test3-test4',
            tried: false,
        })
        const brewery4 = new Brewery({
            nameOfBrewery: 'Brewery4',
            picture: 'www.brewery4.com',
            location: 'location4',
            hoursOfOperation: 'test4-test5',
            tried: false,
        })
        test2u.brewCheck.push(brewery3, brewery4)

        return test2u.save()
    })
    .catch((err) => {
        console.log('ERROR SAVING SEEDED DATA!!! Error is = ' + err)
    })
    .then(() => {
        mongoose.connection.close()
        console.log(`
            ----------------------------
              SEEDING DATABASE FINISHED
              DISCONNECTED FROM MongoDB
            ----------------------------
        `)
    })
