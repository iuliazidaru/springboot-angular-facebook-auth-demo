'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', ['satellizer',
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $routeProvider.otherwise({redirectTo: '/'});
  $locationProvider.html5Mode(true);
}]);

myApp.config(function($authProvider) {
        $authProvider.facebook({
            clientId: '123',
            responseType: 'token',
            name: 'facebook',
            url: '/login/facebook',
            authorizationEndpoint: 'https://www.facebook.com/v2.9/dialog/oauth',
            redirectUri: window.location.origin + '/',
            requiredUrlParams: ['display', 'scope'],
            scope: ['email'],
            scopeDelimiter: ',',
            display: 'popup',
            oauthType: '2.0',
            popupOptions: { width: 580, height: 400 }
        });
});


myApp.controller('LoginCtrl', function($scope, $auth, $http) {
    var init = function(){
        $auth.setStorageType('sessionStorage');

        if($auth.isAuthenticated()){
            $http({
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + $auth.getToken()
                },
                url: 'http://localhost:8080/user'
            }).then(function successCallback(response) {
                $scope.userData = response.data;
            }, function errorCallback(response) {
                console.log(response);

            });
        }
    };
    init();

    $scope.authenticate = function (provider) {
        $auth.authenticate(provider).then(function(response) {
        });
    };

    $scope.logout = function(){
        $auth.logout();
    }

    $scope.isAuthenticated = function(){
        return $auth.isAuthenticated();
    }

});



myApp.factory('authInterceptor', function($q, $auth) {
    return {
        request: function (config) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {

                    if(config.method !== 'GET'){
                        config.headers = config.headers || {};
                        config.headers.Authorization = 'Bearer ' + $auth.getToken();
                    }


                    deferred.resolve(config);

            }
            return deferred.promise;
        }
    };
});