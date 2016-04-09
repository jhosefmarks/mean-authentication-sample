/*global angular */

(function () {

    'use strict';

    function navigation () {
        return {
            restrict: 'EA',
            templateUrl: '/common/directives/navigation/navigation.template.html',
            controller: 'navigationCtrl as navvm'
        };
    }

    angular
        .module('meanApp')
        .directive('navigation', navigation);

}());