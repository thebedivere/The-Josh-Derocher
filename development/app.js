'use strict';
var toggleMenu = function() {
 $( '#navigationMenu' ).toggleClass('off-screen');
    console.log("Toggle 500");
};
angular.module('app', [
    'ngRoute',
    'app.home',
    'app.blog',
    'app.edit',
    'app.fiddles',
    'app.game'
])
    .config(['$routeProvider',  function ($routeProvider) {
        $routeProvider.otherwise({
                redirectTo: '/home',
                templateUrl: '/components/home/home.html'
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
})

.controller('AppCtrl', ['$scope', function ($scope) {
    $scope.testTest = true;
}])


.directive('fallbackSrc', function () {
  var fallbackSrc = {
    link: function postLink(scope, iElement, iAttrs) {
      iElement.bind('error', function() {
        angular.element(this).attr("src", iAttrs.fallbackSrc);
      });
    }
   }
   return fallbackSrc;
});;

