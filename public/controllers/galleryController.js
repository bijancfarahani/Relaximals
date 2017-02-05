var galleryCtrl = angular.module('galleryCtrl', []);
galleryCtrl.controller('galleryController', function($scope, $http){
    $scope.animals = [];
    //Retrieve all the superheroes to show the gallery
    $http.get('/animal')
        .success(function(data){
            console.log(JSON.stringify(data));
            $scope.animals = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

});