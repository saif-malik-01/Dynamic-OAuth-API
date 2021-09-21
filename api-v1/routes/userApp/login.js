const login = require('express').Router();
const Login = require('../controllers/userApp/login');

login.get('/login',Login.get);
login.post('/login',Login.post);

module.exports = login;