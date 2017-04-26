var app = angular.module('appRoutes',['ngRoute'])
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/pages/home.html'
    })
    .when('/register', {
      templateUrl: '/views/pages/register.html',
      controller: 'regCtrl',
      controllerAs: 'register',
      authenticated: false
    })
    .when('/login', {
      templateUrl: 'views/pages/login.html',
      authenticated: false
    })
    .when('/logout', {
      templateUrl: 'views/pages/logout.html',
      authenticated: true
    })
    .when('/facebook/:token', {
      templateUrl: 'views/pages/social.html',
      controller: 'facebookCtrl',
      controllerAs: 'facebook',
      authenticated: false

    })
    .when('/twitter/:token', {
      templateUrl: 'views/pages/social.html',
      controller: 'twitterCtrl',
      controllerAs: 'twitter',
      authenticated: false
    })
    .when('/google/:token', {
      templateUrl: 'views/pages/social.html',
      controller: 'googleCtrl',
      controllerAs: 'google',
      authenticated: false

    })
    .when('/profile', {
      templateUrl: 'views/pages/profile.html',
      authenticated: true

    })
    .when('/addAnimal', {
      templateUrl: 'partials/addAnimal.html',
      controller: 'addAnimalController',
      authenticated: true

    })
    .when('/gallery', {
      templateUrl: 'partials/gallery.html',
      controller: 'galleryController',
    })
    .when('/detail/:id', {
      templateUrl: 'partials/detail.html',
      controller: 'detailController',
      controllerAs: 'detail'
    })
    .when('/suggest', {
      templateUrl: 'partials/suggest.html',
      controller: 'suggestCtrl',
      controllerAs: 'suggest'
    })
    .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
});

//Route Restriction
app.run(['$rootScope','Auth','$location', function($rootScope, Auth, $location) {
  $rootScope.$on('$routeChangeStart', function(event,next,current) {
    if(next.$$route.authenticated == true) {
      if(!Auth.isLoggedIn()) {
        event.preventDefault();
        $location.path('/');
      }
    }
    else if(next.$$route.authenticated == false)
    {
      if(Auth.isLoggedIn()) {
        event.preventDefault();
        $location.path('/profile');
      }
    }
  });
}]);
