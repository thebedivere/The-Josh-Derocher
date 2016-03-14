'use strict';
angular.module('app', [
    'ngRoute',
    'app.home',
    'app.blog',
    'app.edit',
    'app.fiddles',
    'app.404'
])
    .config(['$routeProvider', function ($routeProvider) {
        
        $routeProvider.otherwise({
                redirectTo: '/home',
                templateUrl: 'home/home.html'
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

