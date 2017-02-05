var detailCtrl = angular.module('detailCtrl', []);
detailCtrl.controller('detailController', function($scope, $http, $routeParams){
    $scope.animal = {};
    //get the id to query the db and retrieve the correct superhero
    var id = $routeParams.id;
    $http.get('/animal/' + id)
        .success(function(data){
            console.log(JSON.stringify(data));
            $scope.animal = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });     
});