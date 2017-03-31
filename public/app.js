var app = angular.module('relaximalsApp', ['appRoutes','userController','userServices', 'mainController','authServices','addAnimalCtrl', 'galleryCtrl', 'detailCtrl', 'angular-filepicker'])
.config(function($httpProvider, filepickerProvider) {
  filepickerProvider.setKey('Azh9MkVLvQSCKgw3NLLryz');
  $httpProvider.interceptors.push('AuthInterceptors');
});



//,'addAnimalCtrl', 'galleryCtrl', 'detailCtrl','facebookCtrl', 'angular-filepicker'])
//.config(function($routeProvider, filepickerProvider){
    //The route provider handles the client request to switch route
    /*$routeProvider
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
    .when('/facebook', {
      templateUrl: 'partials/profile.html',
      controller: 'facebookController'
    })
    //Redirect to addSuperhero in all the other cases.
    .otherwise({redirectTo:'/addAnimal'});
    //Add the API key to use filestack service
    filepickerProvider.setKey('Azh9MkVLvQSCKgw3NLLryz');*]
});
app.config(['$locationProvider', function($locationProvider) {
$locationProvider.hashPrefix('');

}]);
*/
