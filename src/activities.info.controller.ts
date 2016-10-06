/// <reference path="../typings/tsd.d.ts" />

class ActivitiesInfoCtrl {
  public $inject = ['$stateParams', '$state', 'ActivitiesService']

  activity:any

  constructor(public $state,
              public $stateParams,
              public ActivityService) {
    this.activity = this.ActivityService.getActivity(this.$state.params['activityId'])
  }
}

angular.module('app.controllers')
  .controller('activitiesInfoCtrl', ActivitiesInfoCtrl)