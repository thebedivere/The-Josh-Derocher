'use strict';

angular.module('app.toast', ['ngRoute'])

.controller('ToastCtrl', ['$rootScope', function ($rootScope) {
    if ($rootScope.messages === undefined) {
        $rootScope.messages = [];
    }
    else {
        $rootScope.messages = $rootScope.messages;
    }
}]);