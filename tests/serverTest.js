// testing controller
describe('MyController', function () {
    var $httpBackend, $rootScope, createController, authRequestHandler;

    // Set up the module
    beforeEach(module('app.blog'));
    var scope;
    var ctrl;
    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller('BlogCtrl', {
            $scope: scope
        });

    }));
    beforeEach(inject(function ($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        //get data
        dataHandler = $httpBackend.when('GET', '/post').respond('data');


        // Get hold of a scope (i.e. the root scope)
        $rootScope = $injector.get('$rootScope');
        // The $controller service is used to create instances of controllers
        var $controller = $injector.get('$controller');
        createController = function () {
            return $controller('BlogCtrl', {
                '$scope': $rootScope
            });
        };
    }));


    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    it('should fetch authentication token', function () {
        $httpBackend.expectGET('/post');
        var controller = createController();
        $httpBackend.flush();
        expect(scope.blogSuccess).to.equal(true);
    });
});