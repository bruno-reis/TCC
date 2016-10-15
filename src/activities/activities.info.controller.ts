/// <reference path="../../typings/tsd.d.ts" />

class ActivitiesInfoCtrl {
  public $inject = ['$ionicPopup', '$stateParams', '$state', 'ActivitiesService', 'CalendarService']
  
  dayName = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  private activity

  constructor(public $ionicPopup,
              public $state,
              public $stateParams,
              public CalendarService,
              public ActivityService) {
    this.activity = this.ActivityService.getActivity(this.$state.params['activityId'])
  }

  addDay() {
    this.$state.go('activity.addDay')
  }

  deleteActivity() {
    this.ActivityService.deleteActivity(this.activity.id)
    this.CalendarService.deleteEvent(this.activity.id)
    this.$state.go('activities.list', null, {reload: true, inherit: false});
  }

  showConfirm() {
    let controller = this
    let confirmPopup = this.$ionicPopup.confirm({
      title: 'Remover atividade',
      template: 'Tem certeza que deseja remover a atividade \"' + controller.activity.name + '\"?',
      cancelText: 'Cancelar',
      okText: 'Sim'
    })
    confirmPopup.then(function(res) {
      if (res) {
        controller.deleteActivity()
      }
    })
  }

  deleteDay(dayId) {
    this.ActivityService.deleteDay(this.activity.id, dayId)
    this.CalendarService.deleteChildEvent(this.activity.id, dayId)
    this.$state.go('.^.info', this.$stateParams, {reload: true, inherit: false});
  }

  showConfirmDay(dayId) {
    let controller = this
    let confirmPopup = this.$ionicPopup.confirm({
      title: 'Remover dia',
      template: 'Tem certeza que deseja remover esse dia de atividade?',
      cancelText: 'Cancelar',
      okText: 'Sim'
    })
    confirmPopup.then(function(res) {
      if (res) {
        controller.deleteDay(dayId)
      }
    })
  }
}

angular.module('app.controllers')
  .controller('activitiesInfoCtrl', ActivitiesInfoCtrl)