var detailCtrl = angular.module('detailCtrl', ['favoriteServices']);
detailCtrl.controller('detailController', function($scope,$routeParams,$q,$http,Auth,Favorite){
    var app = this;
    $scope.animal = {};

    app.load = false;
    //get the id to query the db and retrieve the correct superhero
    var id = $routeParams.id;
    var postObject = {
      username: String,
      animal: Object
    };
    //IDEA: CHECK IF ANIMAL ID IS IN USER FAVORITES ARRAY RATHER THAN SEND ENTIRE ARRAY
    app.isFavorited = $q.defer();
    if(Auth.isLoggedIn()) {
      app.isLoggedIn = true;
      Auth.getUser().then(function (data) {
        postObject.username = data.data.username;
        if(data.data.favorites.length == 0) {
          app.isFavorited.resolve(false);
          app.load = true;
        }
        for(var i = 0; i < data.data.favorites.length; i++) {
          if(id == data.data.favorites[i]) {
            app.isFavorited.resolve(true)
            app.load = true;
            break;
          }
          if(i == data.data.favorites.length - 1) {
            app.isFavorited.resolve(false);
            app.load = true;
          }
        }

      });
    }
    else {
      app.isLoggedIn = false;
      app.load = true;
    }

    //console.log("id: " + id);
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
});
