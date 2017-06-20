var profileCtrl = angular.module('profileCtrl', []);
profileCtrl.controller('profileController', function($scope, $http,Auth){
    $scope.animals = [];
    Auth.getUser().then(function (data) {
      var userObj = {
        username: data.data.username
      }
      $http.post('animal/myAnimals',userObj).then(function successCallback(data) {
          console.log(JSON.stringify(data));
          $scope.myAnimals = data;
      },
      function errorCallback(data){
              console.log('Error: ' + data);
      });
      $http.post('animal/myFavorites',userObj).then(function successCallback(data) {
          console.log(JSON.stringify(data));
          $scope.myFavorites = data;
      },
      function errorCallback(data){
              console.log('Error: ' + data);
      });
    });

});
