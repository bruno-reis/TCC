/// <reference path="../typings/tsd.d.ts" />

class NextEventsCtrl {
  public $inject = ['$stateParams', '$state', 'SubjectService', 'CalendarService']

  constructor(public $state,
              public $stateParams,
              public CalendarService,
              public SubjectService) {
  }
  
}

angular.module('app.controllers')
  .controller('nextEventsCtrl', NextEventsCtrl)
