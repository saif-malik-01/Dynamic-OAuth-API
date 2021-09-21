const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const register = require('./api-v1/routes/register');
const DB = require('./api-v1/utils/database');
const dump = require('./api-v1/routes/dump');
require('./api-v1/utils/cache')
require('dotenv').config();
DB.connect(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const PORT = 3000;

app.use('/v1',register);
app.use('/v1',dump);
app.get('/',(req,res)=>{
    res.redirect('/v1/register');
})


app.listen(PORT,(err)=>{
    if (err) console.log(err);
    console.log(`server running at port ${PORT}`)
})



