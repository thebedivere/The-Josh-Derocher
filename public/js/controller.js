angular.module('myApp', [
    'ngRoute',
    'myApp.index',
    'myApp.blog',
])
    // service
    .factory('Blog', ['$http', function ($http) {
        return $http.get('/post');
    }])
// blog controller
.controller('BlogController', ['$scope', 'Blog', function ($scope, Blog) {
        Blog.success(function (data) {
            $scope.blog = data;

        }).error(function (data, status) {
            console.log(data, status);
            $scope.blog = [];
        });
    }])
    // edit
    .controller('EditController', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
        $scope.formData = {};
        $scope.createPost = function () {
            $http.post('/post', $scope.formData)
                .success(function (data) {
                $scope.submissionSuccess = true;
                    $scope.alertText = "Success";
                    $scope.formData = {};
                    $scope.post = data;
                    $timeout(callTimeout, 5000);
                })
                .error(function (data) {
                    $scope.alertText = 'Error: ' + data;
                    $scope.submissionSuccess = true;
                    console.log('Error: ' + data);
                    $timeout(callTimeout, 5000);
                });
        };
        function callTimeout() {
           $scope.submissionSuccess = false;
        }
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