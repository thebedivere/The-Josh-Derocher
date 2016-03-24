'use strict';
angular.module('app', [
    'ngRoute',
    'app.home',
    'app.blog',
    'app.edit',
    'app.fiddles',
<<<<<<< HEAD
    'app.game'
=======
    'app.404'
>>>>>>> 6ee4d2bc9aab6b1bc95e4794ebd5a10a2172f21e
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

