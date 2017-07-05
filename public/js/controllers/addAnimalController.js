angular.module('addAnimalCtrl', ['authServices'])
.controller('addAnimalController', function($scope, $http,$location, filepickerService,Auth){
    $scope.animal = {};
    Auth.getUser().then(function(data) {
      $scope.animal.ownerName = data.data.username;
    });
    //Send a newly created animal model to the back-end for uploading to the database
    $scope.createAnimal = function(){
        console.log($scope.animal);
        $http.post('/animal/addAnimal', $scope.animal).then(function successCallback(data) {
            $scope.animal = {};
            $location.path('/profile');
        },
        function errorCallback(data) {
                console.log('Error: ' + data);
        });
    };
    //Single file upload, different services avaliablre
    $scope.upload = function(){
        filepickerService.pick(
            {
                mimetype: 'image/*',
                language: 'en',
                services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE', 'FACEBOOK', 'INSTAGRAM'],
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
                $scope.animal.morePictures = Blob;
                $scope.$apply();
            }
        );
    };
});
