/// <reference path="../typings/tsd.d.ts" />

class SubjectsCtrl {
  public $inject = ['$state', 'SubjectService']
  private subjects: Array<string>

  constructor(public $state,
              public SubjectService) {
    this.subjects = this.SubjectService.getSubjects()
  }

  selectSubject(subjectId) {
    this.$state.go('subject.info', {subjectId: subjectId})
  }

  addSubject() {
    this.$state.go('root.subjectAdd')
  }
}

angular.module('app.controllers')
  .controller('subjectsCtrl', SubjectsCtrl)

