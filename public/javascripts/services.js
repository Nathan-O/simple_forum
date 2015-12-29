// var User = require('./models').User;

console.log("Sanity - ANGULAR services.js");




// app.factory('Users', function ($resource) {
//   return $resource('/api/users', { id: '@_id' });
// });


//////////////////////////////////////////////////////////////


/*
 * SERVICES
 */

// 'use strict';

var app = angular.module('forumApp.services', []);

app.factory('Question', function ($resource) {
  return $resource('/api/questions/:id', { id: '@_id' });
});

// UNDER CONSTRUCTION
app.factory('Users', function ($resource) {
  return $resource('/api/users', { id: '@_id' });
});

app.factory('AuthService', function ($q, $timeout, $http, $window) {

   console.log("Inside - AuthService (services.js)");

  // create user variable
  var user = $window.user || null;

  // return available functions for use in controllers
  return ({
    isLoggedIn: isLoggedIn,
    getUserStatus: getUserStatus,
    login: login,
    logout: logout,
    register: register
  });

  function isLoggedIn() {
     console.log("Asked if logged in");
      return !!user;
  }

  function getUserStatus() {
    return user;
  }

  function login(username, password) {

    // create a new instance of deferred
    var deferred = $q.defer();

    // send a post request to the server
    $http.post('/api/user/login', {username: username, password: password})
      // handle success
      .success(function (res, status) {
        if(status === 200 && res.data){
          user = res.data;
          deferred.resolve();
        } else {
          user = false;
          deferred.reject();
        }
      })
      // handle error
      .error(function (res) {
        user = null;
        deferred.reject();
      });

    // return promise object
    return deferred.promise;

  }

  function logout() {

    // create a new instance of deferred
    var deferred = $q.defer();

    // send a get request to the server
    $http.get('/api/user/logout')
      // handle success
      .success(function (res) {
        user = null;
        deferred.resolve();
      })
      // handle error
      .error(function (res) {
        user = null;
        deferred.reject();
      });

    // return promise object
    return deferred.promise;

  }

  function register(username, password) {
     console.log("Inside register() - services.js");

    // create a new instance of deferred
    var deferred = $q.defer();

    // send a post request to the server
    $http.post('/api/user/register', {username: username, password: password})
      // handle success
      .success(function (res, status) {
        if(status === 200 && res.data){
          user = res.data;
          deferred.resolve();
        } else {
          deferred.reject();
        }
      })
      // handle error
      .error(function (res) {
        deferred.reject();
      });

    // return promise object
    return deferred.promise;

  }

});
