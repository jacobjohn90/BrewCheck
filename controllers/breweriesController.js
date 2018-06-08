const express = require('express')
const router = express.Router({ mergeParams: true })

const User = require('../models/User')

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

//SHOW ROUTE FOR SPECIFIC BREWERY

//EDIT ROUTE FOR SPECIFIC BREWERY

//UPDATE ROUTE FOR SPECIFIC BREWERY

//DELETE ROUTE FOR SPECIFIC BREWERY


module.exports = router