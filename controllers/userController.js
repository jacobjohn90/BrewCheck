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

// NEW USER ROUTE
router.get('/new', (req, res) => {
  res.render('user/new')
})

// CREATE USER ROUTE
router.post('/', (req, res) => {
  const newUser = req.body
  if (newUser.profilePicture === "") {
    newUser.profilePicture = "https://source.unsplash.com/100x150/?profile"
  }
  User
    .create(newUser)
    .then(()=> {
      res.redirect('/users')
    })
    .catch ((err) => {
      res.send(err)
      console.log('Error creating new user. The error is: ' + err)
    })
})

// SHOW ROUTE FOR SPECIFIC USER
router.get('/:userId', (req, res) => {
  const userId = req.params.userId
  User.findById(userId)
    .then((user) => {
      res.render('user/show', {
        user
      })
    })
    .catch((err)=>{
      console.log('Error showing specific user. Error is: ' + err)
    })
})

//EDIT SPECIFIC USER
router.get('/:userId/edit', (req, res) => {
  const userId = req.params.userId

  User.findById(userId)
    .then((user)=> {
      res.render('user/edit', {
        user
      })
    })
    .catch((err) => {
      console.log('Error trying to go to the Edit User Page. Error is ' + err)
    })
})

//UPDATE ROUTE
router.put('/:userId', (req, res) => {
  const updatedUser = req.body
  if (updatedUser.profilePicture === "") {
    updatedUser.profilePicture = "https://source.unsplash.com/100x150/?profile"
  }
  User
    .findByIdAndUpdate(req.params.userId, req.body, {new: true})
    .then(()=> {
      res.redirect(`/users/${req.params.userId}`)
    })
    .catch((err) => {
      console.log('Error trying to Update User. Error is: ' + err)
    })
})

//DELETE ROUTE
router.delete('/:userId', (req,res) => {
  User
    .findByIdAndRemove(req.params.userId)
    .then(()=> {
      console.log(`Successfully Deleted ${req.params.userId.username}`)
      res.redirect('/users')
    })
})

module.exports = router;
