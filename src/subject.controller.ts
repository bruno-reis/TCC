/// <reference path="../typings/tsd.d.ts" />

class SubjectCtrl {
  public $inject = ['$stateParams', '$state', 'SubjectService']

  subject: any
  dayName = ['','Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

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

  editExam(examId) {
    this.$state.go('subject.editExam', {examId: examId})
  }

  addHomework() {
    this.$state.go('subject.addHomework')
  }

  editHomework(homeworkId) {
    this.$state.go('subject.editHomework', {homeworkId: homeworkId})
  }

  hasAnyExam() {
    return this.subject.exams.length > 1
  }

  hasAnyHomework() {
    return this.subject.homeworks.length > 1
  }

  getExamsGrade() {
    let exams = this.subject.exams
    let totalWeight = 0
    let totalScore = 0
    if (!this.hasAnyExam()) {
      return 0
    }
    for (let i = 1; i < exams.length; i++) {
      if (exams[i].result != null) {
        totalScore += exams[i].result * exams[i].weight
      }
      totalWeight += exams[i].weight
    }
    return totalScore / totalWeight
  }

  getHomeworksGrade() {
    let homeworks = this.subject.homeworks
    let totalWeight = 0
    let totalScore = 0
    if (!this.hasAnyHomework()) {
      return 0
    }
    for (let i = 1; i < homeworks.length; i++) {
      if (homeworks[i].result != null) {
        totalScore += homeworks[i].result * homeworks[i].weight
      }
      totalWeight += homeworks[i].weight
    }
    return totalScore / totalWeight
  }

  getFinalGrade() {
    return 10
  }
}

angular.module('app.controllers')
  .controller('subjectCtrl', SubjectCtrl)