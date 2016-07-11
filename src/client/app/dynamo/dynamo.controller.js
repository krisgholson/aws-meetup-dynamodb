(function() {
  'use strict';

  angular
    .module('app.dynamo')
    .controller('DynamoController', DynamoController);

  DynamoController.$inject = ['logger'];
  /* @ngInject */
  function DynamoController(logger) {
    var vm = this;
    vm.title = 'Dynamo';

    activate();

    function activate() {
      logger.info('Activated Dynamo View');
    }
  }
})();
