angular.
  module('authorDetail').
  component('authorDetail', {
    template: 'TBD: Detail view for <span>{{$ctrl.phoneId}}</span>',
    controller: ['$routeParams',
      function AuthorDetailController($routeParams) {
        this.author = $routeParams.author;
      }
    ]
  });