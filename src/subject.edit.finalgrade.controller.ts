/// <reference path="../typings/tsd.d.ts" />

class subjectEditFinalGradeCtrl {
  public $inject = ['$stateParams', '$state', 'SubjectService']

  private input
  private subjectId

  constructor(public $state,
              public $stateParams,
              public SubjectService) {
    this.subjectId = this.$state.params['subjectId']
  }

  submit() {
    let examsWeight = this.input.examsWeight
    let homeworksWeight = this.input.homeworksWeight
    this.SubjectService.setFinalGradeWeights(this.subjectId, examsWeight, homeworksWeight)
    this.$state.go('.^.info')
  }
}

angular.module('app.controllers')
  .controller('subjectEditFinalGradeCtrl', subjectEditFinalGradeCtrl)

