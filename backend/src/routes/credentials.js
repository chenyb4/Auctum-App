const router = require('express').Router();
let { bids,users,bikes } = require('../data/data.js');
const { StatusCodes } = require('http-status-codes');
const isLoggedIn = require('../middleware/is-logged-in');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const credentialsController=require("../controllers/credentials");

router.post('',credentialsController.auth);

module.exports=router;

