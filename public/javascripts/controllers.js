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

   $scope.deleteUser = function(user) {
      Users.delete({id: user._id});
      var index = $scope.users.indexOf(user);
      $scope.users.splice(index, 1);
   };
});

app.controller('UserShowCtrl', function($scope, Users, $routeParams) {
   console.log("User Show");
   // $scope.user = UserData.get($routeParams.id);
   Users.query($routeParams.id, function(data) {
      $scope.user = data;
   });
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
// Post Controllers //
//////////////////////

app.controller("postsIndexCtrl", function($scope, $location, Post, AuthService){
   Post.query(
      function(data) {
         $scope.posts = data;
      },
      function(data) {
         $location.path("/login");
      }
   );

   $scope.post = {};
   $scope.createPost = function() {
      Post.save($scope.post,
         function(data) {
            $scope.posts.push(data);
         },
         function(data) {
            alert("Opps, something went wrong with saving your post.");
         }
      );
      $scope.post = {};
   };

   $scope.deletePost = function(post) {
      Post.delete({id: post._id});
      var index = $scope.posts.indexOf(post);
      $scope.posts.splice(index, 1);
   };
});



//
// $scope.question = {};
//  $scope.createQuestion = function() {
//    Question.save($scope.question,
//      function(data){
//       $scope.questions.push(data);
//      },
//      function(data) {
//       alert("there was a problem saving your question");
//      }
//    );
//    $scope.question = {};
//  }
//
//  $scope.deleteQuestion = function(question) {
//    Question.delete({id: question._id});
//    var index = $scope.questions.indexOf(question)
//    $scope.questions.splice(index, 1);
//  }

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
         //  $location.path('/');
         $location.path('/user-show/:id');
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
