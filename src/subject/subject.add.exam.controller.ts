/// <reference path="../../typings/tsd.d.ts" />

class subjectAddExamCtrl {
  public $inject = ['$stateParams', '$state', 'SubjectService', 'CalendarService', 'NotificationService']
  private input
  private subject

  constructor(public $state,
              public $stateParams,
              public SubjectService,
              public CalendarService,
              public NotificationService) {
    this.subject = this.SubjectService.getSubject(this.$state.params['subjectId'])
    this.input = { weight:1 }
  }

  submit() {
    if (this.SubjectService.validateTime(this.input) == false) return
    this.SubjectService.addSubjectProperty(this.$state.params['subjectId'], "exams", this.input)
    this.CalendarService.createEvent(this.input, this.subject, this.input.date)
    this.NotificationService.createNotification(this.input, this.subject, "Prova")
    this.$state.go('.^.info.exams')
  }
}

angular.module('app.controllers')
  .controller('subjectAddExamCtrl', subjectAddExamCtrl)

