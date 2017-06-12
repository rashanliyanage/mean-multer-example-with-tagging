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
    when('/formUpload', {
        templateUrl: '../views/formUpload.html'
    }).
    when('/formImageDes/', {
        templateUrl: '../views/formImageDes.html'
    }).
    when('/formImageDesLocation/', {
        templateUrl: '../views/formImageDes.location.html'
    }).
    when('/formImageInfo/', {
        templateUrl: '../views/formImageInfo.html'
    }).
    when('/formPRelation/:uuid/:filename', {
        templateUrl: '../views/formPRelation.html'
    }).
    when('/formPRelationSub/:uuid/:filename', {
        templateUrl: '../views/formPRelation.Sub.html'
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







app.controller('CtrlUpload', ['$http', 'Upload', '$scope', function ($http, Upload, $scope) {

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
            tempID = response.data.file.filename;
            sessionStorage.setItem("ID", tempID);

            tempFileName = response.data.file.originalname;
            sessionStorage.setItem("FileName", tempFileName);

            console.log(tempID);
            console.log(tempFileName);

            console.log(response.data);
            $scope.all.push(response.data);
            $scope.upload = {};
            console.log("Uploaded")
        })
    }
}]);
app.controller('CtrlUpdateData', ['$http', 'Upload', '$scope', '$routeParams', function ($http, Upload, $scope, $routeParams) {

    // console.log($routeParams);

    $http.get('/uploads/image/' + $routeParams.uuid + '/' + $routeParams.filename).then(function (response) {
        console.log(response.data);
        console.log("________Response.data[0]_______________");
        console.log(response.data[0].sessionName);
        console.log(response.data[0].sessionIdentifier);


        $scope.image = response.data;
        $scope.upload = {
            sessionName: response.data[0].sessionName,
            sessionIdentifier: response.data[0].sessionIdentifier
        };
        console.log("Beginning");
    });
    $scope.submit = function () {
        // console.log($scope.image)
        // console.log("Update")

        Upload.upload({
            url: '/uploads/updateUploadData/' + $routeParams.uuid + '/' + $routeParams.filename,
            method: 'put',
            data: $scope.upload
        }).then(function (response) {
            // console.log(response.data);
            $scope.image.push(response.data);
            // $scope.image = {};
            console.log("Update")
        })
    }
}]);



app.controller('CtrlUpdateImageInformation', ['$http', 'Upload', '$scope', '$routeParams', function ($http, Upload, $scope, $routeParams) {

    // console.log($routeParams);

    // $http.get('/formImageInfo/' + $routeParams.uuid + '/' + $routeParams.filename).then(function (response) {
    $http.get('/uploads/image/' + sessionStorage.ID + '/' + sessionStorage.FileName).then(function (response) {

        console.log(response.data);



        $scope.image = response.data;
        console.log(response.data[0].tags.imageInformation);
        $scope.upload = {
            tags: {
                imageInformation: response.data[0].tags.imageInformation
            },
        }
    });
    $scope.submit = function () {
        Upload.upload({
            url: '/uploads/formImageInfo/' + sessionStorage.ID + '/' + sessionStorage.FileName,
            method: 'put',
            data: $scope.upload
        }).then(function (response) {
            // console.log(response.data);
            $scope.image.push(response.data);
            // $scope.image = {};
            console.log("Update")
        })
    }
}]);


app.controller('CtrlUpdateImageDescrip', ['$http', 'Upload', '$scope', '$routeParams', function ($http, Upload, $scope, $routeParams) {

    // console.log($routeParams);

    // $http.get('/formImageInfo/' + $routeParams.uuid + '/' + $routeParams.filename).then(function (response) {
    $http.get('/uploads/image/' + sessionStorage.ID + '/' + sessionStorage.FileName).then(function (response) {

        console.log(response.data);



        $scope.image = response.data;
        console.log(response.data[0].tags.imageInformation);
        // $scope.upload = {
        //     tags: {
        //         imageInformation: response.data[0].tags.imageInformation
        //     },
        // }
    });
    $scope.submit = function () {
        Upload.upload({
            url: '/uploads/formImageDes/' + sessionStorage.ID + '/' + sessionStorage.FileName,
            method: 'put',
            data: $scope.upload
        }).then(function (response) {
            // console.log(response.data);
            $scope.image.push(response.data);
            // $scope.image = {};
            console.log("Update")
        })
    }
}]);


app.controller('CtrlUpdateImageDescripLoc', ['$http', 'Upload', '$scope', '$routeParams', function ($http, Upload, $scope, $routeParams) {

    // console.log($routeParams);

    // $http.get('/formImageInfo/' + $routeParams.uuid + '/' + $routeParams.filename).then(function (response) {
    $http.get('/uploads/image/' + sessionStorage.ID + '/' + sessionStorage.FileName).then(function (response) {

        console.log(response.data);



        $scope.image = response.data;
        // console.log(response.data[0].tags.imageInformation);
        // $scope.upload = {
        //     tags: {
        //         imageInformation: response.data[0].tags.imageInformation
        //     },
        // }
    });
    $scope.submit = function () {
        Upload.upload({
            url: '/uploads/formImageDesLocation/' + sessionStorage.ID + '/' + sessionStorage.FileName,
            method: 'put',
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