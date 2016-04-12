'use strict';
var toggleMenu = function () {
    $('#navigationMenu').toggleClass('off-screen');
    console.log("Toggle 500");
};
angular.module('app', [
    'ngRoute'
    , 'app.home'
    , 'app.blog'
    , 'app.edit'
    , 'app.fiddles'
    , 'app.game'
    , 'app.user'
    , 'app.chat'
])
    .config(['$routeProvider', function ($routeProvider) {
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
    .filter('image', function ($sce) {
        return function (input) {
            if (input != undefined) {
                // parse images into <img> tag
                if (input.match(/(.jpg|.png|.gif)/)) {
                    var output = "<img src='" + input + "'>";
                }
                // Parse full youtube links into embeds
                else if (input.match(/(youtube.com)/)) {
                    var video_id = input.split('v=')[1];
                    if (video_id != undefined) {
                        var ampersandPosition = video_id.indexOf('&');
                        if (ampersandPosition != -1) {
                        video_id = video_id.substring(0, ampersandPosition);
                        }
                    };
                    var output = '<iframe ob-lazytube width="560" height="315" src="https://www.youtube.com/embed/' + video_id + '" frameborder="0" allowfullscreen></iframe>';
                }
                // parse short youtu.be links into embeds
                else if (input.match(/(youtu.be)/)) {
                    var video_id = input.split('youtu.be/')[1];
                    if (video_id != undefined) {
                        var ampersandPosition = video_id.indexOf('&');
                        if (ampersandPosition != -1) {
                            video_id = video_id.substring(0, ampersandPosition);
                        }
                    }
                    var output = '<iframe ob-lazytube width="560" height="315" src="https://www.youtube.com/embed/' + video_id + '" frameborder="0" allowfullscreen></iframe>';
                }
                // Parse links into <a href="">
                else if (input.match(/(.com|.org|.edu|.net|.us|http|https)/)) {
                    var output = "<a href='" + input + "'>" + input + "</a>";
                }
                // if the text doesn't match anything, just return text
                else {
                    var output = input;
                }
                return $sce.trustAsHtml(output);
            };
        };
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
            iElement.bind('error', function () {
                angular.element(this).attr("src", iAttrs.fallbackSrc);
            });
        }
    }
    return fallbackSrc;
});;
