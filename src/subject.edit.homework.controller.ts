/// <reference path="../typings/tsd.d.ts" />

class subjectEditHomeworkCtrl {
  public $inject = ['$stateParams', '$state', 'SubjectService']

  private input

  constructor(public $state,
              public $stateParams,
              public SubjectService) {
    var subjectId = this.$state.params['subjectId']
    var homeworkId = this.$state.params['homeworkId']
    this.input = this.SubjectService.getHomework(subjectId, homeworkId)
  }

  submit() {
    this.SubjectService.editHomework(this.$state.params['subjectId'], this.input)
    this.$state.go('.^.info')
  }
}

angular.module('app.controllers')
  .controller('subjectEditHomeworkCtrl', subjectEditHomeworkCtrl)

