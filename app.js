/*global require, module */

var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    app = express(),
    routesApi;

require('./app_api/models/db');
require('./app_api/config/passport');

routesApi = require('./app_api/routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// [SH] Set the app_client folder to serve static resources
app.use(express.static(path.join(__dirname, 'app_client')));

app.use(passport.initialize());
app.use('/api', routesApi);

app.use(function (req, res) {
    'use strict';

    res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

app.use(function (req, res, next) {
    'use strict';

    var err = new Error('Not Found');

    err.status = 404;

    next(err);
});

app.use(function (err, req, res, next) {
    'use strict';

    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"message" : err.name + ": " + err.message});
    }
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        'use strict';

        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    'use strict';

    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;