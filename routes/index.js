/*global require, module */

var express = require('express'),
    router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    'use strict';

    res.render('index', { title: 'Express' });
});

module.exports = router;