/// <reference path="../typings/tsd.d.ts" />

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
    this.CalendarService.createActivityEvents(this.input, this.activity.startDate, this.activity.duration, this.activity.name)
    this.ActivityService.addDay(this.$state.params['activityId'], this.input)
    this.ActivityService.update()
    this.$state.go('.^.info')
  }
}

angular.module('app.controllers')
  .controller('activitiesAddDayCtrl', activitiesAddDayCtrl)