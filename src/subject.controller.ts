/// <reference path="../typings/tsd.d.ts" />

class SubjectCtrl {
  public $inject = ['$stateParams', '$state', 'SubjectService']

  subject: any

  constructor(public $state,
              public $stateParams,
              public SubjectService) {
    this.subject = this.SubjectService.getSubject(this.$state.params['subjectId'])
  }

  addClass() {
    this.$state.go('subject.addClass')
  }

  addExam() {
    this.$state.go('subject.addExam')
  }

  addHomework() {
    this.$state.go('subject.addHomework')
  }
}

angular.module('app.controllers')
  .controller('subjectCtrl', SubjectCtrl)