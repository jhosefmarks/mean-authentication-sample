/*global require, process, console */

var mongoose = require('mongoose'),
    gracefulShutdown,
    dbURI = 'mongodb://localhost/meanAuth';

if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function () {
    'use strict';

    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
    'use strict';

    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    'use strict';

    console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function (msg, callback) {
    'use strict';

    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function () {
    'use strict';

    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function () {
    'use strict';

    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function () {
    'use strict';

    gracefulShutdown('Heroku app termination', function () {
        process.exit(0);
    });
});

// BRING IN YOUR SCHEMAS & MODELS
require('./users');