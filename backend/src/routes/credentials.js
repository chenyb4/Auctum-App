const router = require('express').Router();
let { bids,users,bikes } = require('../data/data.js');
const { StatusCodes } = require('http-status-codes');
const isLoggedIn = require('../middleware/is-logged-in');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {auth} = require("../controllers/credentials");



router.post('',auth);

module.exports=router;

