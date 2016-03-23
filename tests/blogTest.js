
describe('app', function () {
    var yes = true;
    var scope;
    var ctrl;
    beforeEach(module('app'));
    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller('AppCtrl', {$scope: scope});
    }));
    it('should be true', function() {
        expect(yes).to.equal(true);
    });

});
