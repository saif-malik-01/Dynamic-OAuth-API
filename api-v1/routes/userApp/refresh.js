const refresh = require('express').Router();
const Refresh = require('../../controllers/refresh');

refresh.post('/refresh',Refresh.post);
refresh.get('/refresh',Refresh.get);

module.exports = refresh;