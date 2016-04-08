/*global require, module */

var express = require('express'),
    router = express.Router(),
    jwt = require('express-jwt'),
    auth,
    ctrlProfile = require('../controllers/profile'),
    ctrlAuth = require('../controllers/authentication');

auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;