const router = require('express').Router();
const { v4:uuidv4 } = require('uuid');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require("bcrypt");
let { users, bikes , bids} = require('../data/data.js');
const isLoggedIn = require('../middleware/is-logged-in');
const isAdmin = require('../middleware/is-admin');
const userController=require("../controllers/user")


router.get('',isLoggedIn,userController.getAllUsers);

router.get('/:id',isLoggedIn,userController.getUserById);

router.post('',userController.createUser);

router.delete('/:id',isLoggedIn,isAdmin,userController.deleteUser);

module.exports=router;



