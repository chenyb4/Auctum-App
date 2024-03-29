const express =require('express');
const port=3000;
const app=express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
//routers
app.use('/bids',require('./routes/bid'));
app.use('/users',require('./routes/user'));
app.use('/bikes',require('./routes/bike'));
app.use('/credentials',require('./routes/credentials'));

app.listen(port,function(){
    console.log(`Our auction API is running on port ${port}!`);
});

