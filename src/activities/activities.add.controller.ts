/// <reference path="../../typings/tsd.d.ts" />

class ActivitiesAddCtrl {
  public $inject = ['$state', 'ActivityService', 'StorageService']
  private input
  private isRecurring = false

  constructor(public $state,
              public ActivityService,
              public StorageService) {
    this.input = {}
    this.input.duration = '1'
  }

  addActivity() {
    this.ActivityService.addActivity(this.input)
    this.$state.go('activities.list')
  }
}

angular.module('app.controllers')
  .controller('activitiesAddCtrl', ActivitiesAddCtrl)
