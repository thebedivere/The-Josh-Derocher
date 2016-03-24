'use strict';

angular.module('app.blog', ['ngRoute'])

.factory('Blog', ['$http', function ($http) {
    return $http.get('/post');
    }])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/blog', {
        templateUrl: 'modules/blog.html',
        controller: 'BlogCtrl'
    })
    .when('/blog/:id', {
        templateUrl: 'modules/blogPost.html',
        controller: 'BlogPostCtrl'
    });
}])

.controller('BlogCtrl', ['$scope', 'Blog', '$log', function ($scope, Blog, $log) {
    $scope.working = true;
    Blog.success(function (data) {
        $scope.blogSuccess = true;
        $scope.blog = data;
    }).error(function (data, status) {
        $scope.blogSuccess = false;
        console.log(data, status);
        $scope.blog = [];
    });
}])

.controller('BlogPostCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $scope.working = true;
        $http.get('/post/' + $routeParams.id)
        .success(function (data) {
        $scope.blogSuccess = true;
        $scope.blog = data;
    })
        .error(function (data, status) {
        $scope.blogSuccess = false;
        console.log(data, status);
        $scope.blog = [];
    });
}]);

