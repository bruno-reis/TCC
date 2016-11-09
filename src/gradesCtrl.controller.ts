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
    this.subjects.forEach( sub => {
      sub.exams.forEach( ex => { if (ex.result) this.subjectsExams.push(ex) } )
      sub.homeworks.forEach( hw => { if (hw.result) this.subjectsHomework.push(hw) } )
    })
  }

  selectSubject(subjectId) {
    this.$state.go('subject.info', {subjectId: subjectId})
  }
}

angular.module('app.controllers')
  .controller('gradesCtrl', GradesCtrl)
