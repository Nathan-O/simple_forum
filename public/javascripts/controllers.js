console.log("Sanity - ANGULAR controllers.js");

var app = angular.module('forumApp.controllers', []);

app.controller('mainCtrl', function($scope, $window) {
  $scope.user = $window.user;
});

//////////////////////
// User Controllers //
//////////////////////

app.controller('UserIndexCtrl', function($scope, Users) {
   console.log("User Index");
   Users.query(
      function(data) {
         $scope.users = data;
      }
   );
});

// // AUTH CONTROLLERS //
// app.controller("registerController", ['$scope', '$location', 'AuthService', function($scope, $location, AuthService) {
//    //
// }]);
//
// app.controller("loginController", function($scope, $rootScope, $location, AuthService) {
//    //
// });
//
// app.controller("logoutController", function($scope, $location, AuthService) {
//    //
// });

//////////////////////
// ____ Controllers //
//////////////////////





//////////////////////////////////////////////////////////////


/********
 * Auth *
 ********/

app.controller('loginController', function ($scope, $rootScope, $location, AuthService) {

    console.log("logged_in", AuthService.getUserStatus());

    $scope.isLoggedIn = function(){
      return AuthService.isLoggedIn();
   };

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
          $rootScope.$broadcast('loggedIn'); // TELL THE OTHER CONTROLLERS WE'RE LOGGED IN
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

});

app.controller('logoutController', function ($scope, $location, AuthService) {

    $scope.logout = function () {

      console.log("logged_in", AuthService.getUserStatus());

      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
        });

    };

});

app.controller('registerController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    console.log(AuthService.getUserStatus());

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.firstName, $scope.registerForm.lastName, $scope.registerForm.password)
        // handle success
        .then(function () {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}]);







/////////////////
// CONTROLLERS //
/////////////////




// Question.query(
//   function(data) {
//     $scope.questions = data
//   },
//   function(data) {
//     $location.path('/login');
//   }
// );

// $scope.users = {};

app.controller('UserShowCtrl', function($scope, UserData, $routeParams){
   console.log("User Show");
   $scope.user = UserData.get($routeParams.id);

});
