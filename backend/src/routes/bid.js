const router = require('express').Router();
let { bids,users,bikes } = require('../data/data.js');
const { StatusCodes } = require('http-status-codes');
const isLoggedIn = require('../middleware/is-logged-in');

router.get('',isLoggedIn,(req,res)=>{
   res.status(StatusCodes.OK).send(bids);
});

router.get('/:id',isLoggedIn,(req, res) => {
   const id = req.params.id;
   let result;

   //Find the bid with the given id using .find in arrays method
   result = bids.find((bid) => {
      return bid.id == id;
   });

   if (result == null){
      return res.status(StatusCodes.NOT_FOUND).send(`Cannot find bid with id: ${id}`);
   }
   return res.status(StatusCodes.ACCEPTED).send(result);

});

/**
 * To post or delete a bid u need to be logged in
 */

router.post('',isLoggedIn,(req,res) => {
   const { price,placedByUserId,forBikeId } = req.body;

   let highestId = bids[bids.length-1].id;
   highestId++;

   //what if there were no bids in the data?
   //the highest bid id will be undefined

   if (price && placedByUserId && forBikeId){
      //Add the data to the array
      bids.push({
         id: highestId,
         price: price,
         placedByUserId: placedByUserId,
         forBikeId: forBikeId
      });
      return res.status(StatusCodes.CREATED).send('Bid placed successfully!');

   } else {
      return res.status(StatusCodes.BAD_REQUEST).send('Something is wrong with your inputs!')
   }
});


router.delete('/:id',isLoggedIn,((req, res) => {

   for (let bid in bids) {
      if(bid.id==req.id){
         //Filter the data so it can be deleted using .filter method in arrays
         bids = bids.filter(x => x.id != req.params.id);
         return res.status(StatusCodes.NO_CONTENT).send(`deleted bid at id ${req.params.id}`);
         // res.send('deleted user at id'+req.params.id);
      }
   }
   return res.status(StatusCodes.NOT_FOUND).send('cannot find a user with this id');
}));

module.exports=router;

