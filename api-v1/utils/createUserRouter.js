const Login = require('../controllers/userApp/login')
const router = require('express').Router();
const Register = require('../controllers/userApp/register')
const Refresh = require('../controllers/userApp/refresh')
const All = require('../controllers/userApp/all')
const DumpAll = require('../controllers/userApp/dumpAll')
const Dump = require('../controllers/userApp/dump')
const Logout = require('../controllers/userApp/logout')
const Verify = require('../controllers/userApp/verify') 

  //  registered all routes with given user app name

 function CreateUserRouter(appName){

    router.post(`/${appName}/login`,Login.post);
    router.post(`/${appName}/register`,Register.post);
    router.post(`/${appName}/refresh`,Refresh.post);
    router.post(`/${appName}/all`,All.post);
    router.post(`/${appName}/dumpAll`,DumpAll.post);
    router.post(`/${appName}/dump`,Dump.post);
    router.post(`/${appName}/logout`,Logout.post);
    router.post(`/${appName}/verify`,Verify.post);
    return router;
 }

 // delete all user app routes 
 function DeleteUserRouter(appName){
 // filter from stack and leave all non appName routes    
    router.stack = router.stack.filter((route)=>{
      if(new RegExp(appName).test(route.route.path)){
         return false;
      }
      return true;
    });
 }

module.exports = {CreateUserRouter,DeleteUserRouter};