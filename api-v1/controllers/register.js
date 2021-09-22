const user = require('../models/user');
const bcrypt = require('bcryptjs');
const {CreateUserRouter} = require('../utils/createUserRouter')

// register user and creates its appName routes and db

async function post(req,res){
       
      // validate given data 
      try {
        let {name,appName,email,password} = req.body; 

        // hash password to store in db
        password = await bcrypt.hash(password,4);  

        // create user app routes and registered in it as middleware
        req.app.use('/v1',CreateUserRouter(appName));
        // create document in mongo collection
        await user.create({name,appName,email,password});  
        return res.status(200).json({code:200});
       } 
       
       catch (error) {
          res.status(401).json({code:401,required:"All Fields",minPass:6,error});
        }
    
}

module.exports = {post};