'use strict';

angular.module('app.edit', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/edit', {
            templateUrl: '/components/blog/edit.html',
            controller: 'EditCtrl'
        })
        .when('/edit/:id', {
            templateUrl: '/components/blog/blogUpdate.html',
            controller: 'UpdateCtrl'
        });
}])

.controller('EditCtrl', ['$scope', '$rootScope', '$http', '$timeout', function ($scope, $rootScope, $http, $timeout) {
        // post creation
        $scope.formData = {};
        $scope.createPost = function () {
            $http.post('/post', $scope.formData)
                .success(function (data) {
                    $scope.submissionSuccess = true;
                    $scope.alertText = "Success";
                    $scope.formData = {};
                    $scope.post = data;
                    $rootScope.messages.push('Blog post has been published!');
                    $timeout(callTimeout, 5000);
                })
                .error(function (data) {
                    $scope.alertText = 'Error: ' + data;
                    $scope.submissionSuccess = true;
                    console.log('Error: ' + data);
                    $rootScope.messages.push('Oh no! There was an error trying to create your blog post! ' + data);
                    $timeout(callTimeout, 5000);
                });
        };

        function callTimeout() {
            $scope.submissionSuccess = false;
        }

        // function to expand textarea to match content
        $scope.autoExpand = function (e) {
            var element = typeof e === 'object' ? e.target : document.getElementById(e);
            console.log(element.scrollHeight);
            var scrollHeight = element.scrollHeight - 20;
            if (scrollHeight < 79) {
                scrollHeight = 79
            }
            element.style.height = scrollHeight + "px";
        };

        function expand() {
            $scope.autoExpand('TextArea');
        }
    }])
    .controller('UpdateCtrl', ['$scope', '$rootScope','$http', '$timeout', '$routeParams', '$location', function ($scope, $rootScope, $http, $timeout, $routeParams, $location) {
        $http.get('/post/' + $routeParams.id)
            .success(function (data) {
                $scope.blogSuccess = true;
                $scope.blog = data;
                $scope.formData = data;
                $scope.postId = $routeParams.id;
                $scope.createPost = function () {
                    $http.put('/post/' + $routeParams.id, $scope.formData)
                        .success(function (data) {
                            $scope.submissionSuccess = true;
                            $scope.alertText = "Success";
                            $scope.formData = {};
                            $scope.post = data;
                            $rootScope.messages.push('Blog post has been updated successfuly!');
                            $timeout(callTimeout, 5000);
                            
                        })
                        .error(function (data) {
                            $scope.alertText = 'Error: ' + data;
                            $scope.submissionSuccess = true;
                            console.log('Error: ' + data);
                            $rootScope.messages.push('Oh no! There was an error trying to update your blog post! ' + data);
                            $timeout(callTimeout, 5000);
                        });
                };
                
                function callTimeout() {
                    $scope.submissionSuccess = false;
                }
                $scope.goToPost = function() {
                    $location.url('/blog/' + $scope.postId)
                };
            })
            .error(function (data, status) {
                $scope.blogSuccess = false;
                console.log(data, status);
                $scope.blog = [];
            });

    }]);
