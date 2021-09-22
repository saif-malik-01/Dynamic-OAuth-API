const dump = require('express').Router();
const Dump = require('../controllers/dump');


dump.post('/dump',Dump.post);

module.exports = dump;