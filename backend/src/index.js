const express =require('express');
const port=3000;
const app=express();



app.use(express.json());
//routers
app.use('/bids',require('./routes/bid'));
app.use('/users',require('./routes/user'));
app.use('/bikes',require('./routes/bike'));

app.listen(port,function(){
    console.log(`Our auction API is running on port ${port}!`);
});

