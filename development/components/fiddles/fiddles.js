'use strict';

angular.module('app.fiddles', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/fiddles', {
        templateUrl: '/components/fiddles/fiddles.html',
        controller: 'fiddlesCtrl'
    });
}])

.controller('fiddlesCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.movieSearch = function() {
    $http.get('http://www.omdbapi.com/?s=' + $scope.searchTitle)
    .success(function (data) {
        console.log(data);
        $scope.movies = data.Search;
    })
    .error(function (data, status) {
        console.log(data, status);
    });
    };
}]);
