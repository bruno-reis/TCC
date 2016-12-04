/// <reference path="../../typings/tsd.d.ts" />

class SubjectCtrl {
  public $inject = ['$stateParams', '$state', 'SubjectService', 'CalendarService', 'PopupService', 'NotificationService']
  private subject
  private days

  constructor(public $state,
              public $stateParams,
              public CalendarService,
              public PopupService,
              public SubjectService,
              public NotificationService) {
    this.subject = this.SubjectService.getSubject(this.$state.params['subjectId'])
    this.days = this.CalendarService.getDays()
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
    return this.subject.exams.length > 0
  }

  hasAnyHomework() {
    return this.subject.homeworks.length > 0
  }

  showConfirm() {
    this.PopupService.deleteProperty('Matéria', this.subject.name)
      .then( (res) => { if(res) this.delete() })
  }

  delete() {
    this.SubjectService.deleteSubject(this.subject.id)
    this.CalendarService.deleteEvent(this.subject.id)
    this.NotificationService.cancelSubjectNotifications(this.subject.id)
    this.$state.go('subjects.list', {reload: true, inherit: false});
  }

  showConfirmClass(classId) {
    this.PopupService.deleteOwner('Aula', 'essa aula')
      .then( (res) => { if(res) this.deleteSubjectProperty(classId, 'classes') })
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
    
    if (!this.hasAnyExam()) return 0
    for (let i = 0; i < exams.length; i++) {
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
    
    if (!this.hasAnyHomework()) return 0
    for (let i = 0; i < homeworks.length; i++) {
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
        let totalWeight = this.subject.examsWeight + this.subject.homeworksWeight
        let result = (examsPart + homeworksPart) / totalWeight
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