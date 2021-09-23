const router = require('express').Router();
const { users } = require('../data/data.js');
const { StatusCodes } = require('http-status-codes');

//get all users
router.get('',(req,res)=>{
    res.status(StatusCodes.OK).send(users);
});


//get one user by id
router.get('/:id',(req, res) => {
    const id = req.params.id;

    let result;
    result = users.find((user) => {

        return user.id == id;

    });

    if (result == null){
        res
            .send(`Cannot find user with id: ${id}`)
            .sendStatus(StatusCodes.NOT_FOUND);
    }

    res.send(result);
});

router.post('',(req,res) => {
    const { name,role,email,passwordHashValue } = req.body;

    let highestId = users[users.length-1].id;
    highestId++;

    if (name && role && email && passwordHashValue){
        users.push({
            id:highestId,
            name:name,
            role:role,
            email:email,
            passwordHashValue:passwordHashValue
        });

        return res.status(StatusCodes.CREATED).send('User created successfully!');

    } else {
        return res.status(StatusCodes.NOT_FOUND).send('Something is wrong with your inputs!')
    }
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



