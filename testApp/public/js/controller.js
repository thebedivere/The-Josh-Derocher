angular.module('app', ['ngRoute'])
    // service
    .factory('Blog', ['$http', function ($http) {
        return $http.get('/post');
    }])

// blog controller
.controller('BlogController', ['$scope', 'Blog', function ($scope, Blog) {
        Blog.success(function (data) {
            $scope.blog = data;
            console.log(data);
        }).error(function (data, status) {
            console.log(data, status);
            $scope.blog = [];
        });
    }])
    // edit
    .controller('EditController', ['$scope', '$http', function ($scope, $http) {
        $scope.formData = {};
        $scope.createPost = function () {
            $http.post('/post', $scope.formData)
                .success(function (data) {
                    $scope.formData = {};
                    $scope.post = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };
    }])
    // routes

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/blog.html',
            controller: 'BlogController'
        });
         }])

.filter('capitalize', function () {
    return function (input, all) {
        var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
        return (!!input) ? input.replace(reg, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }) : '';
    }
})


.filter('markdown', function ($sce) {
    var converter = new showdown.Converter();
    return function (value) {
        var html = converter.makeHtml(value || '');
        return $sce.trustAsHtml(html);
    }
});