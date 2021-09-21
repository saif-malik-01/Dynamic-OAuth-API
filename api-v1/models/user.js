const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name:{type:String,required:true},
    appName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,min:6},
})


module.exports = mongoose.model('user',user);