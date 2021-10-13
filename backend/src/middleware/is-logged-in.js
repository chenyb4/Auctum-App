const {StatusCodes} =require('http-status-codes');
let {users}=require('../data/data');
const bcrypt=require('bcrypt');
const {verify} = require("jsonwebtoken");
const jwt=require('jsonwebtoken');


const isLoggedIn= (req,res,next)=>{
    console.log('Authenticating...');

    const token =getTokenFromRequest(req);

    console.log("token before if", token);
    if(token){
        const payload=verifyToken(token);
        
        if(payload){
            req.user=payload;
            return next();
        }
    }

    res.status(StatusCodes.UNAUTHORIZED).send('Something wrong with your credentials.');

};


const getTokenFromRequest=(req)=>{
    const authHeader=req.headers['authorization'];

    if(authHeader){
        return authHeader.split(' ')[1];
    }

    return false;
};

const verifyToken=(token)=>{
    try{
        const tokenPayload=jwt.decode(token);
        console.log('Token payload',tokenPayload);
        if(tokenPayload){
            const user=users.find(user=>user.email===tokenPayload.email);
            return jwt.verify(token,user.secret);
        }
    }catch (e){
        return false;
    }



};

module.exports=isLoggedIn;