'use strict';

angular.module('app.fiddles', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/fiddles', {
        templateUrl: 'modules/fiddles.html',
        controller: 'fiddlesCtrl'
    });
}])

.controller('fiddlesCtrl', ['$scope', function ($scope) {

}]);
