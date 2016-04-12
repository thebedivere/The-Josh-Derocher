'use strict';

angular.module('app.fiddles', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/fiddles', {
        templateUrl: '/components/fiddles/fiddles.html',
        controller: 'fiddlesCtrl'
    });
}])

.controller('fiddlesCtrl', ['$scope', '$http', function ($scope, $http) {
    //Movie search
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
    // Get movie details
    $scope.movieDetails = function(imdbID) {
    $http.get('http://www.omdbapi.com/?i=' + imdbID + '&plot=short&r=json')
        .success(function (data) {
        console.log(data);
        $scope.movieDetail = data;
    })
    .error(function (data, status) {
        console.log(data, status);
    });
    };

    // Movie Model
    $scope.openModel = false;
    $scope.modelTrigger = function() {
        if ($scope.openModel == true) {
            $scope.openModel = false;
        } else {
            $scope.openModel = true;
        };
    };
}]);
