/// <reference path="../../typings/tsd.d.ts" />
//
class ActivitiesCtrl {
  public $inject = ['$state', 'ActivityService', 'CalendarService']
  private activities: Array<string>

  constructor(public $state,
              public CalendarService,
              public ActivityService) {
    this.activities = this.ActivityService.getActivities()
    console.log("activities", this.activities)
  }

  selectActivity(activityId) {
    this.$state.go('activity.info', {activityId: activityId})
  }

  addActivity() {
    this.$state.go('activities.add')
  }
  
  deleteActivity(activityId) {
    this.ActivityService.deleteActivity(activityId)
    this.CalendarService.deleteEvent(activityId)
    this.$state.go('.^.list', {reload: true})
  }
}

angular.module('app.controllers')
  .controller('activitiesCtrl', ActivitiesCtrl)
