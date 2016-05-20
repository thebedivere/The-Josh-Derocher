

'use strict';
angular.module('app.inputs', [])

.directive('textInput', function () {
        return {
            restrict: 'AE',
            replace: 'true',
            templateUrl: './components/inputs/inputs.html',
            scope: {
                label: '@',
                model: '=',
                runThis: '&'
            }
        };
    })

.directive('passwordInput', function () {
        return {
            restrict: 'AE',
            replace: 'true',
            templateUrl: './components/inputs/password.html',
            scope: {
                label: '@',
                model: '=',
                runThis: '&'
            }
        };
    })
    .directive('textArea', function () {
        return {
            restrict: 'AE',
            replace: 'true',
            templateUrl: './components/inputs/textArea.html',
            scope: {
                label: '@',
                model: '=',
                change: '&'
            }

        };
    })
    // end of file
;
