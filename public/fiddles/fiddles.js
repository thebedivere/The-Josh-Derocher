'use strict';

angular.module('app.fiddles', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/fiddles', {
        templateUrl: 'fiddles/fiddles.html',
        controller: 'fiddlesCtrl'
    });
}])

.controller('fiddlesCtrl', ['$scope', function ($scope) {

}]);