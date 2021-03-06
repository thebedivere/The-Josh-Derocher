'use strict';

angular.module('app.blog', ['ngRoute'])

.factory('Blog', ['$http', function ($http) {
    return $http.get('/post');
    }])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/blog', {
        templateUrl: '/components/blog/blog.html',
        controller: 'BlogCtrl'
    })
    .when('/blog/:id', {
        templateUrl: '/components/blog/blogPost.html',
        controller: 'BlogPostCtrl'
    });
}])

.controller('BlogCtrl', ['$scope', 'Blog', '$log', function ($scope, Blog, $log) {
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

