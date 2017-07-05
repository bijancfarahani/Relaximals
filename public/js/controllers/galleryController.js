var galleryCtrl = angular.module('galleryCtrl', []);
galleryCtrl.controller('galleryController', function($scope, $http){
    $scope.animals = [];
    //get the collection of animals to display in the gallery
    $http.get('animal/gallery').then(function successCallback(data) {
        JSON.stringify(data);
        $scope.animals = data;
    },
    function errorCallback(data){
            console.log('Error: ' + data);
    });
});
