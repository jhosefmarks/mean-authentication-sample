/*global require, module */

var passport = require('passport'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

var sendJSONresponse = function (res, status, content) {
    'use strict';

    res.status(status);
    res.json(content);
};

module.exports.register = function (req, res) {
    'use strict';

    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    user.setPassword(req.body.password);

    user.save(function (err) {
        var token;

        token = user.generateJwt();

        res.status(200);
        res.json({
            "token": token
        });
    });
};

module.exports.login = function (req, res) {
    'use strict';

    passport.authenticate('local', function (err, user, info) {
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();

            res.status(200);
            res.json({
                "token": token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);
};

module.exports.logout = function (req, res) {
    'use strict';

    req.logout();
    res.status(200)
        .json({"token": null})
        .redirect('/');
};