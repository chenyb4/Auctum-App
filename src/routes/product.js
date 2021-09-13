const router=require('express').Router();

const {products} =require('../data/data.js');

router.get('',(req,res)=>{
    res.send(products);
});

module.exports=router;



