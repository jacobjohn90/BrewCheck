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

    res.render('brewery/new', {
        userId
    })
        .catch((err) => {
            console.log('Error trying to go to create a New Brewery! The error is: ' + err)
        })
})
//CREATE ROUTE FOR NEW BREWERY
router.post('/', (req, res) => {
    const brewery = new Brewery(req.body)
    User
        .findById(req.params.userId)
        .then((user) => {
            user.brewCheck.push(brewery)
            return user.save()
        })
        .then(() => {
            res.redirect(`/users/${req.params.userId}/breweries`)
        })
        .catch((err)=> {
            console.log('Error trying to create new brewery. Error is: ' + err)
        })

})
//SHOW ROUTE FOR SPECIFIC BREWERY
router.get('/:breweryId', (req, res) => {
    const userId = req.params.userId
    const breweryId = req.params.breweryId
    User
        .findById(userId)
        .then((user)=> {
            const brewery = user.brewCheck.id(breweryId)
            res.render('brewery/show', {
                userId,
                brewery,
                user
            })
        })
        .catch((err)=> {
            console.log('Error trying to show specific brewery. Error is: ' + err)
        })
})
//EDIT ROUTE FOR SPECIFIC BREWERY

//UPDATE ROUTE FOR SPECIFIC BREWERY

//DELETE ROUTE FOR SPECIFIC BREWERY


module.exports = router