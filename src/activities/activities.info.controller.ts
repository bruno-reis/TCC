/// <reference path="../../typings/tsd.d.ts" />

class ActivitiesInfoCtrl {
  public $inject = ['$stateParams', '$state', 'ActivitiesService']
  
  dayName = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  private activity

  constructor(public $state,
              public $stateParams,
              public ActivityService) {
    this.activity = this.ActivityService.getActivity(this.$state.params['activityId'])
  }

  addDay() {
    this.$state.go('activity.addDay')
  }
}

angular.module('app.controllers')
  .controller('activitiesInfoCtrl', ActivitiesInfoCtrl)