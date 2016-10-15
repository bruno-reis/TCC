/// <reference path="../../typings/tsd.d.ts" />

class subjectAddExamCtrl {
  public $inject = ['$stateParams', '$state', 'SubjectService', 'CalendarService']
  private input
  private subject

  constructor(public $state,
              public $stateParams,
              public SubjectService,
              public CalendarService) {
    this.subject = this.SubjectService.getSubject(this.$state.params['subjectId'])
    this.input = { weight:1 }
  }

  submit() {
    this.SubjectService.addSubjectProperty(this.$state.params['subjectId'], "exams", this.input)
    this.CalendarService.createEvent(this.input, this.subject, this.input.date, "exam")
    this.$state.go('.^.info')
  }
}

angular.module('app.controllers')
  .controller('subjectAddExamCtrl', subjectAddExamCtrl)

