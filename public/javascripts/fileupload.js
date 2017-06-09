var app = angular.module('fileUpload', [
    'ngFileUpload',
    'ngResource',
    'ngRoute'
]);
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
    when('/topics', {
        templateUrl: '../views/viewTopics.html'
    }).
    when('/uploadForm', {
        templateUrl: '../views/uploadForm.html'
    }).
    when('/updateForm', {
        templateUrl: '../views/updateForm.html'
    }).
    when('/uploads/update/:uuid/:filename', {
        templateUrl: '../views/updateForm.html'
    }).
    when('/uploads/:author', {
        templateUrl: '../views/viewAuthor.html'
    }).
    when('/uploads/image/:uuid/:filename', {
        templateUrl: '../views/viewImage.html'
    }).
    otherwise('/');

});

app.controller('formCtrl', ['$http', 'Upload', '$scope', function ($http, Upload, $scope) {

    // $http.get('/uploads').then(function (response) {
    //     console.log(response.data);
    //     $scope.all = response.data;
    // });

    $scope.submit = function () {
        console.log($scope.upload)
        // Upload.upload({
        //     url: '/uploads',
        //     method: 'post',
        //     data: $scope.upload
        // }).then(function (response) {
        //     // tempID = response.data.file.filename;
        //     // sessionStorage.setItem("tempID", tempID);

        //     // tempFileName = response.data.file.originalname;
        //     // sessionStorage.setItem("tempFileName", tempFileName);

        //     // console.log(tempID);
        //     // console.log(tempFileName);

        //     console.log(response.data);
        //     $scope.all.push(response.data);
        //     $scope.upload = {};
        //     console.log("Uploaded")
        // })
    }
}]);
app.controller('formCtrlUpdate', ['$http', 'Upload', '$scope', '$routeParams', function ($http, Upload, $scope, $routeParams) {

    // console.log($routeParams);

    $http.get('/uploads/update/' + $routeParams.uuid + '/' + $routeParams.filename).then(function (response) {
        console.log(response.data);
        $scope.image = response.data;
        console.log("Beginning");
    });

    $scope.submit = function () {
        console.log($scope.image)
        // console.log("Update")

        Upload.upload({
            url: '/uploads/update/' + $routeParams.uuid + '/' + $routeParams.filename,
            method: 'post',
            data: {
                _method: 'put',
                file: $scope.image
            }
            // data: $scope.image
        }).then(function (response) {
            console.log(response.data);
            $scope.all.push(response.data);
            // $scope.image = {};
            console.log("Update")
        })
    }
}]);



app.controller('formCtrlSessions', ['$http', 'Upload', '$scope', function ($http, Upload, $scope) {

    $http.get('/uploads/sessions').then(function (response) {
        // console.log(response.data);
        $scope.sessions = response.data;
    });



}]);

app.controller('formCtrlAuthor', ['$http', 'Upload', '$scope', '$routeParams', function ($http, Upload, $scope, $routeParams) {

    // console.log($routeParams.author);

    $http.get('/uploads/' + $routeParams.author).then(function (response) {
        console.log(response.data);
        $scope.author = response.data;
    });
}]);


app.controller('CtrlTopic', ['$http', 'Upload', '$scope', '$routeParams', function ($http, Upload, $scope, $routeParams) {

    // console.log($routeParams.author);

    $http.get('/uploads/topics').then(function (response) {
        console.log(response.data);
        $scope.topics = response.data;
    });
}]);

app.controller('formCtrlImage', ['$http', 'Upload', '$scope', '$routeParams', function ($http, Upload, $scope, $routeParams) {

    // console.log($routeParams);

    $http.get('/uploads/image/' + $routeParams.uuid + '/' + $routeParams.filename).then(function (response) {
        console.log(response.data);
        $scope.image = response.data;
    });
}]);



// app.controller('formCtrlSessions', ['$http', 'Upload', '$scope', function($http, Upload, $scope) {

//     $http.get('/uploads/sessions').then(function(response) {
//         console.log(response.data);
//         $scope.sessions = response.data;
//     });
// }]);