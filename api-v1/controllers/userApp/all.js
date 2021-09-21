const mongoose = require('mongoose');

async function get(req,res){
    const user = mongoose.model(`${req.originalUrl.split('/')[2]}`);
    const profiles = await user.find({});
    res.status(200).json({code:200,profiles});
}

module.exports = {get};