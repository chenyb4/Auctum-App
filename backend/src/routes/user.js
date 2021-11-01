const router = require('express').Router();
const { v4:uuidv4 } = require('uuid');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require("bcrypt");
let { users, bikes , bids} = require('../data/data.js');
const isLoggedIn = require('../middleware/is-logged-in');
const isAdmin = require('../middleware/is-admin');


router.get('',isLoggedIn,(req,res)=>{
    res.status(StatusCodes.OK).send(users);
});

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
    return res.status(StatusCodes.ACCEPTED).send(result);
});


//get bikes I won
router.get('/:id/bikes-i-won',isLoggedIn,(req, res) => {
    const id = req.params.id;
    let result;
    //result is the user
    result = users.find((user) => {
        return user.id == id;
    });

    //if we dont have this user
    if (result == null){
        return res
            .send(`Cannot find user with id: ${id}`)
            .sendStatus(StatusCodes.NOT_FOUND);
    }

    //get a list of bike auctions that ended
    let bikesEnded=[];
    let today = new Date().toISOString().split("T")[0];
    for (const bike of bikes) {
        if(bike.endingDate<=today){
            bikesEnded.push(bike);
            bikesEnded=bikesEnded;
        }
    }

    //now we have an array of bikes auctions ended.
    // find the user id who placed the highest bid for every bike and place this key into the bike objects
    let bikesEndedWithWinnerId=[];
    for (const bike of bikesEnded) {
        let winnerId=-1;
        let highestBid=0;
        for (let bid of bids) {
            //if the bid is indeed for this bike, then do stuff to find the winner
            if(bid.forBikeId==bike.id){
                if(bid.price>highestBid){
                    //update the current winner id
                    winnerId=bid.placedByUserId;
                    //update the current highest bid price for comparison in the next loop
                    highestBid=bid.price;
                }
            }
        }

        bike.winnerId=winnerId;
        bike.highestBid=highestBid;
        bikesEndedWithWinnerId.push(bike);
        bikesEndedWithWinnerId=bikesEndedWithWinnerId;
    }
//after this loop, all bikes now has a winner id key, good good good

    let bikesIWon=[];
    for (let bike of bikesEndedWithWinnerId) {
       // console.log("current winner id of the bike: "+bike.winnerId);
        if(bike.winnerId==id){
            bikesIWon.push(bike);
            bikesIWon=bikesIWon;
        }
    }

    return res.status(StatusCodes.ACCEPTED).send(bikesIWon);
});



router.post('',(req,res) => {
    const { name,email,passwordHashValue } = req.body;

    let password;
    let highestId;

    if (users.length == 0){
        highestId = 0;
    } else {
        highestId = users[users.length-1].id;
    }
    highestId++;

    //what if there were no user in the data?
    //the highest user id will be undefined


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
});


router.delete('/:id',isLoggedIn,isAdmin,((req, res) => {
    for (let user in users) {
        if(user.id == req.id){
            users = users.filter(x => x.id != req.params.id);
            return res.status(StatusCodes.NO_CONTENT).send(`deleted user at id ${req.params.id}`);
           // res.send('deleted user at id'+req.params.id);
        }
    }
    return res.status(StatusCodes.NOT_FOUND).send('cannot find a user with this id');
}));

module.exports=router;



