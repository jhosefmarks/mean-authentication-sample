/*global angular */

(function () {

    'use strict';

    function authentication($http, $window, $location) {

        var saveToken,
            getToken,
            isLoggedIn,
            currentUser,
            register,
            login,
            logout;

        saveToken = function (token) {
            $window.localStorage['mean-token'] = token;
        };

        getToken = function () {
            return $window.localStorage['mean-token'];
        };

        isLoggedIn = function () {
            var token = getToken(),
                payload;

            if (token && token !== 'null') {
                payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        currentUser = function () {
            var token,
                payload;

            if (isLoggedIn()) {
                token = getToken();
                payload = token.split('.')[1];

                payload = $window.atob(payload);
                payload = JSON.parse(payload);

                return {
                    email: payload.email,
                    name: payload.name
                };
            }
        };

        register = function (user) {
            return $http.post('/api/register', user).success(function (data) {
                saveToken(data.token);
            });
        };

        login = function (user) {
            return $http.post('/api/login', user).success(function (data) {
                saveToken(data.token);
            });
        };

        logout = function () {
            return $http.get('/api/logout', currentUser).success(function (data) {
                //saveToken(data.token);
                $window.localStorage.removeItem('mean-token');

                $location.path('/');
            });
        };

        return {
            currentUser : currentUser,
            saveToken : saveToken,
            getToken : getToken,
            isLoggedIn : isLoggedIn,
            register : register,
            login : login,
            logout : logout
        };
    }

    authentication.$inject = ['$http', '$window', '$location'];

    angular
        .module('meanApp')
        .service('authentication', authentication);

}());