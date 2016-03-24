'use strict';

angular.module('app.game', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/game', {
        templateUrl: 'modules/game.html',
        controller: 'gameCtrl'
    });
}])

.controller('gameCtrl', ['$scope', '$interval', function ($scope, $interval) {
    function Character(name) {
        this.name = name;
        this.health = 100;
        this.hunger = 100;
        this.thirst = 100;
        this.mood = 100;
        this.alive = true;
        this.busy = false;
    };
    var Bronan = new  character('Bronan');
    $scope.characters = [];
    $scope.characters.push(Bronan);

    Character.needs = $interval(function () {
        angular.forEach($scope.characters, function (value, key) {
            if (value.thirst > 0) {
                value.thirst -= 1;
            }
            if (value.hunger > 0) {
                value.hunger -= 0.5;
            }
            if (value.thirst == 0 || value.hunger == 0) {
                if (value.health > 0) {
                    value.health -= .5;
                }
                if (value.mood > 0) {
                    value.mood -= 1;
                }
            }
        });
    }, 500);
}]);
