/*global angular, console */

(function () {

    'use strict';

    function profileCtrl($location, meanData) {
        var vm = this;

        vm.user = {};

        meanData.getProfile()
            .success(function (data) {
                vm.user = data;
            })
            .error(function (e) {
                console.log(e);
            });
    }

    angular
        .module('meanApp')
        .controller('profileCtrl', profileCtrl);

    profileCtrl.$inject = ['$location', 'meanData'];
    
}());