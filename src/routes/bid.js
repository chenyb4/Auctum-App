const router=require('express').Router();

const {bids} =require('../data/data.js');
const {StatusCodes} = require('http-status-codes');

//get all bids
router.get('',(req,res)=>{

   const price = req.query.price;

   let result = bids;

   if (price){
      result = bids.filter((bid) => {
         return bid.price == price;
      });
      res.send(result);
   }else {
      res.send(bids);
   }

   if (result == []){
      res
          .send(`Cannot find bid with price: ${price}`)
          .sendStatus(StatusCodes.NOT_FOUND);
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
      res
          .send(`Cannot find bid with id: ${id}`)
          .sendStatus(StatusCodes.NOT_FOUND);
   }

   res.send(result);
});

module.exports=router;

