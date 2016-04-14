describe('The app', function () {
    var scope;
    beforeEach(module('app'));
    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
    }));
    it('scope should be defined', function () {
        expect(scope).to.not.be.undefined;
    });
});
