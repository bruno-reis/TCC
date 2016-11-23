/// <reference path="../../typings/tsd.d.ts" />

class subjectEditExamCtrl {

  public $inject = ['$stateParams', '$state', 'SubjectService', 'PopupService', 'NotificationService']
  private input
  private subject
  private subjectId
  private examId

  constructor(public $state,
              public $stateParams,
              public SubjectService,
              public PopupService,
              public CalendarService,
              public NotificationService) {
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
    this.CalendarService.editChildEvent(this.subjectId, this.examId, this.input)
    this.NotificationService.updateNotifications(this.input, this.subject, "Prova")
    this.$state.go('.^.info.exams')
  }

  delete() {
    this.SubjectService.deleteSubjectProperty(this.subjectId, "exams", this.examId)
    this.CalendarService.deleteChildEvent(this.subjectId, this.examId)
    this.NotificationService.cancelNotifications(this.input, this.subject)
    this.$state.go('.^.info.exams', this.$stateParams, {reload: true, inherit: false});
  }

  showConfirm() {
    this.PopupService.deleteProperty('Prova', this.input.title)
      .then( (res) => {if (res) this.delete() })
  }
}

angular.module('app.controllers')
  .controller('subjectEditExamCtrl', subjectEditExamCtrl)

