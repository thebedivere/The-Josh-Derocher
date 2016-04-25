'use strict';

angular.module('app.user', ['ngRoute', 'ngCookies'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/user', {
        templateUrl: '/components/user/user.html',
        controller: 'UserCtrl'
    })
}])

.controller('UserCtrl', ['$scope', '$http', '$log', '$timeout', '$cookies', function ($scope, $http, $log, $timeout, $cookies) {
    $scope.formData = {};
    $scope.authenticateUser = function () {
        $http.post('/api/authenticate', $scope.formData)
            .success(function (data) {
                console.log("Login success");
                $scope.userName = $scope.formData.name;
                $scope.formData = {};
                $scope.userInfo = data;
                $scope.userToken = data.token;
                $cookies.put('userToken', $scope.userToken);
                $cookies.put('userName', $scope.userName);
                $timeout(callTimeout, 5000);
                $scope.getUsers();
                console.log($scope.userToken);
            })
            .error(function (data) {
                $scope.alertText = 'Error: ' + data;
                console.log('Error: ' + data);
                $timeout(callTimeout, 5000);
            });
    };
    $scope.getUsers = function () {
        $scope.getToken();
        $http.get('/api/users?token=' + $scope.userToken)
            .success(function (data) {
                if (data.success == true) {
                    console.log("Loaded user info");
                    //console.log(data);
                    $scope.users = data;
                    $timeout(callTimeout, 5000);
                } else {
                    console.log("Login information was incorrect")
                };
            })
            .error(function (data) {
                $scope.alertText = 'Error: ' + data;
                console.log('Error: ' + data);
                $timeout(callTimeout, 5000);
            });
    };
    $scope.userLogOut = function () {
        $cookies.remove('userToken');
    };
    $scope.getToken = function () {
        $scope.userToken = $cookies.get('userToken');
        $scope.userName = $cookies.get('userName');
        //console.log($scope.userToken);
    };
    $scope.getUsers();
    function callTimeout() {
        $scope.submissionSuccess = false;
    };
    $scope.getToken();
    function callTimeout() {
        $scope.submissionSuccess = false;
    }
    // Log in model
    $scope.openModel = false;
    $scope.modelTrigger = function () {
        if ($scope.openModel == true) {
            $scope.openModel = false;
        } else {
            $scope.openModel = true;
        };
    };
    // reload current window
    $scope.reloadRoute = function () {
        window.location.reload();
    }


}])
.directive('userLoging', function() {
    return {
        restrict: 'AE',
        replace: 'true',
        templateUrl: './components/user/user.html',
        controller: 'UserCtrl'
    };
})

// end of file

;
