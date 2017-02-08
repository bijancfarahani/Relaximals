var detailCtrl = angular.module('detailCtrl', []);
detailCtrl.controller('detailController', function($scope, $http, $routeParams){
    $scope.animal = [];
    //get the id to query the db and retrieve the correct superhero
    var id = $routeParams.id;
    console.log("id: " + id);
    $http.get('/animal/' + id).then(function successCallback(data) {
        console.log(JSON.stringify(data));
        $scope.animal = data;
    },
    function errorCallback(data) {
        console.log('Error: ' + data);
    });
});
