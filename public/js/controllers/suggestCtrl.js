angular.module('suggestController',[])
.controller('suggestCtrl', function($http, $scope) {
  console.log('in suggest');
  var app = this;
  $scope.suggest = {};
  //take data entered in suggestion form and post it to back-end for database upload
  this.doSuggest = function(suggestData) {
    $http.post('api/suggestion', $scope.suggest);
  }
});
