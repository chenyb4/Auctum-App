const router = require('express').Router();
let { bids,users,bikes } = require('../data/data.js');
const { StatusCodes } = require('http-status-codes');
const isLoggedIn = require('../middleware/is-logged-in');
const {getAllBids, getBidById, placeBid, deleteBid} = require("../controllers/bid");

router.get('',isLoggedIn,getAllBids);

router.get('/:id',isLoggedIn,getBidById);

/**
 * To post or delete a bid u need to be logged in
 */
router.post('',isLoggedIn,placeBid);

router.delete('/:id',isLoggedIn,deleteBid);

module.exports=router;

