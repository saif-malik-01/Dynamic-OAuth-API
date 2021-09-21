const path = require('path');
const user = require('../models/user');
const bcrypt = require('bcryptjs');
const {CreateUserRouter} = require('../utils/createUserRouter')


function get(req,res){
  
    res.sendFile(path.resolve(__dirname,'./index.html'));
}

async function post(req,res){
   
    if(req.body){
      try {
        let {name,appName,email,password} = req.body; 
        password = await bcrypt.hash(password,4);  
        req.app.use('/v1',CreateUserRouter(appName));
        await user.create({name,appName,email,password});  
        return res.status(200).json({code:200});
       } catch (error) {
            res.status(401).json({code:401,message:"Could not connect to server",error});
        }
    }else{
        res.status(401).json({code:401,required:"All Fields",minPass:6});
    }
}

module.exports = {get,post};