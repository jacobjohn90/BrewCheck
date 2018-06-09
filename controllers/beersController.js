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
router.get('/:beerId', (req, res) => {
    const userId = req.params.userId
    const breweryId = req.params.breweryId
    const beerId = req.params.beerId

    User
        .findById(userId)
        .then((user)=> {
            const brewery = user.brewCheck.id(breweryId)
            const beer = brewery.popularBeers.id(beerId)

            res.render('beer/show', {
                user,
                brewery,
                beer
            })
        })
        .catch((err)=> {
            console.log('Error showing specific beer. Error is: ' + err)
        })
})
//EDIT ROUTE TO EDIT SPECIFIC BEER
router.get('/:beerId/edit', (req, res)=> {
    const userId = req.params.userId
    const breweryId = req.params.breweryId
    const beerId = req.params.beerId

    User
        .findById(userId)
        .then((user)=> {
            const brewery = user.brewCheck.id(breweryId)
            const beer = brewery.popularBeers.id(beerId)

            res.render('beer/edit', {
                user,
                brewery,
                beer
            })
            .catch((err)=> {
                console.log('Error trying to go to Edit Page for beer. Error is: ' + err)
            })
        })
})
//UPDATE ROUTE
router.put('/:beerId', (req, res)=> {
    const userId = req.params.userId
    const breweryId = req.params.breweryId
    const beerId = req.params.beerId
    const updatedBeer = req.body

    User
        .findById(userId)
        .then((user)=> {
            const brewery = user.brewCheck.id(breweryId)
            const beer = brewery.popularBeers.id(beerId)

            beer.name = updatedBeer.name
            beer.type = updatedBeer.type
            beer.abv = updatedBeer.abv
            beer.tried = updatedBeer.tried
            beer.rating = updatedBeer.rating

            return user.save()
        })
        .then(()=> {
            res.redirect(`/users/${userId}/breweries/${breweryId}/beers/${beerId}`)
        })
        .catch((err)=> {
            console.log('Error Updating Beer Info. Error is: ' + err)
        })

})
//DELETE ROUTE TO DELETE SPECIFIC BEER
router.delete('/:beerId', (req, res)=> {
    const userId = req.params.userId
    const breweryId = req.params.breweryId
    const beerId = req.params.beerId

    User
        .findById(userId)
        .then((user)=> {
            user.brewCheck.id(breweryId).popularBeers.id(beerId).remove()
            return user.save()
        })
        .then(()=> {
            res.redirect(`/users/${userId}/breweries/${breweryId}/beers`)
        })
        .catch((err)=> {
            console.log('Error trying to delete specific beer. Error is: ' + err)
        })
})

module.exports = router