/// <reference path="../typings/tsd.d.ts" />

class ActivitiesInfoCtrl {
  public $inject = ['$stateParams', '$state', 'ActivitiesService', 'CalendarService']
  
  dayName = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  activity:any

  constructor(public $state,
              public $stateParams,
              public ActivityService,
              public CalendarService) {
    this.activity = this.ActivityService.getActivity(this.$state.params['activityId'])
  }

  addDay() {
    this.$state.go('activity.addDay')
  }
}

angular.module('app.controllers')
  .controller('activitiesInfoCtrl', ActivitiesInfoCtrl)