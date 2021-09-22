const router=require('express').Router();

let {products} =require('../data/data.js');

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


//delete a product
router.delete('/:id',((req, res) => {
    for (let product in products) {
        if(product.id==req.id){
            products = products.filter(x=>x.id!=req.params.id)
            res.send('deleted product at id /:id');
        }
    }

    res.send('cannot find a product with this id');




}) );



module.exports=router;



