const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const user = require('../../models/user');

async function post(req,res){
      // check for an error if user give details or not
      try {
        const {email,password} = req.body;
        const storeUserDetails = await user.findOne({email});

        // check if user is in mongo store or not 
        if(storeUserDetails){

           // compare hased store password and give one 
           if(bcrypt.compareSync(password,storeUserDetails.password)){
            const appIds = mongoose.model(`${req.originalUrl.split('/')[2]}`);

            // delete app doc from user app name collection
            const profiles = await appIds.deleteMany({});

            // if user collection is empty
            if(profiles.deletedCount == 0){
                return res.status(200).json({code:200,error:"NO REGISTERED USER"});
            }
            return res.status(200).json({code:200,message:"OK"});
           }else{
            return res.status(401).json({code:401,error:"PASSWORD DOES'T NOT MATCH"});
           }
        }else{
            return res.status(404).json({code:404,error:"USER NOT FOUND"});
        }
        

    } catch (err) {
        return res.status(404).json({code:404,error:"INVALID USER EMAIL AND PASSWORD"});
    }
}


module.exports = {post};