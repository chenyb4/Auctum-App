const {users} = require("../data/data.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {StatusCodes} = require("http-status-codes");

const logIn = (email,password) => {
    const user = users.find((user) => {
        return user.email===email;
    });

    //if user found, check password. if not, status code unauthorized
    if(user) {
        const result = bcrypt.compareSync(password, user.passwordHashValue);
        if(result) {
            //user is authenticated, send a token
            return jwt.sign({
                id:user.id,
                role:user.role,
                name:user.name,
                email:user.email
            },user.secret);
        }
    }
    return false;
};


exports.auth=(req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if(email && password) {
        const token = logIn(email,password);
        if(token) {
            return res.status(StatusCodes.ACCEPTED).send({token});
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).send('Credentials incorrect!');
        }

    } else {
        return res.status(StatusCodes.BAD_REQUEST).send('Error in email or password!');
    }
}