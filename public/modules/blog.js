'use strict';

angular.module('app.blog', ['ngRoute'])

.factory('Blog', ['$http', '$scope', function ($http, $scope) {
    return $http.get('/post');
    $scope.blogSuccess = true;
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
        $scope.blogSuccess = false;
        console.log(data, status);
        $scope.blog = [];
    });
}]);
