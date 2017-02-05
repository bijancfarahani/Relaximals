    var app = angular.module('relaximalsApp', ['addAnimalCtrl', 'galleryCtrl', 'ngRoute', 'angular-filepicker'])
    .config(function($routeProvider, filepickerProvider){
        //The route provider handles the client request to switch route
        $routeProvider.when('/addAnimal', {          
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
        //Redirect to addSuperhero in all the other cases.
        .otherwise({redirectTo:'/addAnimal'});
        //Add the API key to use filestack service
        filepickerProvider.setKey('Azh9MkVLvQSCKgw3NLLryz');
});