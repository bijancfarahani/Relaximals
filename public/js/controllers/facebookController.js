var facebookCtrl = angular.module('facebookCtrl', []);
facebookCtrl.controller('facebookController', function($http, $scope){
  $scope.facebook = []
  $http.get('/auth/facebook').then(function successCallback(data) {
      console.log(JSON.stringify(data));
      $scope.facebook = data;
  },
  function errorCallback(data){
          console.log('Error: ' + data);
  });
});
