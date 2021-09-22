const mongoose  = require("mongoose");
const bcrypt = require('bcryptjs');
const user = require('../../models/user');


// delete registered user app user with thier email

async function post(req,res) {

    try {
        const {email,password,userEmail} = req.body;
        const storeUserDetails = await user.findOne({email});
        
        // check if user is in mongo store or not 
        if(storeUserDetails){

           // compare hased store password and give one 
           if(bcrypt.compareSync(password,storeUserDetails.password)){
            const appIds = mongoose.model(`${req.originalUrl.split('/')[2]}`);
            const result = await appIds.deleteOne({email:userEmail});

            // check if userEmail exist in user app store
            if(result.deletedCount == 1){
                return res.status(200).json({code:200,message:"DELETED"});
            }else{
                return res.status(200).json({code:200,message:"NO REGISTERED USER FOUND WITH YOUR APP"});
            }
          
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