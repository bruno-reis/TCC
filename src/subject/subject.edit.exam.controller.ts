/// <reference path="../../typings/tsd.d.ts" />

class subjectEditExamCtrl {

  public $inject = ['$ionicPopup', '$stateParams', '$state', 'SubjectService']
  private input
  private subject
  private subjectId
  private examId

  constructor(public $ionicPopup,
              public $state,
              public $stateParams,
              public SubjectService,
              public CalendarService) {
    this.examId = this.$state.params['examId']
    this.subjectId = this.$state.params['subjectId']
    this.subject = this.SubjectService.getSubject(this.subjectId)
    this.input = this.SubjectService.getSubjectProperty(this.subjectId, this.examId, "exams")
    this.input.date = new Date(this.input.date)
    this.input.startTime = new Date(this.input.startTime)
    this.input.endTime = new Date(this.input.endTime)
  }

  submit() {
    if (this.SubjectService.validateTime(this.input) == false) return
    this.SubjectService.editSubjectProperty(this.subjectId, "exams", this.input)
    this.$state.go('.^.info')
  }

  delete() {
    this.SubjectService.deleteSubjectProperty(this.subjectId, "exams", this.examId)
    this.CalendarService.deleteChildEvent(this.subjectId, this.examId)
    this.$state.go('.^.info', this.$stateParams, {reload: true, inherit: false});
  }

  showConfirm() {
    let confirmPopup = this.$ionicPopup.confirm({
      title: 'Remover prova',
      template: 'Tem certeza que deseja remover a prova \"' + this.input.title + '\"?',
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
  .controller('subjectEditExamCtrl', subjectEditExamCtrl)

