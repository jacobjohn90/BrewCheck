const express = require('express')
const router = express.Router({ mergeParams: true })

const User = require('../models/User')
const Brewery = require('../models/Brewery')

//GET TO BREWERY INDEX
router.get('/', (req, res) => {
    const userId = req.params.userId

    User.findById(userId)
        .then((user) => {
            res.render('brewery/index', {
                breweries: user.brewCheck,
                user,
            })
        })
        .catch((err) => {
            console.log('Error getting to index page of Breweries. Error is: ' + err)
        })
})

//NEW ROUTE FOR NEW BREWERY
router.get('/new', (req, res) => {
    const userId = req.params.userId
    User.findById(userId)
        .then((user)=>{
            res.render('brewery/new', {
                userId,
                user,
        })
    })
        .catch((err) => {
            console.log('Error trying to go to create a New Brewery! The error is: ' + err)
        })
})

//CREATE ROUTE FOR NEW BREWERY
router.post('/', (req, res) => {
    const brewery = new Brewery(req.body)
    if (brewery.picture === "") {
        brewery.picture = "https://source.unsplash.com/ywmJOG45hIM/100x150"
    }
    User
        .findById(req.params.userId)
        .then((user) => {
            user.brewCheck.push(brewery)
            return user.save()
        })
        .then(() => {
            res.redirect(`/users/${req.params.userId}/breweries`)
        })
        .catch((err) => {
            console.log('Error trying to create new brewery. Error is: ' + err)
        })

})

//SHOW ROUTE FOR SPECIFIC BREWERY
router.get('/:breweryId', (req, res) => {
    const userId = req.params.userId
    const breweryId = req.params.breweryId
    User
        .findById(userId)
        .then((user) => {
            const brewery = user.brewCheck.id(breweryId)
            res.render('brewery/show', {
                userId,
                brewery,
                user
            })
        })
        .catch((err) => {
            console.log('Error trying to show specific brewery. Error is: ' + err)
        })
})

//EDIT ROUTE FOR SPECIFIC BREWERY
router.get('/:breweryId/edit', (req, res) => {
    const userId = req.params.userId
    const breweryId = req.params.breweryId
    User
        .findById(userId)
        .then((user) => {
            const brewery = user.brewCheck.id(breweryId)
            const checked = brewery.tried
            console.log('value for checked is: ' + checked)
            res.render('brewery/edit', {
                userId,
                brewery,
                user,
                checked
            })
        })
})

//UPDATE ROUTE FOR SPECIFIC BREWERY
router.put('/:breweryId', (req, res) => {
    const userId = req.params.userId
    const breweryId = req.params.breweryId
    const updatedBrewery = req.body
    if (updatedBrewery.picture === "") {
        updatedBrewery.picture = "https://source.unsplash.com/ywmJOG45hIM/150x200"
    }

    User.findById(userId).then(user => {
        const brewery = user.brewCheck.id(breweryId)

        brewery.nameOfBrewery = updatedBrewery.nameOfBrewery
        brewery.location = updatedBrewery.location
        brewery.hoursOfOperation = updatedBrewery.hoursOfOperation
        brewery.tried = updatedBrewery.tried

        return user.save()
    }).then(() => {
        res.redirect(`/users/${userId}/breweries/${breweryId}`)
    })

})

//DELETE ROUTE FOR SPECIFIC BREWERY
router.delete('/:breweryId', (req, res) => {
    const userId = req.params.userId
    const breweryId = req.params.breweryId
    User
        .findById(userId)
        .then((user)=> {
            user.brewCheck.id(breweryId).remove()
            return user.save()
        })
        .then(()=> {
            res.redirect(`/users/${userId}/breweries/`)
        })

})

module.exports = router