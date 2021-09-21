const mongoose = require('mongoose');

async function get(req,res){
    const user = mongoose.model(`${req.originalUrl.splt('/')[2]}`);
    const data = await user.deleteMany({});
    res.json({code:200,message:"deleted!"})
}


module.exports = {get};