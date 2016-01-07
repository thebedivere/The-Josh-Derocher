'use strict';

angular.module('app', [
    'ngRoute',
    'ngSanitize'
]).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/posts.html',
        controller: 'PostController'
        }).when('/post/:id', {
        templateUrl: 'views/singlepost.html',
        controller: 'SinglePostController'
    }).when('/page/:id', {
        templateUrl: 'views/page.html',
        controller: 'PageController'
    }).otherwise({
        redirectTo: '/'
    })
}]);
