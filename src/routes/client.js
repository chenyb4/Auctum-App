const router=require('express').Router();

const {clients} =require('../data/data.js');


//get all the clients
router.get('',(req,res)=>{
    res.send(clients);
});


//get one client by id
router.get('/:id',(req, res) => {
    res.end(res.param.id);
});


//create one client
router.post('',((req, res) => {

}))

module.exports=router;



