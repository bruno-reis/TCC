/// <reference path="../../typings/tsd.d.ts" />

class ActivitiesAddCtrl {
  public $inject = ['$state', 'ActivityService', 'StorageService', 'PopupService', 'CalendarService']
  private input
  private date
  private day

  constructor(public $state,
              public ActivityService,
              public PopupService,
              public CalendarService,
              public StorageService) {
    this.input = {}
    this.input.duration = '1'
    this.input.day = '1'
    this.input.recurring = false
  }

  validate() {
    if (this.input.startTime >= this.input.endTime) {
      this.PopupService.timeError().then(() => this.input.endTime = null)
      return false
    }
    return true
  }

  submit() {
    if (this.input.recurring) {
      this.ActivityService.addActivity(this.input)
    } else {
      if (!this.validate()) return
      this.ActivityService.addSingleActivity(this.input, this.day, this.date)
      this.CalendarService.createEvent(this.day, this.input, this.date)
    }
    this.$state.go('activities.list')
  }
}

angular.module('app.controllers')
  .controller('activitiesAddCtrl', ActivitiesAddCtrl)
