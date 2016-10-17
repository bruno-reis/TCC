/// <reference path="../../typings/tsd.d.ts" />

class activitiesAddDayCtrl {
  public $inject = ['$ionicPopup', '$stateParams', '$state', 'ActivityService', 'CalendarService', 'PopupService']

  private input
  private activity

  constructor(public $state,
              public $stateParams,
              public $ionicPopup,
              public PopupService,
              public ActivityService,
              public CalendarService) {
    this.activity = this.ActivityService.getActivity(this.$state.params['activityId'])
    this.input = {}
    this.input.day = '1'
  }

  validate() {
    if (this.input.startTime >= this.input.endTime) {
      this.PopupService.timeErrorPopup().then(() => this.input.endTime = null)
      return false
    }
    return true
  }

  submit() {
    if (!this.validate()) return
    this.ActivityService.addDay(this.$state.params['activityId'], this.input)
    this.CalendarService.createMultipleEvents(this.input, this.activity)
    this.$state.go('.^.info')
  }
}

angular.module('app.controllers')
  .controller('activitiesAddDayCtrl', activitiesAddDayCtrl)