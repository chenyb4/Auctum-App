const router=require('express').Router();
const { bids,users,bikes } =require('../data/data.js');
const { StatusCodes } = require('http-status-codes');

//lukman please delete it later
/*
const forBike = (forBikeId) => {
   if (bikes.id.includes(forBikeId)){
      return true;
   }
};
*/


//get all bids ---it works
router.get('',(req,res)=>{

   let result = bids;
   res.send(result);

});

//get one bid by id  ---it works
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



//delete a bid by id
router.delete('/:id',((req, res) => {
   for (let bid in bids) {
      if(user.id==req.id){
         users = users.filter(x=>x.id!=req.params.id)
         return res.send(`deleted user at id ${req.params.id}`);
         // res.send('deleted user at id'+req.params.id);
      }
   }
   res.send('cannot find a user with this id');
}) );


module.exports=router;

