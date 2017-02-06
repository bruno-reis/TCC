/// <reference path="../typings/tsd.d.ts" />

class GradesCtrl {
  public $inject = ['$stateParams', '$state', 'SubjectService']
  private subjects = []
  private selectedSubjects = []
  private option

  constructor(public $state,
              public $stateParams,
              public SubjectService) {
    this.subjects = this.SubjectService.getSubjects()
    this.option = "0"
    this.selectedSubjects = this.subjects
  }

  selectSubject() {
    if (this.option != 0) {
      let option = this.option
      this.selectedSubjects = this.subjects.filter(s => {
        return s.id == option
      })
    } else {
      this.selectedSubjects = this.subjects
    } 
  }

  countSubjectResults(subject) {
    let results = 0
    subject.exams.forEach(e => {
      results += e.result != null ? 1 : 0
    })
    subject.homeworks.forEach(e => {
      results += e.result != null ? 1 : 0
    })
    return results
  }
}

angular.module('app.controllers')
  .controller('gradesCtrl', GradesCtrl)
