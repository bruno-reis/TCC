/// <reference path="../typings/tsd.d.ts" />
//
class ActivitiesCtrl {
  public $inject = ['$state', 'ActivityService']
  private activities: Array<string>

  constructor(public $state,
              public ActivityService) {
    this.activities = this.ActivityService.getActivities()
  }

  selectActivity(activityId) {
    this.$state.go('activity.info', {activityId: activityId})
  }

  addActivity() {
    this.$state.go('activities.add')
  }
}

angular.module('app.controllers')
  .controller('activitiesCtrl', ActivitiesCtrl)
