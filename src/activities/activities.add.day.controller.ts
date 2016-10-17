/// <reference path="../../typings/tsd.d.ts" />

class activitiesAddDayCtrl {
  public $inject = ['$stateParams', '$state', 'ActivityService', 'CalendarService']

  private input
  private activity

  constructor(public $state,
              public $stateParams,
              public ActivityService,
              public CalendarService) {
    this.activity = this.ActivityService.getActivity(this.$state.params['activityId'])
  }

  submit() {
    this.ActivityService.addDay(this.$state.params['activityId'], this.input)
    this.CalendarService.createMultipleEvents(this.input, this.activity)
    this.$state.go('.^.info')
  }
}

angular.module('app.controllers')
  .controller('activitiesAddDayCtrl', activitiesAddDayCtrl)