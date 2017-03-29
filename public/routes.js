angular.module('appRoutes',['ngRoute'])
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/pages/home.html'
    })
    .when('/register', {
      templateUrl: '/views/pages/register.html',
      controller: 'regCtrl',
      controllerAs: 'register'
    })
    .when('/login', {
      templateUrl: 'views/pages/login.html'
    })
    .when('/logout', {
      templateUrl: 'views/pages/logout.html'
    })
    .when('/facebook/:token', {
      templateUrl: 'views/pages/social.html'
    })
    .when('/profile', {
      templateUrl: 'views/pages/profile.html'
    })
    .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
});
