var galleryCtrl = angular.module('galleryCtrl', []);
galleryCtrl.controller('galleryController', function($scope, $http){

    $http.get('/animal').then(successCallback, errorCallback);
    function successCallback(data){
        console.log(JSON.stringify(data));
        $scope.animals = data;
    }   
    function errorCallback(data){
            console.log('Error: ' + data);
    }
});
