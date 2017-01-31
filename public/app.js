var app = angular.module('animalApp', ['addAnimalCtrl',  'ngRoute', 'angular-filepicker'])
    .config(function($routeProvider, filepickerProvider){
        //The route provider handles the client request to switch route
        $routeProvider.when('/addAnimal', {          
            templateUrl: 'partials/addAnimal.html',
                        controller: 'addAnimalController'            
        })
        //Redirect to addSuperhero in all the other cases.
        .otherwise({redirectTo:'/addAnimal'});
        //Add the API key to use filestack service
        filepickerProvider.setKey('Azh9MkVLvQSCKgw3NLLryz');
});