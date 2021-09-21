const dump = require('express').Router();
const Dump = require('../controllers/dump');

dump.get('/dump',Dump.get);
dump.post('/dump',Dump.post);

module.exports = dump;