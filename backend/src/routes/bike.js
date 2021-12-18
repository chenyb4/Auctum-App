const router = require('express').Router();
const { StatusCodes } = require('http-status-codes');
let { bikes, bids } = require('../data/data.js');
const { parse } = require("nodemon/lib/cli");
const isLoggedIn = require('../middleware/is-logged-in');
const isAdmin = require('../middleware/is-admin');
const bikeController=require("../controllers/bike")


/**
 * To get bikes or specific bike, u dont need to be logged in.
 */

router.get('',isLoggedIn, bikeController.getAllBikes);


//for searching the brand a bike on auction
router.get('/search',isLoggedIn, bikeController.searchBike);


router.get('/:id',isLoggedIn,bikeController.getBikeById);

router.post('',isLoggedIn,isAdmin,bikeController.addBike);


router.put('',isLoggedIn,isAdmin,bikeController.editBike);

router.delete('/:id',isLoggedIn,isAdmin, bikeController.deleteBike);

module.exports=router;



