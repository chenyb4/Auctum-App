const router = require('express').Router();
const {v4:uuidv4}=require('uuid');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require("bcrypt");
let {users} =require('../data/data.js');
const isLoggedIn=require('../middleware/is-logged-in');
const isAdmin=require('../middleware/is-admin');

//get all clients ---it works
router.get('',isLoggedIn,(req,res)=>{
    let result = users;
    res.send(result);
});

//get one client by id---- it works
router.get('/:id',isLoggedIn,(req, res) => {
    const id = req.params.id;
    let result;
    result = users.find((user) => {
        return user.id == id;
    });
    if (result == null){
        return res
            .send(`Cannot find user with id: ${id}`)
            .sendStatus(StatusCodes.NOT_FOUND);
    }
    return res.send(result);
});

//Does work
router.post('',(req,res) => {
    const { name,email,password } = req.body;

    let passwordHashValue;

    const salt = bcrypt.genSaltSync(10);
    passwordHashValue = bcrypt.hashSync(password, salt);

    let highestId = users[users.length-1].id;
    highestId++;

    if (name && email && passwordHashValue){
        users.push({
            id:highestId,
            name:name,
            role:['client'],
            email:email,
            passwordHashValue:passwordHashValue,
            secret: uuidv4()
        });

        return res.status(StatusCodes.CREATED).send('User created successfully!');

    } else {
        return res.status(StatusCodes.NOT_FOUND).send('Something is wrong with your inputs!')
    }
});


//delete a client on id ---it works
router.delete('/:id',isLoggedIn,isAdmin,((req, res) => {
    for (let user in users) {
        if(user.id==req.id){
            users = users.filter(x=>x.id!=req.params.id)
            return res.send(`deleted user at id ${req.params.id}`);
           // res.send('deleted user at id'+req.params.id);
        }
    }
    return res.send('cannot find a user with this id');
}) );


module.exports=router;



