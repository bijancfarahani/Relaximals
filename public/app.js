var app = angular.module('relaximalsApp', ['appRoutes','userController','userServices', 'mainController','authServices','addAnimalCtrl', 'galleryCtrl', 'detailCtrl','suggestController','profileCtrl', 'angular-filepicker'])
.config(function($httpProvider, filepickerProvider) {
  filepickerProvider.setKey('Azh9MkVLvQSCKgw3NLLryz');
  $httpProvider.interceptors.push('AuthInterceptors');
});
