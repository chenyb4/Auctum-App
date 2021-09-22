const router=require('express').Router();

const {products} =require('../data/data.js');

//get all the products,can be filtered on ending date
router.get('',(req,res)=>{

    const endingDate = req.query.endingDate;

    let result = products;

    if (endingDate){
        result = products.filter((product) => {
            return product.endingDate == endingDate;
        });
        res.send(result);
    }else {
        res.send(product);
    }

    if (result == []){
        res
            .send(`Cannot find product with ending date: ${endingDate}`)
            .sendStatus(StatusCodes.NOT_FOUND);
    }

});

//get one product by id
router.get('/:id',(req, res) => {
    const id = req.params.id;

    let result;
    result = clients.find((client) => {

        return client.id == id;

    });

    if (result == null){
        res
            .send(`Cannot find client with id: ${id}`)
            .sendStatus(StatusCodes.NOT_FOUND);
    }

    res.send(result);
});


//create a product
/*router.post('',((req, res) => {
    let name=req.params.name;

}));*/


module.exports=router;



