const router=require('express').Router();

const {products} =require('../data/data.js');

//get all the products
router.get('',(req,res)=>{
    res.send(products);
});

//get one product by id
router.get('/:id',(req, res) => {
    res.end(res.param.id);
});



module.exports=router;



