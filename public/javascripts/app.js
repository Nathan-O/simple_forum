/*
*************************************************************
***************   Angular App Configuration   ***************
*************************************************************
*/
// 'use strict';

console.log("Sanity - App.js (Angular)");

var app = angular.module("forumApp", ["ngResource", "ngRoute", "forumApp.services", "forumApp.controllers"]);

// app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
//    // code
// }]);



// .when('/users-all', {
//  templateUrl: '/partials/user-all.html',
//  controller: 'UserIndexCtrl'
// })


////////////////////////////////////////////////////////////



app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
   console.log("Inside app.config");

    $routeProvider
      .when('/', {
        templateUrl: '/partials/questions-index.html',
        controller: 'questionsIndexController'
      })
      .when('/login', {
        templateUrl: '/partials/login.html',
        controller: 'loginController'
      })
      .when('/logout', {
        controller: 'logoutController'
      })
      .when('/sign-up', {
        templateUrl: '/partials/sign-up.html',
        controller: 'registerController'
      })
      .when('/user-show/:id', {
        templateUrl: '/partials/user-show.html',
        controller: 'UserShowCtrl'
      })
      .when('/users-all', {
        templateUrl: '/partials/user-all.html',
        controller: 'UserIndexCtrl'
      })
      .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
   });
}]);




/*
 * ANGULAR APPLICATION.JS
 */
/*
'use strict';

var app = angular.module('myApp', ['ngResource',
                                   'ngRoute',
                                   'myApp.services',
                                   'myApp.controllers'
                                   ]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/partials/questions-index.html',
        controller: 'questionsIndexController'
      })
      .when('/login', {
        templateUrl: '/partials/login.html',
        controller: 'loginController'
      })
      .when('/logout', {
        controller: 'logoutController'
      })
      .when('/sign-up', {
        templateUrl: '/partials/sign-up.html',
        controller: 'registerController'
      })
      .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
   });
}]);

*/
