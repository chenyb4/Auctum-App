const router=require('express').Router();

const clients=require('../data/data.js');

router.get('',(req,res)=>{
    res.send(clients);
});

module.exports=router;



