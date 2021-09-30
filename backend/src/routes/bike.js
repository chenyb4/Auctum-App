const router=require('express').Router();
const {StatusCodes} = require('http-status-codes');
let {bikes, bids} =require('../data/data.js');
const {parse} = require("nodemon/lib/cli");

//get all the bikes
router.get('',(req,res)=>{

    const brand=req.query.brand;
    const frameType=req.query.frameType;
    const frameHeightInCm=req.query.frameHeightInCm;

    let result=bikes;

    if()


    /*const endingDate = req.query.endingDate;

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
    }*/

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


//delete a bike ---it works
router.delete('/:id',((req, res) => {
    for (let bike in bikes) {
        if(bike.id==req.id){
            bikes = bikes.filter(x=>x.id!=req.params.id)
            res.send(`deleted bike at id ${req.params.id}`);
        }
    }

    res.send('cannot find a product with this id');




}) );



module.exports=router;



