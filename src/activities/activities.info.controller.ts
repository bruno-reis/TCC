/// <reference path="../../typings/tsd.d.ts" />

class ActivitiesInfoCtrl {
  public $inject = ['$stateParams', '$state', 'ActivitiesService', 'CalendarService', 'PopupService']
  private activity
  private dayName

  constructor(public $state,
              public $stateParams,
              public CalendarService,
              public PopupService,
              public ActivityService) {
    this.activity = this.ActivityService.getActivity(this.$state.params['activityId'])
    this.dayName = this.CalendarService.getDays()
  }

  addDay() {
    this.$state.go('activity.addDay')
  }

  showConfirm() {
    this.PopupService.deleteProperty('Atividade', this.activity.name)
      .then( (res) => { if(res) this.deleteActivity() })
  }
  
  deleteActivity() {
    this.ActivityService.deleteActivity(this.activity.id)
    this.CalendarService.deleteEvent(this.activity.id)
    this.$state.go('activities.list', null, {reload: true, inherit: false});
  }
  
  showConfirmDay(dayId) {
    this.PopupService.deleteOwner('Dia', 'esse dia')
      .then( (res) => { if(res) this.deleteDay(dayId) })
  }

  deleteDay(dayId) {
    this.ActivityService.deleteDay(this.activity.id, dayId)
    this.CalendarService.deleteChildEvent(this.activity.id, dayId, 'activity')
    this.$state.go('.^.info', this.$stateParams, {reload: true, inherit: false});
  }
}

angular.module('app.controllers')
  .controller('activitiesInfoCtrl', ActivitiesInfoCtrl)