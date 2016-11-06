/// <reference path="../typings/tsd.d.ts" />

class GradesCtrl {
  public $inject = ['$stateParams', '$state', 'SubjectService']
  private subjects = []
  private subjectsExams = []
  private subjectsHomework = []
  private type = "exams"

  constructor(public $state,
              public $stateParams,
              public SubjectService) {
    this.subjects = this.SubjectService.getSubjects()
    this.subjects.map( sub => sub.exams.map( s => this.subjectsExams.push(s)))
    this.subjects.map( sub => sub.homeworks.map( s => this.subjectsHomework.push(s)))
  }

  selectSubject(subjectId) {
    this.$state.go('subject.info', {subjectId: subjectId})
  }
}

angular.module('app.controllers')
  .controller('gradesCtrl', GradesCtrl)
