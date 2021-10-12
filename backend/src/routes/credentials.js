const router=require('express').Router();
let { bids,users,bikes } =require('../data/data.js');
const { StatusCodes } = require('http-status-codes');
const isLoggedIn=require('../middleware/is-logged-in');
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');

const logIn=(email,password)=>{
    const user= users.find((user)=>{
        return user.email===email;
    });

    //if user found, check password. if not, status code unauthorized
    if(user){
        const result=bcrypt.compareSync(password, user.passwordHashValue);
        if(result){
            //user is authenticated, send a token
            return jwt.sign({
                email:user.email,
                role:user.role
            },user.secret);
        }
    }


    return false;
};

router.post('',(req, res) => {
    const email=req.body.email;
    const password=req.body.password;

    if(email&&password){
        const token=logIn(email,password);
        if(token){
            res.send({token:token});
        }else{
            res.status(StatusCodes.UNAUTHORIZED).send('credentials incorrect!');
        }

    }else{
        res.status(StatusCodes.BAD_REQUEST).send('Required parameters missing!');
    }


    //Header: Authorization:
    //Body

});

module.exports=router;
