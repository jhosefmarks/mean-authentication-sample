/*global require */

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, function (username, password, done) {
    'use strict';

    User.findOne({ email: username }, function (err, user) {
        if (err) {
            return done(err);
        }

        // Return if user not found in database
        if (!user) {
            return done(null, false, {
                message: 'User not found'
            });
        }

        // Return if password is wrong
        if (!user.validPassword(password)) {
            return done(null, false, {
                message: 'Password is wrong'
            });
        }

        // If credentials are correct, return the user object
        return done(null, user);
    });
}));