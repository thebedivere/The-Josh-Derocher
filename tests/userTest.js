describe('User', function () {
    var scope;
    beforeEach(module('app'));
    beforeEach(module('app.user'));
    beforeEach(inject(function ($rootScope, $controller) {
       scope = $rootScope.$new();
        ctrl = $controller('UserCtrl', {
            $scope: scope
        });
    }));
    it('scope should be defined', function () {
        expect(scope).to.not.be.undefined;
    });
    it('model should be closed by default', function () {
        expect(scope.openModel).to.equal(false);
    });
});