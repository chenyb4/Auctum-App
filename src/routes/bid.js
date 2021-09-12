const router=require('express').Router();

const bids=require('../data/data.js');

//get all bids
router.get('',(req,res)=>{
   res.send(bids);
});

//get one bid by id
router.get('/:id',(req, res) => {
   res.end(res.param.id);
});



module.exports=router;

