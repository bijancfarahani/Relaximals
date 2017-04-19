angular.module('favoriteServices',[])
.factory('Favorite', function($http) {
  favoriteFactory = {};
  favoriteFactory.doFavorite = function(data) {
    var animalUpdate = $http.post('/animal/addFavorite', data);
    return animalUpdate;
  };
  favoriteFactory.doRemoveFavorite = function(data) {
    var animalUpdate = $http.post('/animal/removeFavorite', data);
    return animalUpdate;
  };
  return favoriteFactory;
});
