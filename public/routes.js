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
      templateUrl: 'views/pages/social.html',
      controller: 'facebookCtrl',
      controllerAs: 'facebook'
    })
    .when('/twitter/:token', {
      templateUrl: 'views/pages/social.html',
      controller: 'twitterCtrl',
      controllerAs: 'twitter'
    })
    .when('/google/:token', {
      templateUrl: 'views/pages/social.html',
      controller: 'googleCtrl',
      controllerAs: 'google'
    })
    .when('/profile', {
      templateUrl: 'views/pages/profile.html'
    })
    .when('/addAnimal', {
      templateUrl: 'partials/addAnimal.html',
      controller: 'addAnimalController'
    })
    .when('/gallery', {
      templateUrl: 'partials/gallery.html',
      controller: 'galleryController'
    })
    .when('/detail/:id', {
      templateUrl: 'partials/detail.html',
      controller: 'detailController'
   })
    .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
});
