const {StatusCodes} =require('http-status-codes');
let {users}=require('../data/data');
const bcrypt=require('bcrypt');


const isLoggedIn= (req,res,next)=>{
    console.log('Authenticating...');
    //console.log('header data',getDataFromRequest(req));
    //next();
    const data =getDataFromRequest(req);

    if(data){
        const [email,password]=data;
        //find user with the email
        const user= users.find((user)=>{
            return user.email===email;
        });
        //console.log('user found',user);
        //if user found, check password. if not, status code unauthorized
        if(user){
            const result=bcrypt.compareSync(password, user.passwordHashValue);
            if(result){
                return next();
            }
        }

      // return next();
    }

    res.status(StatusCodes.UNAUTHORIZED).send('Something wrong with your credentials.');

};


const getDataFromRequest=(req)=>{
    const authHeader=req.headers['authorization'];

    if(authHeader){
        return authHeader.split(' ');
    }

    return false;
};

module.exports=isLoggedIn;