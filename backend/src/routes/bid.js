const router=require('express').Router();
let { bids,users,bikes } =require('../data/data.js');
const { StatusCodes } = require('http-status-codes');
const isLoggedIn=require('../middleware/is-logged-in');


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
      return res.status(StatusCodes.NOT_FOUND).send(`Cannot find bid with id: ${id}`);
   }
   return res.send(result);

});

router.post('',isLoggedIn,(req,res) => {
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

//delete a bid by id ---it works
router.delete('/:id',isLoggedIn,((req, res) => {
   for (let bid in bids) {
      if(bid.id==req.id){
         bids = bids.filter(x=>x.id!=req.params.id)
         return res.send(`deleted bid at id ${req.params.id}`);
         // res.send('deleted user at id'+req.params.id);
      }
   }
   return res.send('cannot find a user with this id');
}) );


module.exports=router;

