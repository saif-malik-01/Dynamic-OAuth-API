const profile = require('express').Router();
const Profile = require('../controllers/userApp/profile');

profile.get('/profiles',Profile.get);

module.exports = profile;
