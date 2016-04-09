/*global angular, console */

(function () {

    'use strict';

    function homeCtrl() {
        console.log('Home controller is running');
    }
    
    angular
        .module('meanApp')
        .controller('homeCtrl', homeCtrl);

}());