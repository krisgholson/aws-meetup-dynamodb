/* jshint -W117, -W030 */
describe('DynamoController', function() {
  var controller;

  beforeEach(function() {
    bard.appModule('app.dynamo');
    bard.inject('$controller', '$log', '$rootScope');
  });

  beforeEach(function() {
    controller = $controller('DynamoController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Dynamo controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    describe('after activate', function() {
      it('should have title of Dynamo', function() {
        expect(controller.title).to.equal('Dynamo');
      });

      it('should have logged "Activated"', function() {
        expect($log.info.logs).to.match(/Activated/);
      });
    });
  });
});
