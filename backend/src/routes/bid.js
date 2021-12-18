const router = require('express').Router();
let { bids,users,bikes } = require('../data/data.js');
const { StatusCodes } = require('http-status-codes');
const isLoggedIn = require('../middleware/is-logged-in');
const bidController=require("../controllers/bid")

router.get('',isLoggedIn,bidController.getAllBids);

router.get('/:id',isLoggedIn,bidController.getBidById);

/**
 * To post or delete a bid u need to be logged in
 */

router.post('',isLoggedIn,bidController.placeBid);


router.delete('/:id',isLoggedIn,bidController.deleteBid);

module.exports=router;

