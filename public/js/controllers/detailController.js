var detailCtrl = angular.module('detailCtrl', ['favoriteServices']);
detailCtrl.controller('detailController', function($scope,$routeParams,$q,$http,Auth,Favorite){
    var app = this;
    $scope.animal = {};

    //parameters which ensure the front-end is displayed when all data is ready
    app.isLoading = true;
    app.isFavorited = null;
    var id = $routeParams.id;
    //objects which make sending data to the back-end simpler
    var postObject = {
      username: String,
      animal: Object
    };
    var checkObject = {
      username: String,
      animalID: id
    };
    //check if user is logged in so that favorites can be used
    if(Auth.isLoggedIn()) {
      app.isLoggedIn = true;
      Auth.getUser().then(function (data) {
        postObject.username = data.data.username;
        checkObject.username = data.data.username;
        app.checkFavorite();
      });
    }
    else {
      app.isLoading = false;
    }

    //gets the animal model from the back-end and assigns all relevent vars
    $http.get('/animal/' + id).then(function successCallback(data) {
        console.log(JSON.stringify(data));
        $scope.animal = data;
        postObject.animal = $scope.animal.data;
        console.log($scope.animal.data.ownerName + '  ' + postObject.username)
        if($scope.animal.data.ownerName == postObject.username) {
          app.isUserAnimal = true;
        }
    },
    function errorCallback(data) {
        console.log('Error: ' + data);
    });
    //functions to remove this animal or manage it with favorites
    this.deleteAnimal = function() {
      $http.post('animal/deleteAnimal', postObject).then(function successCallback(data) {
        window.history.back();
      },
      function errorCallback(data) {
        console.log('error' + data);
      })
    }
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
    //check if this animal is already favorited so that the front-end can
    //reflect this
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
