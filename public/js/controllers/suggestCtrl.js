angular.module('suggestController',[])
.controller('suggestCtrl', function($http, $scope) {
  console.log('in suggest');
  var app = this;
  $scope.suggest = {};
  this.doSuggest = function(suggestData) {
    console.log($scope.suggest);
    $http.post('api/suggestion', $scope.suggest);
  }
});
