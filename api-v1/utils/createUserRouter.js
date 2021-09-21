const Login = require('../controllers/userApp/login')
const router = require('express').Router();
const Register = require('../controllers/userApp/register')
const Refresh = require('../controllers/userApp/refresh')
const All = require('../controllers/userApp/all')
const DumpAll = require('../controllers/userApp/dumpAll')
 const DumpById = require('../controllers/userApp/dumpById')
 

 function CreateUserRouter(appName){
    router.get(`/${appName}/login`,Login.get);
    router.post(`/${appName}/login`,Login.post);
    router.get(`/${appName}/register`,Register.get);
    router.post(`/${appName}/register`,Register.post);
    router.get(`/${appName}/refresh`,Refresh.get);
    router.post(`/${appName}/refresh`,Refresh.post);
    router.get(`/${appName}/all`,All.get);
    router.get(`/${appName}/dumpAll`,DumpAll.get);
    router.get(`/${appName}/dumpById`,DumpById.get);
    router.post(`/${appName}/dumpById`,DumpById.post);
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