const register = require('express').Router();
const Register = require('../controllers/register')


 
    register.post('/register',Register.post);


module.exports = register;

