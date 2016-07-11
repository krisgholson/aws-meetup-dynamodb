(function() {
  'use strict';

  angular
    .module('app.dynamo')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'dynamo',
        config: {
          url: '/',
          templateUrl: 'app/dynamo/dynamo.html',
          controller: 'DynamoController',
          controllerAs: 'vm',
          title: 'Dynamo',
          settings: {
            nav: 1,
            content: '<i class="fa fa-lock"></i> Dynamo'
          }
        }
      }
    ];
  }
})();
