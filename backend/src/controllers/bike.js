let {bikes} = require("../data/data.js");
const {StatusCodes} = require("http-status-codes");


exports.getAllBikes=(req,res)=>{
    const filters=req.query;
    const filteredBikes=bikes.filter(bike=>{
        let isValid=true;
        for (const key in filters) {
            isValid = isValid && bike[key] == filters[key];
        }
        return isValid;
    });


    if (filteredBikes == []){
        res.status(StatusCodes.NOT_FOUND).send(`No bikes found.`)
    }else{
        res.status(StatusCodes.OK).send(filteredBikes);
    }
}



exports.searchBike=(req,res)=>{
    const { keyword } = req.query;

    let resultBikes = [];

    for (let bike of bikes) {
        if(bike.brand.includes(keyword)||bike.frameType.includes(keyword)||bike.frameHeightInCm.includes(keyword)){
            resultBikes.push(bike);

        }
    }

    if (resultBikes == []){
        res.status(StatusCodes.NOT_FOUND).send(`No bikes found.`)
    }else{
        res.status(StatusCodes.OK).send(resultBikes);
    }

}


exports.getBikeById=(req, res) => {
    const id = req.params.id;

    let result;
    result = bikes.find((bike) => {
        //Find one bike with specific id
        return bike.id == id;
    });

    if (result == null){
        return res.status(StatusCodes.NOT_FOUND).send(`Cannot find bike with id: ${id}`);
    }

    return res.status(StatusCodes.ACCEPTED).send(result);
}


exports.addBike=(req, res) => {
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


exports.editBike=(req,res) => {
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


exports.deleteBike=(req, res) => {

    const id = req.params.id;

    let result;
    result = bikes.find((bike) => {
        //Find one bike with specific id
        return bike.id == id;
    });


    if(result==null){
        return res.status(StatusCodes.NOT_FOUND).send('cannot find the bike with this id');
    }else {
        for (let bike in bikes) {
            if(bike.id==req.id){
                bikes = bikes.filter(x=>x.id!=req.params.id)
                return res.status(StatusCodes.NO_CONTENT).send(`deleted bike at id ${req.params.id}`);
            }
        }
    }




}

