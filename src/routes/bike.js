const router=require('express').Router();
const {StatusCodes} = require('http-status-codes');
const {bikes, bids} =require('../data/data.js');
const {parse} = require("nodemon/lib/cli");

//get all the products,can be filtered on ending date
router.get('',(req,res)=>{

    const endingDate = req.query.endingDate;

    let result = bikes;

    if (endingDate){
        result = bikes.filter((bike) => {
            return bike.endingDate == endingDate;
        });
        res.send(result);
    }else {
        res.send(bikes);
    }
    if (result == []){
        res.status(StatusCodes.NOT_FOUND).send(`Cannot find product with ending date: ${endingDate}`)
    }

});

//get one bike by id
router.get('/:id',(req, res) => {
    const id = req.params.id;

    let result;
    result = bikes.find((bike) => {

        return bike.id == id;

    });

    if (result == null){
        res
            .send(`Cannot find client with id: ${id}`)
            .sendStatus(StatusCodes.NOT_FOUND);
    }

    res.send(result);
});



//create a bike
router.post('',(req, res) => {
    const { brand,frameType,frameHeightInCm,endingDate } = req.body;

    let highestId = bikes[bikes.length-1].id;
    highestId++;

    if (brand && frameType && frameHeightInCm && endingDate){
        bikes.push({
            id: highestId,
            brand: brand,
            frameType: frameType,
            frameHeightInCm: frameHeightInCm,
            endingDate: endingDate
        });

        return res.status(StatusCodes.CREATED).send('Bike created successfully!');

    } else {
        return res.status(StatusCodes.NOT_FOUND).send('Something is wrong with your inputs!')
    }
});

router.put('',(req,res) => {
    const { brand,frameType,frameHeightInCm } = req.body;
    //const id = parseInt(req.params.id);
    const bodyId = parseInt(req.body.id);

    //if (id != bodyId){
    //    res.status(StatusCodes.NOT_FOUND).send('The path variable does not match the id in the body!');
    //}else {
        if (brand && frameType && frameHeightInCm) {
            for (let i = 0; i < bikes.length; i++) {
                if (bikes[i].id == bodyId){
                    bikes[i].frameType = frameType;
                    bikes[i].brand = brand;
                    bikes[i].frameHeightInCm = frameHeightInCm;
                    return res.status(StatusCodes.OK).end('The bike has been modified successfully!');
                }
            }
        }
    //}

    res.status(StatusCodes.BAD_REQUEST).end('Something is wrong with your input!');

});


module.exports=router;



