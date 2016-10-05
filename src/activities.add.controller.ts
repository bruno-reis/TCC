/// <reference path="../typings/tsd.d.ts" />

class ActivitiesAddCtrl {
  public $inject = ['$state', 'ActivityService', 'StorageService']
  private input

  constructor(public $state,
              public ActivityService,
              public StorageService) {
  }

  addActivity() {
    this.ActivityService.addActivity(this.input)
    console.log(this.StorageService.get('activities'))
    this.$state.go('activities.list')
  }
}

angular.module('app.controllers')
  .controller('activitiesAddCtrl', ActivitiesAddCtrl)
