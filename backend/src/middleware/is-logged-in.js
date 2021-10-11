const isLoggedIn= (req,res,next)=>{
    console.log('Authenticating...');
    console.log('header data',getDataFromRequest(req));
    next();
};


const getDataFromRequest=(req)=>{
    const authHeader=req.headers['authorization'];

    if(authHeader){
        return authHeader.split(' ');
    }

    return false;
};

