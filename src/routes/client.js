const router=require('express').Router();

let {clients} =require('../data/data.js');

//get all clients, can be filtered on gender
router.get('',(req,res)=>{

    const gender = req.query.gender;

    let result = clients;

    if (gender){
        result = clients.filter((client) => {
            return client.gender == gender;
        });
        res.send(result);
    }else {
        res.send(clients);
    }

    if (result == []){
        res
            .send(`Cannot find client with gender: ${gender}`)
            .sendStatus(StatusCodes.NOT_FOUND);
    }

});


//get one client by id
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


//delete a client on id
router.delete('/:id',((req, res) => {
    for (let client in clients) {
        if(client.id==req.id){
            clients = clients.filter(x=>x.id!=req.params.id)
            res.send('deleted client at id /:id');
        }
    }

    res.send('cannot find a client with this id');




}) );




module.exports=router;



