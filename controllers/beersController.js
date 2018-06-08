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
                userId,
                breweryId,
                brewery,
                user 
            })
        })
})
//NEW ROUTE TO ADD NEW BEER
router.get('/new', (req, res)=> {
    res.render('beer/new', {
        userId: req.params.userId,
        breweryId: req.params.breweryId
    })

})
//CREATE ROUTE
router.post('/', (req, res)=> {
    const userId = req.params.userId
    const breweryId = req.params.breweryId
    const newBeer = new Beer(req.body)

    User
        .findById(userId)
        .then((user)=> {

            const brewery = user.brewCheck.id(breweryId)
            brewery.popularBeers.push(newBeer) 
            return user.save()           
        })
        .then(()=> {
            res.redirect(`/users/${userId}/breweries/${breweryId}/beers`)
        })
        .catch((err)=> {
            console.log('Error POSTING new beer and redirecting to beers index. Error is: '+ err)
        })
})
//SHOW ROUTE TO SHOW SPECIFIC BEER

//EDIT ROUTE TO EDIT SPECIFIC BEER

//UPDATE ROUTE

//DELETE ROUTE TO DELETE SPECIFIC BEER

module.exports = router