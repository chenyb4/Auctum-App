const router = require('express').Router();
const { v4:uuidv4 } = require('uuid');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require("bcrypt");
let { users, bikes , bids} = require('../data/data.js');
const isLoggedIn = require('../middleware/is-logged-in');
const isAdmin = require('../middleware/is-admin');
const {getAllUsers, getUserById, createUser, deleteUser} = require("../controllers/user");


router.get('',isLoggedIn,getAllUsers);

router.get('/:id',isLoggedIn,getUserById);

router.post('',createUser);

router.delete('/:id',isLoggedIn,isAdmin,deleteUser);

module.exports=router;



