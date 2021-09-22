const jwt = require('jsonwebtoken');
const cache = require('../../utils/cache');
require('dotenv').config();


async function post(req,res) {
    // check is user send the refresh token or not .
    if(req.body){
        try {
            const {token,email} = req.body;

            // check user given token is in the redis store or not 
            const storeToken = await cache.get(`${req.originalUrl.split('/')[2]}`,email);
            if( storeToken == token){

                // verify refresh token given by user is valid or not
                const result =  jwt.verify(token,process.env.REFRESH_TOKEN_SIGNATURE);
                if(result){

                   // send new token to the user and store it in redis store 
                   const newToken = jwt.sign({email},process.env.REFRESH_TOKEN_SIGNATURE,{expiresIn:'6h'});
                   cache.create(`${req.originalUrl.split('/')[2]}`,email,newToken);
                   return  res.status(200).json({newToken,message:"OK"});
                }else{
                    return  res.status(401).json({code:401,message:"TOKEN EXPIRED"})
                }
                
            }
            return  res.status(401).json({code:401,message:"TOKEN NOT FOUND"})
        } 
        
        catch (error) {
            res.status(401).json({code:401,message:"UNEXPECTED ERROR"})
        }
    }else{
        res.status(401).json({code:401,message:"REFRESH TOKEN REQUIRED"})
    }
}

module.exports = {post};