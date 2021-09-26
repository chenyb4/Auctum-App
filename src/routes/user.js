const router = require('express').Router();
const { users } = require('../data/data.js');
const { StatusCodes } = require('http-status-codes');

let {users} =require('../data/data.js');

//get all clients ---it works
router.get('',(req,res)=>{
    let result = users;
    res.send(result);
});

//get one client by id---- it works
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


//delete a client on id ---it works
router.delete('/:id',((req, res) => {
    for (let user in users) {
        if(user.id==req.id){
            users = users.filter(x=>x.id!=req.params.id)
            return res.send(`deleted user at id ${req.params.id}`);
           // res.send('deleted user at id'+req.params.id);
        }
    }
    res.send('cannot find a user with this id');
}) );


module.exports=router;



