/* jshint -W117, -W030 */
describe('dynamo routes', function() {
  describe('state', function() {
    var view = 'app/dymamo/dynamo.html';

    beforeEach(function() {
      module('app.dynamo', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
    });

    it('should map state dynamo to url /dynamo ', function() {
      expect($state.href('dynamo', {})).to.equal('/dynamo');
    });

    it('should map /dynamo route to dynamo View template', function() {
      expect($state.get('dynamo').templateUrl).to.equal(view);
    });

    it('of dynamo should work with $state.go', function() {
      $state.go('dynamo');
      $rootScope.$apply();
      expect($state.is('dynamo'));
    });
  });
});
