// testing controller
describe('The blog request', function () {
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


    it('should return success', function () {
        $httpBackend.expectGET('/post');
        var controller = createController();
        $httpBackend.flush();
        expect(scope.blogSuccess).to.equal(true);
    });
});


describe('The blog controller', function () {
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

    
    
});

describe('The blog post controller', function () {
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


// testing controller
describe('The request for an individual blog post', function () {
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


    it('should return success', function () {
        $httpBackend.expectGET('/post');
        var controller = createController();
        $httpBackend.flush();
        expect(scope.blogSuccess).to.equal(true);
    });
});