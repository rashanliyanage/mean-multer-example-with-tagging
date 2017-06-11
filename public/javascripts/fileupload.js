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

app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

app.controller('formCtrl', ['$http', 'Upload', '$scope', function ($http, Upload, $scope) {

    $http.get('/uploads').then(function (response) {
        console.log(response.data);
        $scope.all = response.data;
    });

    $scope.submit = function () {
        // console.log($scope.upload)
        Upload.upload({
            url: '/uploads',
            method: 'post',
            data: $scope.upload
        }).then(function (response) {
            // tempID = response.data.file.filename;
            // sessionStorage.setItem("tempID", tempID);

            // tempFileName = response.data.file.originalname;
            // sessionStorage.setItem("tempFileName", tempFileName);

            // console.log(tempID);
            // console.log(tempFileName);

            console.log(response.data);
            $scope.all.push(response.data);
            $scope.upload = {};
            console.log("Uploaded")
        })
    }
}]);
app.controller('formCtrlUpdate', ['$http', 'Upload', '$scope', '$routeParams', function ($http, Upload, $scope, $routeParams) {

    // console.log($routeParams);

    $http.get('/uploads/update/' + $routeParams.uuid + '/' + $routeParams.filename).then(function (response) {
        console.log(response.data);
        console.log("________Response.data[0]_______________");
        console.log(response.data[0].tags);


        var obj = response.data[0].tags.info
        var myJSON = JSON.stringify(obj)
        console.log(myJSON);

        $scope.image = response.data;
        $scope.upload = {
            name: response.data[0].name,
            tags: {
                info: response.data[0].tags.info,
                // info: "HDF",
                CreatorArtist: response.data[0].tags.CreatorArtist
            }
        };
        console.log("Beginning");
    });



    $scope.submit = function () {
        // console.log($scope.image)
        // console.log("Update")

        Upload.upload({
            url: '/uploads/update/' + $routeParams.uuid + '/' + $routeParams.filename,
            method: 'put',
            // data: {
            //     _method: 'PUT',
            //     data: $scope.image
            // }
            data: $scope.upload
        }).then(function (response) {
            // console.log(response.data);
            $scope.image.push(response.data);
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