/// <reference path="../typings/tsd.d.ts" />

class subjectAddHomeworkCtrl {
  public $inject = ['$stateParams', '$state', 'SubjectService']

  private input

  constructor(public $state,
              public $stateParams,
              public SubjectService) {
  }

  submit() {
    this.SubjectService.addHomework(this.$state.params['subjectId'], this.input)
    this.$state.go('.^.info')
  }
}

angular.module('app.controllers')
  .controller('subjectAddHomeworkCtrl', subjectAddHomeworkCtrl)
