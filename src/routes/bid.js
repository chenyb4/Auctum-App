const router=require('express').Router();

const bids=require('../data/data.js');

router.get('',(req,res)=>{
   res.send('bids');
});

module.exports=router;

