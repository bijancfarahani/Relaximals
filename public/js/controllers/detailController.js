var detailCtrl = angular.module('detailCtrl', ['favoriteServices']);
detailCtrl.controller('detailController', function($scope,$routeParams,$q,$http,Auth,Favorite){
    var app = this;
    $scope.animal = {};

    app.isLoading = true;
    app.isFavorited = null;   //get the id to query the db and retrieve the correct superhero
    var id = $routeParams.id;
    var postObject = {
      username: String,
      animal: Object
    };
    var checkObject = {
      username: String,
      animalID: id
    };
    if(Auth.isLoggedIn()) {
      app.isLoggedIn = true;
      Auth.getUser().then(function (data) {
        postObject.username = data.data.username;
        checkObject.username = data.data.username;
        app.checkFavorite();
      });
    }

    $http.get('/animal/' + id).then(function successCallback(data) {
        //console.log(JSON.stringify(data)); MAYBE JSON FIRST BEFORE ASSIGNING TO SCOPE
        $scope.animal = data;
        postObject.animal = $scope.animal.data;
    },
    function errorCallback(data) {
        console.log('Error: ' + data);
    });
    console.log(app);
    this.addFavorite = function() {
      Favorite.doFavorite(postObject).then(function successCallback(data) {
        $scope.animal = data;
        app.isFavorited = true;
      },
      function errorCallback(data) {
        console.log('Error: ' + data);
      });
    }
    this.removeFavorite = function() {
      Favorite.doRemoveFavorite(postObject).then(function successCallback(data) {
        $scope.animal = data;
        app.isFavorited = false;
      },
      function errorCallback(data) {
        console.log('Error: ' + data);
      });
    }
    this.checkFavorite = function() {
      Favorite.doCheckFavorite(checkObject).then(function successCallback(data) {
        app.isFavorited = data.data;
        app.isLoading = false;
      },
      function errorCallback(data) {
        console.log("error: " + data);
        for(var property in data) {
          console.log(property + "=" + data[property]);
        }
      })
    }
});
