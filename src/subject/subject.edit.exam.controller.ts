/// <reference path="../../typings/tsd.d.ts" />

class subjectEditExamCtrl {
  public $inject = ['$stateParams', '$state', 'SubjectService']
  private input

  constructor(public $state,
              public $stateParams,
              public SubjectService) {
    var subjectId = this.$state.params['subjectId']
    var examId = this.$state.params['examId']
    this.input = this.SubjectService.getSubjectProperty(subjectId, examId, "exams")
    this.input.date = new Date(this.input.date)
    this.input.startTime = new Date(this.input.startTime)
    this.input.endTime = new Date(this.input.endTime)
  }

  submit() {
    this.SubjectService.editSubjectProperty(this.$state.params['subjectId'], "exams", this.input)
    this.$state.go('.^.info')
  }
}

angular.module('app.controllers')
  .controller('subjectEditExamCtrl', subjectEditExamCtrl)

