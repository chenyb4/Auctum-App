const router = require('express').Router();
const { StatusCodes } = require('http-status-codes');
let { bikes, bids } = require('../data/data.js');
const { parse } = require("nodemon/lib/cli");
const isLoggedIn = require('../middleware/is-logged-in');
const isAdmin = require('../middleware/is-admin');
const {getAllBikes, searchBike, getBikeById, addBike, editBike, deleteBike} = require("../controllers/bike");


router.get('',isLoggedIn,getAllBikes );

//for searching the brand a bike on auction
router.get('/search',isLoggedIn, searchBike);

router.get('/:id',isLoggedIn,getBikeById);

router.post('',isLoggedIn,isAdmin,addBike);

router.put('',isLoggedIn,isAdmin,editBike);

router.delete('/:id',isLoggedIn,isAdmin, deleteBike);

module.exports=router;



