/// <reference path="../typings/tsd.d.ts" />

angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('estudaAi.horarios', {
    url: '/page2',
    views: {
      'tab5': {
        templateUrl: 'templates/horarios.html',
        controller: 'scheduleCtrl'
      }
    }
  })

  .state('estudaAi.materias', {
    url: '/page3',
    views: {
      'tab4': {
        templateUrl: 'templates/materias.html',
        controller: 'materiasCtrl'
      }
    }
  })

  .state('estudaAi', {
    url: '/page1',
    templateUrl: 'templates/estudaAi.html',
    abstract:true
  })

  .state('estudaAi.concorrentes', {
    url: '/page5',
    views: {
      'tab4': {
        templateUrl: 'templates/concorrentes.html',
        controller: 'concorrentesCtrl'
      }
    }
  })

  .state('estudaAi.adicionarMateria', {
    url: '/page9',
    views: {
      'tab4': {
        templateUrl: 'templates/adicionarMateria.html',
        controller: 'adicionarMateriaCtrl'
      }
    }
  })

  .state('estudaAi.adicionarProva', {
    url: '/page10',
    views: {
      'tab4': {
        templateUrl: 'templates/adicionarProva.html',
        controller: 'adicionarProvaCtrl'
      }
    }
  })

  .state('estudaAi.adicionarLista', {
    url: '/page11',
    views: {
      'tab4': {
        templateUrl: 'templates/adicionarLista.html',
        controller: 'adicionarListaCtrl'
      }
    }
  })

  .state('atividades', {
    url: '/page12',
    templateUrl: 'templates/atividades.html',
    controller: 'atividadesCtrl'
  })

$urlRouterProvider.otherwise('/page1/page2')

  

});