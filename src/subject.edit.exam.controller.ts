/// <reference path="../typings/tsd.d.ts" />

class subjectEditExamCtrl {
  public $inject = ['$stateParams', '$state', 'SubjectService']

  private input

  constructor(public $state,
              public $stateParams,
              public SubjectService) {
    var subjectId = this.$state.params['subjectId']
    var examId = this.$state.params['examId']
    this.input = this.SubjectService.getExam(subjectId, examId)
  }

  submit() {
    this.SubjectService.editExam(this.$state.params['subjectId'], this.input)
    this.$state.go('.^.info')
  }
}

angular.module('app.controllers')
  .controller('subjectEditExamCtrl', subjectEditExamCtrl)

