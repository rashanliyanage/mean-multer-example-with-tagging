var app = angular.module('fileUpload', [
    'ngFileUpload',
    'ngResource',
    'ngRoute']);
var tempFileName, tempID;

app.config(function ($routeProvider, $locationProvider) {
      $locationProvider.hashPrefix('');

      $routeProvider.
        when('/', {
          templateUrl: '../views/home.html'
        }).
        when('/viewAll', {
          templateUrl: '../views/viewAll.html'
        }).
         when('/viewSessions', {
          templateUrl: '../views/viewAllPartner.html'
        }).
         when('/uploadForm', {
          templateUrl: '../views/uploadForm.html'
        }).
        when('/uploads/:author', {
          templateUrl: '../views/viewAuthor.html'
        }).
        when('/uploads/::uuid/:filename', {
          templateUrl: '../views/viewImage.html'
        }).
        otherwise('/uploads');

    }
  );

app.controller('formCtrl', ['$http', 'Upload', '$scope', function($http, Upload, $scope) {

    $http.get('/uploads').then(function(response) {
        console.log(response.data);
        $scope.all = response.data;
    });

    $scope.submit = function() {
        Upload.upload({
            url: '/uploads',
            method: 'post',
            data: $scope.upload
        }).then(function(response) {
            tempID = response.data.file.filename;
            sessionStorage.setItem("tempID", tempID);

            tempFileName = response.data.file.originalname;
            sessionStorage.setItem("tempFileName", tempFileName);

            console.log(tempID);
            console.log(tempFileName);

            console.log(response.data);
            $scope.all.push(response.data);
            $scope.upload = {};
        })
    }
}]);

app.controller('formCtrlUpdate', ['$http', 'Upload', '$scope', function($http, Upload, $scope) {

    $http.get('/uploads').then(function(response) {
        console.log(response.data);
        $scope.all = response.data;
    });

    $scope.submit = function() {
        Upload.upload({
            url: '/uploads',
            method: 'put',
            data: $scope.upload
        }).then(function(response) {
            tempID = response.data.file.filename;
            sessionStorage.setItem("tempID", tempID);

            tempFileName = response.data.file.originalname;
            sessionStorage.setItem("tempFileName", tempFileName);

            // console.log(tempID);
            // console.log(tempFileName);

            console.log(response.data);
            $scope.all.push(response.data);
            $scope.upload = {};
        })
    }
}]);


app.controller('formCtrlSessions', ['$http', 'Upload', '$scope', function($http, Upload, $scope) {

    $http.get('/uploads/sessions').then(function(response) {
        // console.log(response.data);
        $scope.sessions = response.data;
    });

    
}]);

app.controller('formCtrlAuthor', ['$http', 'Upload', '$scope', '$routeParams', function($http, Upload, $scope, $routeParams) {
    
    console.log($routeParams.author);

    $http.get('/uploads/' + $routeParams.author).then(function(response) {
        $scope.author = response.data;
    });
}]);

app.controller('formCtrlImage', ['$http', 'Upload', '$scope', '$routeParams', function($http, Upload, $scope, $routeParams) {

    console.log($routeParams);

    // $http.get('/uploads/' + $routeParams.author).then(function(response) {
    //     $scope.image = response.data;
    // });
}]);



// app.controller('formCtrlSessions', ['$http', 'Upload', '$scope', function($http, Upload, $scope) {

//     $http.get('/uploads/sessions').then(function(response) {
//         console.log(response.data);
//         $scope.sessions = response.data;
//     });
// }]);