const user =  require('../models/user');
const {CreateUserRouter} = require('./createUserRouter');
const {createDB} = require('./createUserDb');

async function restore(app){
    const User = await user.find() ;
    User.forEach((ele)=>{
        app.use('/v1',CreateUserRouter(ele.appName));
        createDB(ele.appName);
        console.log("router and db created");
    })
}

module.exports = restore;