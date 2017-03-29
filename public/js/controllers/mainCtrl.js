angular.module('mainController', ['authServices'])
.controller('mainCtrl', function(Auth, $location,$timeout,$rootScope) {
  var app = this;
  app.loadme = false;

  $rootScope.$on('$routeChangeStart', function() {
    if(Auth.isLoggedIn()) {
      app.isLoggedIn = true;
      Auth.getUser().then(function(data) {
        app.username = data.data.username;
        app.loadme = true;
      });
    }
    else {
      app.username = null;
      app.isLoggedIn = false;
      app.loadme = true;
    }
  });

  this.doLogin = function(loginData) {
    app.errorMessage = false;
    app.loading = true;

    Auth.login(app.loginData).then(function(data) {
      //data is the output and status from the route execution
      if(data.data.success) {
        app.loading = false;
        app.successMessage = data.data.message;
        $location.path('/');
        app.loginData = null;
        app.successMessage = false;
      }
      else {
        app.loading = false;
        app.errorMessage = data.data.message;
      };
    });
  };
  this.logout = function() {
    Auth.logout();
    $location.path('/logout');
    $timeout(function() {
      $location.path('/');
    }, 2000);
  };

});
