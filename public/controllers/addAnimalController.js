var addCtrl = angular.module('addAnimalCtrl', []);
addCtrl.controller('addAnimalController', function($scope, $http, filepickerService){
    $scope.animal = {};
    //Send the newly created superhero to the server to store in the db
    $scope.createAnimal = function(){
        $http.post('/animal', $scope.animal)
            .success(function(data){
                console.log(JSON.stringify(data));
                //Clean the form to allow the user to create new superheroes
                $scope.animal = {};
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    //Single file upload, you can take a look at the options
    $scope.upload = function(){
        console.log("button pressed");
        filepickerService.pick(
            {
                mimetype: 'image/*',
                language: 'en',
                services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE','IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM'],
                openTo: 'IMAGE_SEARCH'
            },
            function(Blob){
                console.log(JSON.stringify(Blob));
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
                console.log(JSON.stringify(Blob));
                $scope.animal.morePictures = Blob;
                $scope.$apply();
            }
        );
    };  
});