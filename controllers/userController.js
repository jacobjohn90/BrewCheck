const express = require('express');
const router = express.Router();
const User = require('../models/User')

//  GET USERS INDEX PAGE

router.get('/', function(req, res) {
  User
    .find()
    .then((listOfUsers) => {
      res.render('user/index', {
        listOfUsers
      })
    })
    .catch((err) => {
      res.send(err)
      console.log('Error getting User Index Page. Error is ' + err)
    })
});

module.exports = router;
