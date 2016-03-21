'use strict';

angular.module('app.edit', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/edit', {
        templateUrl: 'modules/edit.html',
        controller: 'EditCtrl'
    })
    .when('/edit/:id', {
        templateUrl: 'modules/update.html',
        controller: 'UpdateCtrl'
    });
}])

.controller('EditCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
        $scope.formData = {};
        $scope.createPost = function () {
            $http.post('/post', $scope.formData)
                .success(function (data) {
                $scope.submissionSuccess = true;
                    $scope.alertText = "Success";
                    $scope.formData = {};
                    $scope.post = data;
                    $timeout(callTimeout, 5000);
                })
                .error(function (data) {
                    $scope.alertText = 'Error: ' + data;
                    $scope.submissionSuccess = true;
                    console.log('Error: ' + data);
                    $timeout(callTimeout, 5000);
                });
        };
        function callTimeout() {
           $scope.submissionSuccess = false;
        }
    }])
.controller('UpdateCtrl', ['$scope', '$http', '$timeout', '$routeParams', function ($scope, $http, $timeout, $routeParams) {
    $http.get('/post/' + $routeParams.id)
        .success(function (data) {
        $scope.blogSuccess = true;
        $scope.blog = data;
        $scope.formData = data;
        $scope.createPost = function () {
            $http.put('/post/' + $routeParams.id, $scope.formData)
                .success(function (data) {
                $scope.submissionSuccess = true;
                    $scope.alertText = "Success";
                    $scope.formData = {};
                    $scope.post = data;
                    $timeout(callTimeout, 5000);
                })
                .error(function (data) {
                    $scope.alertText = 'Error: ' + data;
                    $scope.submissionSuccess = true;
                    console.log('Error: ' + data);
                    $timeout(callTimeout, 5000);
                });
        };
        function callTimeout() {
           $scope.submissionSuccess = false;
        }
    })
        .error(function (data, status) {
        $scope.blogSuccess = false;
        console.log(data, status);
        $scope.blog = [];
    });

    }]);
