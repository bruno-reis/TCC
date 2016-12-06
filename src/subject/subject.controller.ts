/// <reference path="../../typings/tsd.d.ts" />

class SubjectCtrl {
  public $inject = [
    '$state', '$scope', 'SubjectService', 'CalendarService', 'PopupService', 'ModalService'
  ]
  private subject
  private days
  private input

  constructor(public $state,
              public $scope,
              public CalendarService,
              public PopupService,
              public ModalService,
              public SubjectService) {
    this.updateSubject()
    this.days = this.CalendarService.getDays()
    this.setModals()
  }

  updateSubject() {
    this.subject = this.SubjectService.getSubject(this.$state.params['subjectId'])
  }

  setModals() {
    let scope = this.$scope
    this.ModalService.createModal(scope, 'templates/subject-add-class.html', 'addClass')
    this.ModalService.createModal(scope, 'templates/subject-add-exam.html', 'addExam')
    this.ModalService.createModal(scope, 'templates/subject-edit-exam.html', 'editExam')
    this.ModalService.createModal(scope, 'templates/subject-add-homework.html', 'addHomework')
    this.ModalService.createModal(scope, 'templates/subject-edit-homework.html', 'editHomework')
    this.ModalService.createModal(scope, 'templates/subject-edit-finalgrade.html', 'editFinalGrade')
  }

  resetInput() {
    this.input = {}
    this.input['addClass'] = { day: '1' }
    this.input['addExam'] = { weight: 1 }
    this.input['addHomework'] = { weight: 1 }
    this.input['editFinalGrade'] = { 
      examsWeight: this.subject.examsWeight,
      homeworksWeight: this.subject.homeworksWeight
    }
    this.input['editExam'] = {}
    this.input['editHomework'] = {}
  }

  showModal(modalName, propType?, propId?) {
    let attr = ['id', 'title', 'result', 'date', 'startTime', 'endTime', 'room', 'weight', 'type']
    this.resetInput()
    if (propType == "exams") {
      let exam = this.SubjectService.getSubjectProperty(this.subject.id, propId, "exams")
      for (let i = 0; i < attr.length; i++) {
        this.input[modalName][attr[i]] = exam[attr[i]]
      }
    }
    if (propType == "homeworks") {
      let homework = this.SubjectService.getSubjectProperty(this.subject.id, propId, "homeworks")
      for (let i = 0; i < attr.length; i++) {
        this.input[modalName][attr[i]] = homework[attr[i]]
      }
    }
    this.ModalService.showModal(modalName)
  }

  closeModal(modalName) {
    this.updateSubject()
    this.ModalService.closeModal(modalName)
  }

  addClass() {
    if (this.SubjectService.validateTime(this.input['addClass']) == false) return
    this.SubjectService
      .addSubjectProperty(this.subject.id, "classes", this.input['addClass'])
    this.CalendarService.createMultipleEvents(this.input['addClass'], this.subject)
    this.closeModal('addClass')
  }

  addExam() {
    let input = this.input['addExam']
    if (this.SubjectService.validateTime(this.input) == false) return
    this.SubjectService.addSubjectProperty(this.subject.id, "exams", input)
    this.CalendarService.createEvent(input, this.subject, input.date)
    this.closeModal('addExam')
  }

  editExam() {
    let input = this.input['editExam']
    if (this.SubjectService.validateTime(input) == false) return
    this.SubjectService.editSubjectProperty(this.subject.id, "exams", input)
    this.CalendarService.editChildEvent(this.subject.id, input.id, input)
    this.closeModal('editExam')
  }

  addHomework() {
    let input = this.input['addHomework']
    if (this.SubjectService.validateTime(this.input) == false) return
    this.SubjectService.addSubjectProperty(this.subject.id, "homeworks", input)
    this.CalendarService.createEvent(input, this.subject, input.date)
    this.closeModal('addHomework')
  }

  editHomework() {
    let input = this.input['editHomework']
    if (this.SubjectService.validateTime(input) == false) return
    this.SubjectService.editSubjectProperty(this.subject.id, "homeworks", input)
    this.CalendarService.editChildEvent(this.subject.id, input.id, input)
    this.closeModal('editHomework')
  }

  editFinalGrade() {
    let input = this.input['editFinalGrade']
    let examsWeight = input.examsWeight
    let homeworksWeight = input.homeworksWeight
    this.SubjectService.setFinalGradeWeights(this.subject.id, examsWeight, homeworksWeight)
    this.closeModal('editFinalGrade')
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

  showConfirmClass(classId) {
    this.PopupService.deleteOwner('Aula', 'essa aula')
      .then( (res) => { if(res) this.deleteSubjectProperty(classId, 'classes') })
  }

  showConfirmExam() {
    let input = this.input['editExam']
    this.PopupService.deleteOwner('Prova', input.title)
      .then( (res) => {
        if(res) {
          this.deleteSubjectProperty(input.id, 'exams')
          this.closeModal('editExam')
        }
      }) 
  }

  showConfirmHomework() {
    let input = this.input['editHomework']
    this.PopupService.deleteOwner('Trabalho', input.title)
      .then( (res) => {
        if(res) {
          this.deleteSubjectProperty(input.id, 'homeworks')
          this.closeModal('editHomework')
        }
      }) 
  }

  delete() {
    this.SubjectService.deleteSubject(this.subject.id)
    this.CalendarService.deleteEvent(this.subject.id)
    this.$state.go('subjects.list');
  }

  deleteSubjectProperty(propId, propName) {
    this.SubjectService.deleteSubjectProperty(this.subject.id, propName, propId)
    this.CalendarService.deleteChildEvent(this.subject.id, propId, propName)
    this.updateSubject()
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