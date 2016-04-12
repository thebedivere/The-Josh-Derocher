'use strict';
angular.module('app.chat', ['ngRoute', 'ngCookies', 'ngSanitize', 'ngEmbed', 'oblador.lazytube'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/chat', {
            templateUrl: '/components/chat/chat.html',
            controller: 'ChatCtrl'
        })
        $routeProvider.when('/chat/:limit', {
            templateUrl: '/components/chat/chat.html',
            controller: 'ChatCtrl'
        })
}])
    .controller('ChatCtrl', ['$scope', '$http', '$log', '$timeout', '$cookies', '$interval', '$routeParams', function ($scope, $http, $log, $timeout, $cookies, $interval, $routeParams) {
        $scope.chatLimit = $routeParams.limit;
        console.log('Chat limit: ' + $scope.chatLimit);
        $scope.getColor = function (name) {
            return ('color: ' + intToRGB(hashCode(name)));
        };
        //get chat messages\
        function getChat() {
            $http.get('/chat/' + $scope.chatLimit).success(function (data) {
                $scope.chat = data;
                var element = document.getElementById("chat-history");
                element.scrollTop = element.scrollHeight;
                $scope.updateScroll();
            }).error(function (data, status) {
                console.log(data, status);
                $scope.chat = [];
            });
        };
        $interval(function () {
            getChat();
        }, 100000);
        $scope.formData = {};
        $scope.sendMessage = function () {
            $scope.formData.userName = $scope.userName;
            $http.post('/chat', $scope.formData)
                .success(function (data) {
                    console.log($scope.formData);
                    $scope.formData = {};
                    $timeout(callTimeout, 5000);
                    getChat();
                    $scope.updateScroll();
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                    $timeout(callTimeout, 5000);
                });
        };

        function callTimeout() {
            $scope.submissionSuccess = false;
        }
        $scope.userLogOut = function () {
            $cookies.remove('userToken');
            $cookies.remove('userName');
        };
        $scope.getToken = function () {
            $scope.userToken = $cookies.get('userToken');
            $scope.userName = $cookies.get('userName');
            //console.log($scope.userToken);
        };
        $scope.getToken();

        function callTimeout() {
            $scope.submissionSuccess = false;
        }

        $scope.updateScroll = function() {
            if (document.getElementById("chat-history") != undefined) {
                var element = document.getElementById("chat-history");
                element.scrollTop = element.scrollHeight;
            }
        }

        function hashCode(str) { // java String#hashCode
            var hash = 0;
            for (var i = 0; i < str.length; i++) {
                hash = str.charCodeAt(i) + ((hash << 5) - hash);
            }
            return hash;
        }

        function intToRGB(i) {
            var c = (i & 0x00FFFFFF)
                .toString(16)
                .toUpperCase();
            return "00000".substring(0, 6 - c.length) + c;
        }
        angular.element(document).ready(function () {
            getChat();
            $scope.updateScroll();
        });

        // giphy search

        var giphyKey = "dc6zaTOxFJmzC";

        $scope.giphySearch = function (search) {
            $http.get('http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=dc6zaTOxFJmzC')
                .success(function (data) {
                    $scope.giphys = data.data;
                })
                .error(function (data, status) {
                    console.log(data, status);
                    $scope.giphys = [];
                })
        };
        $scope.giphyTranslate = function (search) {
            $http.get('http://api.giphy.com/v1/gifs/translate?s=' + search + '&api_key=dc6zaTOxFJmzC')
                .success(function (data) {
                console.log(data);
                    $scope.giphys = data.data;
                })
                .error(function (data, status) {
                    console.log(data, status);
                    $scope.giphys = [];
                })
        };
            }]);
