describe('The blog', function () {
    var scope;
    var ctrl;
    beforeEach(module('app.blog'));
    beforeEach(inject(function ($rootScope, $controller) {

        scope = $rootScope.$new();
        ctrl = $controller('BlogCtrl', { $scope: scope });

    }));
    it('ctrl should be defined', function () {
        expect(ctrl).to.not.be.undefined;
    });
    it('scope should be defined', function () {
        expect(scope).to.not.be.undefined;
    });
    it('success should be true', function () {
        expect(scope.working).to.equal(true);
    });
});

describe('The blog post', function () {
    var scope;
    var ctrl;
    beforeEach(module('app.blog'));
    beforeEach(inject(function ($rootScope, $controller) {

        scope = $rootScope.$new();
        ctrl = $controller('BlogPostCtrl', { $scope: scope });

    }));
    it('ctrl should be defined', function () {
        expect(ctrl).to.not.be.undefined;
    });
    it('scope should be defined', function () {
        expect(scope).to.not.be.undefined;
    });
    it('success should be true', function () {
        expect(scope.working).to.equal(true);
    });
});
