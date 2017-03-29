angular.module('userController',['userServices'])
.controller('regCtrl', function($http, $location, User) {
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
});
