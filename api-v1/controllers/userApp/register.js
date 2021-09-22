const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');


async function post(req,res){
    //  validate given user data
       try {
        let {name,email,password} = req.body; 
        // hash password to store in user db
        password = await bcrypt.hash(password,4); 
        const user = mongoose.model(`${req.originalUrl.split('/')[2]}`); 

        // create user in user app db
        await user.create({name,email,password});  
        return res.status(200).json({code:200});
       } catch (error) {
           res.status(401).json({code:401,required:"All Fields",minPass:6});
        }
  
}

module.exports = {post};