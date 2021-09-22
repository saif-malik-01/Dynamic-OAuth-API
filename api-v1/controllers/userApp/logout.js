const cache = require('../../utils/cache');

async function post(req,res){
    // check if user give the email or not 
    
     try {
        const {email} = req.body;
        const appName = `${req.originalUrl.split('/')[2]}`;
        // check if user is in redis store or not
        const token = await cache.get(appName,email);
        if(token){

            // delete refresh token from redis
            cache.del(appName,email);
            return res.status(200).json({status:"OK"});
        }else{
            return res.status(401).json({error:"USER NOT LOGGED IN!"});
        }
      } catch (err) {
       return res.status(401).json({error:"PLEASE PROVIDE EMAIL!"});
     }
   
    
}

module.exports = {post};