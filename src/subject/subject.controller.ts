/// <reference path="../../typings/tsd.d.ts" />

class SubjectCtrl {
  public $inject = [
    '$state', '$scope', 'SubjectService', 'CalendarService', 'PopupService', 'ModalService'
  ]
  private subject
  private days
  private input
  private homeworkTypes

  constructor(public $state,
              public $scope,
              public CalendarService,
              public PopupService,
              public ModalService,
              public SubjectService) {
    this.updateSubject()
    this.days = this.CalendarService.getDays()
    this.homeworkTypes = this.SubjectService.getHomeworkTypes()
    this.setModals()
    this.resetInput()
  }

  updateSubject() {
    this.subject = this.SubjectService.getSubject(this.$state.params['subjectId'])
  }

  setModals() {
    let scope = this.$scope
    let modal = this.ModalService
    modal.createModal(scope, 'templates/subject-add-class.html', 'addClass')
    modal.createModal(scope, 'templates/subject-add-exam.html', 'addExam')
    modal.createModal(scope, 'templates/subject-edit-exam.html', 'editExam')
    modal.createModal(scope, 'templates/subject-add-homework.html', 'addHomework')
    modal.createModal(scope, 'templates/subject-edit-homework.html', 'editHomework')
    modal.createModal(scope, 'templates/subject-edit-finalgrade.html', 'editFinalGrade')
    modal.createModal(scope, 'templates/subject-add-homework-type.html', 'addHomeworkType')
  }

  resetInput() {
    let homeworkTypes = this.getHomeworkTypes()
    this.input = {}
    this.input['addClass'] = { day: '1' }
    this.input['addExam'] = { weight: 1 }
    this.input['addHomework'] = { weight: 1, homeworkType: homeworkTypes[0] }
    this.input['editFinalGrade'] = {
      examsWeight: this.subject.examsWeight,
      homeworksWeight: this.subject.homeworksWeight ? this.subject.homeworksWeight : {}
    }
    this.input['editExam'] = {}
    this.input['editHomework'] = {}
    this.input['addHomeworkType'] = {}
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
      this.input[modalName].dueTime = this.input[modalName].startTime
      this.input[modalName].homeworkType = homework.homeworkType
    }
    this.ModalService.showModal(modalName)
  }

  closeModal(modalName) {
    this.updateSubject()
    this.ModalService.closeModal(modalName)
  }

  existsClassWithSameDate(input) {
    let clazz = this.subject.classes.find(c => {
      return c.startTime.getHours() == input.startTime.getHours() &&
             c.startTime.getMinutes() == input.startTime.getMinutes() &&
             c.endTime.getHours() == input.endTime.getHours() &&
             c.endTime.getMinutes() == input.endTime.getMinutes() &&
             c.day == input.date.getDay()
    })
    return clazz != null
  }

  fillExamTime(modalName) {
    if (this.input[modalName].date instanceof Date) {
      let examDay = this.input[modalName].date.getDay()
      let clazz = this.subject.classes.find(c => {
        return c.day == examDay
      })
      if (clazz) {
        this.input[modalName].startTime = new Date(clazz.startTime)
        this.input[modalName].endTime = new Date(clazz.endTime)
      }
    }
  }

  addClass() {
    let input = this.input['addClass']
    if (this.SubjectService.validateTime(input) == false) return
    if (this.SubjectService.checkSubjectClassTime(this.subject.id, input)) return
    this.SubjectService.addSubjectProperty(this.subject.id, "classes", input)
    this.CalendarService.createMultipleEvents(input, this.subject)
    this.closeModal('addClass')
  }

  addHomeworkType(modalName) {
    let input = this.input['addHomeworkType']
    if (!this.SubjectService.validateHomeworkType(input))
      return
    this.SubjectService.addHomeworkType(input.type)
    this.homeworkTypes.push(input.type)
    this.input[modalName].homeworkType = input.type
    this.closeModal('addHomeworkType')
    this.input['addHomeworkType'] = {}
  }

  checkHomeworkType(modalName) {
    let homeworkType = this.input[modalName].homeworkType
    if (homeworkType == '_new') {
      this.input['addHomeworkType'].modalName = modalName
      this.ModalService.showModal('addHomeworkType')
    }
  }

  closeHomeworkTypeModal(modalName) {
    this.input[modalName].homeworkType = ''
    this.closeModal('addHomeworkType')
  }

  addExam() {
    let input = this.input['addExam']
    if (this.SubjectService.validateTime(this.input) == false) return
    if (this.SubjectService.checkSubjectPropertyTitle(this.subject.id, 'exams', input)) return
    if (this.SubjectService.checkSubjectPropertyTime(this.subject.id, 'exams', input)) return
    this.SubjectService.addSubjectProperty(this.subject.id, "exams", input)
    this.CalendarService.createEvent(input, this.subject, input.date)
    this.closeModal('addExam')
    if (this.existsClassWithSameDate(input)) {
      this.CalendarService.changeEventVisibility(this.subject.id, 'classes',
        input.startTime, input.endTime, true)
    }
  }

  editExam() {
    let input = this.input['editExam']
    let oldExam = this.subject.exams.find(s => { return s.id == input.id })
    if (this.SubjectService.validateTime(input) == false) return
    this.SubjectService.editSubjectProperty(this.subject.id, "exams", input)
    this.CalendarService.editChildEvent(this.subject.id, input.id, input)
    this.closeModal('editExam')
    if (this.existsClassWithSameDate(oldExam) &&
        !this.CalendarService.equals(oldExam.startTime, input.startTime) &&
        !this.CalendarService.equals(oldExam.endTime, input.endTime)) {
      this.CalendarService.changeEventVisibility(this.subject.id, 'classes',
        oldExam.startTime, oldExam.endTime, false)
    }
    if (this.existsClassWithSameDate(input)) {
      this.CalendarService.changeEventVisibility(this.subject.id, 'classes',
        input.startTime, input.endTime, true)
    }
  }

  addHomework() {
    let input = this.input['addHomework']
    input.startTime = input.dueTime
    input.endTime = input.dueTime
    delete input.dueTime
    this.SubjectService.addSubjectProperty(this.subject.id, "homeworks", input)
    this.CalendarService.createEvent(input, this.subject, input.date)
    this.closeModal('addHomework')
  }

  editHomework() {
    let input = this.input['editHomework']
    input.startTime = input.dueTime
    input.endTime = input.dueTime
    delete input.dueTime
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
    if (propName == "exams") {
      let exam = this.subject.exams.find(e => { return e.id == propId })
      if (this.existsClassWithSameDate(exam)) {
        this.CalendarService.changeEventVisibility(this.subject.id, "classes",
            exam.startTime, exam.endTime, false)
      }
    }
    this.SubjectService.deleteSubjectProperty(this.subject.id, propName, propId)
    this.CalendarService.deleteChildEvent(this.subject.id, propId, propName)
    this.updateSubject()
  }

  getMaxWeight() {
    let types = this.getHomeworkTypesInUse()
    let input = this.input['editFinalGrade']
    let maxWeight = 0
    maxWeight += input.examsWeight ? input.examsWeight : 0
    types.forEach(t => {
      maxWeight += input.homeworksWeight[t] ? input.homeworksWeight[t] : 0
    })
    return maxWeight
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

  getHomeworksGrade(type) {
    let totalWeight = 0
    let totalScore = 0
    let homeworks = this.subject.homeworks.filter(hw => {
      return hw.homeworkType == type
    })

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
    if (this.subject.examsWeight != null && this.subject.homeworksWeight != null) {
      let examsPart = this.getExamsGrade() * this.subject.examsWeight
      let homeworksPart = 0
      this.getHomeworkTypesInUse().forEach(type => {
        homeworksPart += this.getHomeworksGrade(type) * this.subject.homeworksWeight[type]
      })
      let totalWeight = this.getMaxWeight()
      let result = (examsPart + homeworksPart) / totalWeight
      return result > 10 ? 10 : result
    }
    return null
  }

  getHomeworkTypes() {
    return this.SubjectService.getHomeworkTypes()
  }

  getHomeworkTypesInUse() {
    let types = []
    this.subject.homeworks.forEach(hw => {
      if (types.indexOf(hw.homeworkType) < 0) {
        types.push(hw.homeworkType)
      }
    })
    return types
  }
}

angular.module('app.controllers')
  .controller('subjectCtrl', SubjectCtrl)