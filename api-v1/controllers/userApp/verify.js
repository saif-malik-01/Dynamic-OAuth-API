const cache = require('../../utils/cache');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function post(req,res){
    try {
        const {token,email} = req.body;
        const appName = `${req.originalUrl.split('/')[2]}`

       // check user refresh token 
        const storeToken = await cache.get(appName,email);
        if (storeToken) {

            //  jwt verification for provided token 
            try{
                const result = await jwt.verify(token,process.env.ACCESS_TOKEN_SIGNATURE);
                return res.status(200).json({code:200,message:"OK"});
            }catch(err){
                return res.status(401).json({code:401,error:"TOKEN EXPIRED"});
            }
            
        } else {
            return res.status(401).json({code:401,error:"AUTHENTICATION FAILED USER NOT FOUND"});
        }
    } catch (error) {
        return res.status(401).json({code:401,error:"PLEASE PROVIDE ALL FIELDS - EMAIl & ACESS TOKEN"});
    }
}

module.exports = {post};