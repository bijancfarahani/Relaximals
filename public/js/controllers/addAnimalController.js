angular.module('addAnimalCtrl', ['authServices'])
.controller('addAnimalController', function($scope, $http, filepickerService,Auth){
    $scope.animal = {};
    Auth.getUser().then(function(data) {
      $scope.animal.ownerName = data.data.username;
    });
    //Send the newly created superhero to the server to store in the db
    $scope.createAnimal = function(){
        console.log($scope.animal);
        $http.post('/animal/addAnimal', $scope.animal).then(function successCallback(data) {
            $scope.animal = {};
        },
        function errorCallback(data) {
                console.log('Error: ' + data);
        });
    };
    //Single file upload, you can take a look at the options
    $scope.upload = function(){
        filepickerService.pick(
            {
                mimetype: 'image/*',
                language: 'en',
                services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE','IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM'],
                openTo: 'IMAGE_SEARCH'
            },
            function(Blob){
                //console.log("logging blob")
                //console.log(JSON.stringify(Blob));
                $scope.animal.picture = Blob;
                $scope.$apply();
            }
        );
    };
    //Multiple files upload set to 3 as max number
    $scope.uploadMultiple = function(){
        filepickerService.pickMultiple(
            {
                mimetype: 'image/*',
                language: 'en',
                maxFiles: 3, //pickMultiple has one more option
                services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE','IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM'],
                openTo: 'IMAGE_SEARCH'
            },
      function(Blob){
                //console.log(JSON.stringify(Blob));
                $scope.animal.morePictures = Blob;
                $scope.$apply();
            }
        );
    };
});
