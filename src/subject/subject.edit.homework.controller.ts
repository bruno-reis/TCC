/// <reference path="../../typings/tsd.d.ts" />

class subjectEditHomeworkCtrl {
  public $inject = ['$ionicPopup', '$stateParams', '$state', 'SubjectService']
  private input
  private subject
  private subjectId
  private homeworkId

  constructor(public $ionicPopup,
              public $state,
              public $stateParams,
              public SubjectService,
              public CalendarService) {
    this.homeworkId = this.$state.params['homeworkId']
    this.subjectId = this.$state.params['subjectId']
    this.subject = this.SubjectService.getSubject(this.subjectId)
    this.input = this.SubjectService
                  .getSubjectProperty(this.subjectId, this.homeworkId, 'homeworks')
    this.input.date = new Date(this.input.date)
    this.input.startTime = new Date(this.input.startTime)
    this.input.endTime = new Date(this.input.endTime)
  }

  submit() {
    if (this.SubjectService.validateTime(this.input) == false) return
    this.SubjectService.editSubjectProperty(this.subjectId, "homeworks", this.input)
    this.$state.go('.^.info')
  }

  delete() {
    this.SubjectService.deleteSubjectProperty(this.subjectId, "homeworks", this.homeworkId)
    this.CalendarService.deleteChildEvent(this.subjectId, this.homeworkId)
    this.$state.go('.^.info', this.$stateParams, {reload: true, inherit: false});
  }

  showConfirm() {
    let confirmPopup = this.$ionicPopup.confirm({
      title: 'Remover trabalho',
      template: 'Tem certeza que deseja remover o trabalho \"' + this.input.title + '\"?',
      cancelText: 'Cancelar',
      okText: 'Sim'
    })
    confirmPopup.then(function(res) {
      if (res) {
        this.delete()
      }
    })
  }

}

angular.module('app.controllers')
  .controller('subjectEditHomeworkCtrl', subjectEditHomeworkCtrl)

