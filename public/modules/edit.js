'use strict';

angular.module('app.edit', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/edit', {
        templateUrl: 'modules/edit.html',
        controller: 'EditCtrl'
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
    }]);
