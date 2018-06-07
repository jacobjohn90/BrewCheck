const express = require('express')
const router = express.Router({mergeParams: true})

const User = require('../models/User')

//GET TO BREWERY INDEX
router.get('/', (req, res)=> {
    const userId = req.params.userId

    User.findById(userId)
        .then((user)=>{
            res.render('brewery/index', {
                breweries: user.brewCheck,
                user,
            })
        })
        .catch((err)=> {
            console.log('Error getting to index page of Breweries. Error is: ' + err)
        })
})

module.exports = router