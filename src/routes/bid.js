const router=require('express').Router();
const { bids,users,bikes } =require('../data/data.js');
const { StatusCodes } = require('http-status-codes');

//get all bids
router.get('',(req,res)=>{

   const price = req.query.price;

   let result = bids;

   if (price) {
      result = bids.filter((bid) => {
         return bid.price == price;
      });
      res.send(result);
   } else {
      res.send(bids);
   }

   if (result == []) {
      res.status(StatusCodes.NOT_FOUND).send(`Cannot find bid with price: ${price}`);
   }

});

//get one bid by id
router.get('/:id',(req, res) => {
   const id = req.params.id;

   let result;
   result = bids.find((bid) => {
      return bid.id == id;
   });

   if (result == null){
      res.status(StatusCodes.NOT_FOUND).send(`Cannot find bid with id: ${id}`);
   }

   res.send(result);

});

router.post('',(req,res) => {
   const { price,placedByUserId,forBikeId } = req.body;

   let highestId = bids[bids.length-1].id;
   highestId++;

   if (price && placedByUserId && forBikeId){
      bids.push({
         id: highestId,
         price: price,
         placedByUserId: placedByUserId,
         forBikeId: forBikeId
      });

      return res.status(StatusCodes.CREATED).send('Bid placed successfully!');

   } else {
      return res.status(StatusCodes.NOT_FOUND).send('Something is wrong with your inputs!')
   }
});


module.exports=router;

