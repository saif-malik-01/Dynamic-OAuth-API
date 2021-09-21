const path = require('path');
const jwt = require('jsonwebtoken');
const cache = require('../../utils/cache');
require('dotenv').config();

function get(req,res) {
    res.sendFile(path.resolve(__dirname,'./refresh.html'));
}

 function post(req,res) {
    if(req.body){
        try {
            const {token} = req.body;
            
            const some =  jwt.verify(token,process.env.REFRESH_TOKEN_SIGNATURE);
            return  res.status(200).json({token,message:"OK"});
        } catch (error) {
            res.status(401).json({code:401,message:"TOKEN Expired"})
        }
    }else{
        res.status(401).json({code:401,message:"ACESS_TOKEN required"})
    }
}

module.exports = {post,get};