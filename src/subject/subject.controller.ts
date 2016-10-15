/// <reference path="../../typings/tsd.d.ts" />

class SubjectCtrl {
  public $inject = ['$ionicPopup', '$stateParams', '$state', 'SubjectService', 'CalendarService']
  private subject
  private days

  constructor(public $ionicPopup,
              public $state,
              public $stateParams,
              public CalendarService,
              public SubjectService) {
    this.subject = this.SubjectService.getSubject(this.$state.params['subjectId'])
    this.days = this.CalendarService.getDays()
  }

  delete() {
    this.SubjectService.deleteSubject(this.subject.id)
    this.CalendarService.deleteEvent(this.subject.id)
    this.$state.go('subjects.list', {reload: true, inherit: false});
  }

  showConfirm() {
    let subjectController = this
    let confirmPopup = this.$ionicPopup.confirm({
      title: 'Remover matéria',
      template: 'Tem certeza que deseja remover a matéria \"' + this.subject.name + '\"?',
      cancelText: 'Cancelar',
      okText: 'Sim'
    })
    confirmPopup.then(function(res) {
      if (res) {
        subjectController.delete()
      }
    })
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

  editFinalGrade() {
    this.$state.go('subject.editFinalGrade')
  }

  hasAnyExam() {
    return this.subject.exams.length > 1
  }

  hasAnyHomework() {
    return this.subject.homeworks.length > 1
  }

  deleteSubjectProperty(propId, propName) {
    this.SubjectService.deleteSubjectProperty(this.subject.id, propName, propId)
    this.CalendarService.deleteChildEvent(this.subject.id, propId)
    this.$state.go('.^.info', this.$stateParams, {reload: true, inherit: false});
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
    if (this.hasAnyExam() && this.hasAnyHomework()) {
      if (this.subject.examsWeight != null && this.subject.homeworksWeight != null) {
        let examsPart = this.getExamsGrade() * this.subject.examsWeight
        let homeworksPart = this.getHomeworksGrade() * this.subject.homeworksWeight
        let result = examsPart + homeworksPart
        return result > 10 ? 10 : result
      }
      return null
    }
    if (this.hasAnyExam()) return this.getExamsGrade()
    if (this.hasAnyHomework()) return this.getHomeworksGrade()
  }
}

angular.module('app.controllers')
  .controller('subjectCtrl', SubjectCtrl)