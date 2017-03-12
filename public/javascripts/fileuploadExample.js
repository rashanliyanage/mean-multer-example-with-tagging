var app = angular.module('fileUpload', ['ngFileUpload']);
var tempFileName, tempID;


app.controller('formCtrl', ['$http', 'Upload', '$scope', function($http, Upload, $scope) {

    $http.get('/uploads').then(function(response) {
        console.log(response.data);
        $scope.uploads = response.data;
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
            $scope.uploads.push(response.data);
            $scope.upload = {};
        })
    }
}]);
