const express = require('express')
const router = express.Router({mergeParams: true})

const User = require('../models/User')

module.exports = router