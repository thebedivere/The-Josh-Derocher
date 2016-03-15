'use strict';

angular.module('app.blog', ['ngRoute'])

.factory('Blog', ['$http', function ($http) {
    return $http.get('/post');
    }])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/blog', {
        templateUrl: 'modules/blog.html',
        controller: 'BlogCtrl'
    });
}])

.controller('BlogCtrl', ['$scope', 'Blog', function ($scope, Blog) {
    Blog.success(function (data) {
        $scope.blog = data;
    }).error(function (data, status) {
        console.log(data, status);
        $scope.blog = [];
    });
}]);
