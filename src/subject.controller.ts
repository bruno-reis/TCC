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
    return this.subject.exams.length > 1;
  }

  hasAnyHomework() {
    return this.subject.homeworks.length > 1;
  }

}

angular.module('app.controllers')
  .controller('subjectCtrl', SubjectCtrl)