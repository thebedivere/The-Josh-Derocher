'use strict';

angular.module('app.game', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/game', {
        templateUrl: '/components/game/game.html',
        controller: 'gameCtrl'
    });
}])

.controller('gameCtrl', ['$scope', '$interval', function ($scope, $interval) {
    $scope.characters = [];
    $scope.inventory = {
        'food': 10,
        'water': 10
    };
    $scope.messages = [];

    function useItem(item, num) {
        $scope.inventory[item] -= num;
    };

    function addItem(item, num) {
        $scope.inventory[item] += num;
    };

    function random() {
        return (Math.random() * 10);
    }

    function Character(name) {
        this.name = name;
        this.health = 100;
        this.hunger = 100;
        this.thirst = 100;
        this.mood = 100;
        this.alive = true;
        this.busy = false;
        this.status = 'Idle';
        this.icon = 'fa fa-child fa-2x';
        this.increaseStat = function (stat, num) {
            this[stat] += num;
        }
        $scope.characters.push(this);
    };
    $scope.Terry = new Character('Terry');
    $scope.Graham = new Character('Graham');
    $scope.Eric = new Character('Eric');
    $scope.John = new Character('John');
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
            if (value.health == 0) {
                value.alive = false;
                $scope.messages.push(value.name + " has died.");
                $interval.cancel(Character.needs);
            }
        });
    }, 500);
    $scope.busy = function (name, time, status, icon) {
        name.busy = true;
        name.status = status;
        name.icon = icon;
        setTimeout(function () {
            name.busy = false;
            name.status = "Idle";
            name.icon = 'fa fa-child fa-2x';
        }, time);
    };
    $scope.eat = function (name) {
        if ($scope.inventory.food > 0 && $scope[name].hunger < 100) {
            $scope[name].increaseStat('hunger', 10);
            useItem('food', 1);
            $scope.busy($scope[name], 1000, "Eating", "fa fa-cutlery fa-2x")
        } else if ($scope.inventory.food <= 0) {
            $scope.messages.push($scope[name].name + ": There is nothing to eat!");
        } else if ($scope[name].hunger >= 100) {
            $scope.messages.push($scope[name].name + ": I can't eat anymore.");
        }

    };
    $scope.drink = function (name) {
        if ($scope.inventory.water > 0 && $scope[name].thirst < 100) {
            $scope[name].increaseStat('thirst', 10);
            useItem('water', 1);
            $scope.busy($scope[name], 1000, "Drinking", "fa fa-beer fa-2x");

        } else if ($scope.inventory.water <= 0) {
            $scope.messages.push($scope[name].name + ": There is nothing to drink!");
        } else if ($scope[name].thirst >= 100) {
            $scope.messages.push($scope[name].name + ": I can't drink anymore.");
        }

    };
    $scope.search = function (name, item, time) {
        $scope.busy($scope[name], time, "Looking for " + item, "fa fa-search fa-2x");
        setTimeout(function () {
        if (random() > 5) {
            addItem(item, random());
            $scope.messages.push($scope[name].name + ": I have found " + item);
        } else {
            $scope.messages.push($scope[name].name + ": I failed to find " + item);
        }
        }, time);

    };
}]);
