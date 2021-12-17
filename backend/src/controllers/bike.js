import {bikes} from "../data/data.js";
import {StatusCodes} from "http-status-codes";

export const getAllBikes=(req,res)=>{
    const { brand,frameType,frameHeightInCm } = req.query;

    let resultBikes = bikes;

    if(brand){
        resultBikes=resultBikes.filter((bike)=>{
            return bike.brand==brand;
        });
    }

    if(frameType){
        resultBikes=resultBikes.filter((bike)=>{
            return bike.frameType==frameType;
        });
    }

    if(frameHeightInCm){
        resultBikes=resultBikes.filter((bike)=>{
            return bike.frameHeightInCm==frameHeightInCm;
        });
    }

    if (resultBikes == []){
        res.status(StatusCodes.NOT_FOUND).send(`Cannot find product with ending date: ${endingDate}`)
    }else{
        res.status(StatusCodes.OK).send(resultBikes);
    }

}



export const searchBike=(req,res)=>{
    const { keyword } = req.query;

    let resultBikes = [];

    for (let bike of bikes) {
        if(bike.brand.includes(keyword)||bike.frameType.includes(keyword)||bike.frameHeightInCm.includes(keyword)){
            resultBikes.push(bike);

        }
    }

    if (resultBikes == []){
        res.status(StatusCodes.NOT_FOUND).send(`Cannot find product with ending date: ${endingDate}`)
    }else{
        res.status(StatusCodes.OK).send(resultBikes);
    }
}


export const getBikeById=(req, res) => {
    const id = req.params.id;

    let result;
    result = bikes.find((bike) => {
        //Find one bike with specific id
        return bike.id == id;
    });

    if (result == null){
        return res
            .send(`Cannot find client with id: ${id}`)
            .sendStatus(StatusCodes.NOT_FOUND);
    }

    return res.status(StatusCodes.ACCEPTED).send(result);
}



export const addBike=(req, res) => {
    const { brand,frameType,frameHeightInCm,endingDate } = req.body;

    let highestId = bikes[bikes.length-1].id;
    highestId++;

    //We need to add something here if there is no bike because the highest id then will be undefined

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
}


export const editBike=(req,res) => {
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
                return res.status(StatusCodes.ACCEPTED).end('The bike has been modified successfully!');
            }
        }
    }
    //}
    return res.status(StatusCodes.BAD_REQUEST).end('Something is wrong with your input!');
}


export const deleteBike=(req, res) => {
    for (let bike in bikes) {
        if(bike.id==req.id){
            bikes = bikes.filter(x=>x.id!=req.params.id)
            return res.status(StatusCodes.NO_CONTENT).send(`deleted bike at id ${req.params.id}`);
        }
    }
    return res.status(StatusCodes.NOT_FOUND).send('cannot find the bike with this id');
}