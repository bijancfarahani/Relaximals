angular.module('userController',['userServices'])
.controller('regCtrl', function(/*$http*/$location, User) {
  var app = this;
  this.regUser = function(regData) {
    app.errorMessage = false;
    app.loading = true;

    User.create(app.regData).then(function(data) {
      //data is the output and status from the route execution
      if(data.data.success) {
        app.loading = false;
        app.successMessage = data.data.message;
        $location.path('/');
      }
      else {
        app.loading = false;
        app.errorMessage = data.data.message;
      }
    })
  }
})
.controller('facebookCtrl', function($routeParams, $location,Auth) {
  Auth.facebook($routeParams.token);
  $location.path('.');
})
.controller('twitterCtrl', function($routeParams, $location,Auth) {
  Auth.twitter($routeParams.token);
  $location.path('.');
})
.controller('googleCtrl', function($routeParams, $location,Auth) {
  Auth.google($routeParams.token);
  $location.path('.');
});
