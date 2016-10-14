/// <reference path="../../typings/tsd.d.ts" />

class subjectEditExamCtrl {
  public $inject = ['$stateParams', '$state', 'SubjectService']
  private input
  private subjectId
  private examId

  constructor(public $state,
              public $stateParams,
              public SubjectService,
              public CalendarService) {
    this.subjectId = this.$state.params['subjectId']
    this.examId = this.$state.params['examId']
    this.input = this.SubjectService.getSubjectProperty(this.subjectId, this.examId, "exams")
    this.input.date = new Date(this.input.date)
    this.input.startTime = new Date(this.input.startTime)
    this.input.endTime = new Date(this.input.endTime)
  }

  submit() {
    this.SubjectService.editSubjectProperty(this.subjectId, "exams", this.input)
    this.$state.go('.^.info')
  }

  delete() {
    this.SubjectService.deleteSubjectProperty(this.subjectId, "exams", this.examId)
    this.CalendarService.deleteChildEvent(this.subjectId, this.examId)
    this.$state.go('.^.info', this.$stateParams, {reload: true, inherit: false});
  }
}

angular.module('app.controllers')
  .controller('subjectEditExamCtrl', subjectEditExamCtrl)

