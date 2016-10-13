/// <reference path="../../typings/tsd.d.ts" />

class ActivitiesInfoCtrl {
  public $inject = ['$stateParams', '$state', 'ActivitiesService', 'CalendarService']
  
  dayName = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  private activity

  constructor(public $state,
              public $stateParams,
              public CalendarService,
              public ActivityService) {
    this.activity = this.ActivityService.getActivity(this.$state.params['activityId'])
  }

  addDay() {
    this.$state.go('activity.addDay')
  }

  deleteDay(activityId, dayId) {
    this.ActivityService.deleteDay(activityId, dayId )
    this.CalendarService.deleteChildEvent(activityId, dayId )
    this.$state.go('.^.info', this.$stateParams, {reload: true, inherit: false});
  }
}

angular.module('app.controllers')
  .controller('activitiesInfoCtrl', ActivitiesInfoCtrl)