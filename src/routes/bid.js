const router=require('express').Router();
const { bids,users,bikes } =require('../data/data.js');
const { StatusCodes } = require('http-status-codes');
const e = require("express");

const forBike = (forBikeId) => {
   if (bikes.id.includes(forBikeId)){
      return true;
   }
};

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
   const { id,price,placedByUserId,forBikeId } = req.body;

   if (id && price && placedByUserId && forBikeId) {
      for (let i = 0; i < bids.length; i++) {
         if (id == bids[i].id){
            return res.status(StatusCodes.BAD_REQUEST).send(`Id must be unique! you entered (${id}) `);
         }
      }

      bids.push({
         id: id,
         price: price,
         placedByUserId: placedByUserId,
         forBikeId: forBikeId
      });

      return res.status(StatusCodes.CREATED).send("Created!");

   } else {
      return res.status(StatusCodes.BAD_REQUEST).send('Something is wrong ith your input!');
   }

});

module.exports=router;

