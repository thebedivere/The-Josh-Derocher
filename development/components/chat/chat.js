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
        // chat settings
        $scope.chatLimit = $routeParams.limit;
        if ($scope.chatLimit == null || undefined) {
            $scope.chatLimit = 25;
        };
        //get chat messages
        function getChat() {
            $http.get('/chat/' + $scope.chatLimit).success(function (data) {
                $scope.updateScroll();
                if (data != $scope.chat) {
                    $scope.chat = data;
                }
            }).error(function (data, status) {
                console.log(data, status);
                $scope.chat = [];
            });
        };
        $interval(function () {
            getChat();
        }, 10000);
        // Send chat
        $scope.formData = {};
        $scope.sendMessage = function () {
            $scope.formData.userName = $scope.userName;
            $http.post('/chat', $scope.formData)
                .success(function (data) {
                    $scope.formData = {};
                    $timeout(callTimeout, 5000);
                    getChat();
                    $scope.forceScroll();
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                    $timeout(callTimeout, 5000);
                });
        };

        // Keep chat scrolled to latest
        $scope.forceScroll = function () {
            if (document.getElementById("chat-history") != undefined) {
                var element = document.getElementById("chat-history");
                element.scrollTop = element.scrollHeight;

            };
        };
        $scope.forceScroll();
        $scope.updateScroll = function () {
            $scope.chatHeight = $('#chat-history').scrollTop() + $('#chat-history').height();
            if (
                ($scope.chatHeight <= $('#chat-messages').height()) && (($scope.chatHeight + 500) >= $('#chat-messages').height()) || $('#chat-history').scrollTop() == 0) {
                if (document.getElementById("chat-history") != undefined) {
                    var element = document.getElementById("chat-history");
                    element.scrollTop = element.scrollHeight;
                }
            }
        };
        $interval(function () {
            $scope.updateScroll();
        }, 1000);
        // Create color based on username
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
        $scope.getColor = function (name) {
            return ('color: ' + intToRGB(hashCode(name)));
        };
        // giphy search
        var giphyKey = "dc6zaTOxFJmzC";
        $scope.giphySearch = function (search) {
            $http.get('http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=dc6zaTOxFJmzC&limit=30')
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
        // user management
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
        // Log in model
        $scope.openModel = false;
        $scope.modelTrigger = function () {
            if ($scope.openModel == true) {
                $scope.openModel = false;
            } else {
                $scope.openModel = true;
            };
        };
        // Run scripts when document is loaded
        angular.element(document).ready(function () {
            getChat();
            $scope.updateScroll();
        });
        $scope.reloadRoute = function () {
            window.location.reload();
        }

        $scope.test = function (text) {
            console.log(text);
        };
        // End of controller
            }]);
