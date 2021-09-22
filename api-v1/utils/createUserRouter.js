const Login = require('../controllers/userApp/login')
const router = require('express').Router();
const Register = require('../controllers/userApp/register')
const Refresh = require('../controllers/userApp/refresh')
const All = require('../controllers/userApp/all')
const DumpAll = require('../controllers/userApp/dumpAll')
const DumpById = require('../controllers/userApp/dumpById')
const Logout = require('../controllers/userApp/logout')
 

 function CreateUserRouter(appName){

    router.post(`/${appName}/login`,Login.post);
    router.post(`/${appName}/register`,Register.post);
    router.post(`/${appName}/refresh`,Refresh.post);
    router.get(`/${appName}/all`,All.get);
    router.get(`/${appName}/dumpAll`,DumpAll.get);
    router.post(`/${appName}/dumpById`,DumpById.post);
    router.post(`/${appName}/logout`,Logout.post);
    return router;
 }

 function DeleteUserRouter(appName){
    router.stack = router.stack.filter((route)=>{
      if(new RegExp(appName).test(route.route.path)){
         return false;
      }
      return true;
    });
 }

module.exports = {CreateUserRouter,DeleteUserRouter};