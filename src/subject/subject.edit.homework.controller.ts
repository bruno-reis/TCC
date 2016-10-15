/// <reference path="../../typings/tsd.d.ts" />

class subjectEditHomeworkCtrl {
  public $inject = ['$ionicPopup', '$stateParams', '$state', 'SubjectService']
  private input
  private subjectId
  private homeworkId

  constructor(public $ionicPopup,
              public $state,
              public $stateParams,
              public SubjectService,
              public CalendarService) {
    this.subjectId = this.$state.params['subjectId']
    this.homeworkId = this.$state.params['homeworkId']
    this.input = this.SubjectService
                  .getSubjectProperty(this.subjectId, this.homeworkId, 'homeworks')
    this.input.date = new Date(this.input.date)
    this.input.startTime = new Date(this.input.startTime)
    this.input.endTime = new Date(this.input.endTime)
  }

  submit() {
    this.SubjectService.editSubjectProperty(this.subjectId, "homeworks", this.input)
    this.$state.go('.^.info')
  }

  delete() {
    this.SubjectService.deleteSubjectProperty(this.subjectId, "homeworks", this.homeworkId)
    this.CalendarService.deleteChildEvent(this.subjectId, this.homeworkId)
    this.$state.go('.^.info', this.$stateParams, {reload: true, inherit: false});
  }

  showConfirm() {
    let controller = this
    let confirmPopup = this.$ionicPopup.confirm({
      title: 'Remover trabalho',
      template: 'Tem certeza que deseja remover o trabalho \"' + controller.input.title + '\"?',
      cancelText: 'Cancelar',
      okText: 'Sim'
    })
    confirmPopup.then(function(res) {
      if (res) {
        controller.delete()
      }
    })
  }

}

angular.module('app.controllers')
  .controller('subjectEditHomeworkCtrl', subjectEditHomeworkCtrl)

