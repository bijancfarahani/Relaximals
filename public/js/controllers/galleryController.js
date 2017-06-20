var galleryCtrl = angular.module('galleryCtrl', []);
galleryCtrl.controller('galleryController', function($scope, $http){
    $scope.animals = [];
    $http.get('animal/gallery').then(function successCallback(data) {
        JSON.stringify(data);
        $scope.animals = data;
    },
    function errorCallback(data){
            console.log('Error: ' + data);
    });
});
