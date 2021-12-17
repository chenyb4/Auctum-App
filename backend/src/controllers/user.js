import {StatusCodes} from "http-status-codes";
import {users} from "../data/data.js";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";

export const getAllUsers=(req,res)=>{
    res.status(StatusCodes.OK).send(users);
}


export const getUserById=(req, res) => {
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
    return res.status(StatusCodes.ACCEPTED).send(result);
}


export const createUser=(req,res) => {
    const { name,email,passwordHashValue } = req.body;

    let password;
    let highestId;

    if (users.length == 0){
        highestId = 0;
    } else {
        highestId = users[users.length-1].id;
    }
    highestId++;


    if (name && email && passwordHashValue){

        //This was moved due to some errors
        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(passwordHashValue, salt);

        users.push({
            id:highestId,
            name:name,
            //User can only be a client, admins are pre registered in the system
            role:['client'],
            email:email,
            passwordHashValue:password,
            secret: uuidv4()
        });

        return res.status(StatusCodes.CREATED).send('User created successfully!');

    } else {
        return res.status(StatusCodes.BAD_REQUEST).send('Something is wrong with your inputs!')
    }
}


export const deleteUser=(req, res) => {
    for (let user in users) {
        if(user.id == req.id){
            users = users.filter(x => x.id != req.params.id);
            return res.status(StatusCodes.NO_CONTENT).send(`deleted user at id ${req.params.id}`);
            // res.send('deleted user at id'+req.params.id);
        }
    }
    return res.status(StatusCodes.NOT_FOUND).send('cannot find a user with this id');
}