const express =require('express');
const app=express();
const port=3000;

//routers
app.use('/bids',require('./routes/bid'));
app.use('/clients',require('./routes/client'));
app.use('/products',require('./routes/product'));


app.listen(port,function(){
    console.log('Our auction API is running on port ${port}!');
});

