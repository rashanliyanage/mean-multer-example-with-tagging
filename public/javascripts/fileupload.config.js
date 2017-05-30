angular.
  module('fileUpload').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        // when('/phones', {
        //   template: '<phone-list></phone-list>'
        // }).
        when('/uploads/:author', {
          template: '<viewAuthor></viewAuthor>'
        }).
        otherwise('/uploads');
    }
  ]);