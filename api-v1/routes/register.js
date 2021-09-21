const register = require('express').Router();
const Register = require('../controllers/register')


    register.get('/register',Register.get);
    register.post('/register',Register.post);


module.exports = register;

