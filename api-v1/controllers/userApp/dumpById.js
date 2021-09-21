const mongoose  = require("mongoose");
const path = require('path');

function get(req,res) {
    res.sendFile(path.resolve(__dirname,'./id.html'));
}


async function post(req,res) {
    if(req.body){
        const {id} = req.body;
        const data = await mongoose.model(`${req.originalUrl.split('/')[2]}`).deleteOne({id});
        res.json({code:200,message:`Profile deleted with id: ${id}`});
    }
}

module.exports = {get,post};