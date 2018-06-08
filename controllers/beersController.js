const express = require('express')
const router = express.Router({mergeParams: true})

const User = require('../models/User')
const Brewery = require('../models/Brewery')
const Beer = require('../models/Beer')

//INDEX ROUTE TO SHOW ALL BEERS
router.get('/', (req, res)=> {
    const userId = req.params.userId
    const breweryId = req.params.breweryId
    
    User
        .findById(userId)
        .then((user)=> {
            const brewery = user.brewCheck.id(breweryId)
            const beers = brewery.popularBeers
            res.render('beer/index', {
                beers,
                userId: user._id,
                brewery 
            })
        })
})
//NEW ROUTE TO ADD NEW BEER
router.get('/new', (req, res)=> {
    const userId = req.params.userId
    const breweryId = req.params.breweryId

    User
        .findById(userId)
        .then((user)=> {
            const brewery = user.brewCheck.id(breweryId)

            res.render('beer/new'), {
                userId,
                breweryId,
                brewery
            }
        })
})
//CREATE ROUTE

//SHOW ROUTE TO SHOW SPECIFIC BEER

//EDIT ROUTE TO EDIT SPECIFIC BEER

//UPDATE ROUTE

//DELETE ROUTE TO DELETE SPECIFIC BEER

module.exports = router