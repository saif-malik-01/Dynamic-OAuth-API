const mongoose = require('mongoose');
const restore = require('./restore')
require('dotenv').config();


function connect(app) {
    mongoose.connect(process.env.DATABASE_KEY,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then((client,err)=>{
        restore(app);
        console.log("DB connect");
    })
}

module.exports = {connect};