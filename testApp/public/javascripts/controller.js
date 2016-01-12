angular.module('app', ['ngRoute'])
    // service
    .factory('Blog', ['$http', function ($http) {
        return $http.get('/blog');
    }])

// controller
.controller('BlogController', ['$scope', 'Blog', function ($scope, Blog) {
        Blog.success(function (data) {
            $scope.blog = data;
            console.log( data );
        }).error(function (data, status) {
            console.log(data, status);
            $scope.blog = [];
        });
    }])
    // routes

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: '/blog.html',
        controller: 'BlogController'
    });
         }]);