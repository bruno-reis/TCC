/// <reference path="../../typings/tsd.d.ts" />

class SubjectService {
  private $inject = ['StorageService', 'PopupService']
  private subjects

  //Creating a dummy empty object because we are using the index as an index
  constructor(public StorageService,
              public PopupService) {
    this.update()
  }

  update() {
    let data = this.StorageService.get('subjects')
    this.subjects = data ? data : []
  }

  getNextId(list, startValue) {
    //Get the id of the list last element and increase it by 1
    let nextId = (list.length > 0) ? list[list.length-1].id + 1 : startValue
    return nextId
  }

  getSubjects() {
    return this.subjects
  }

  getSubject(subjectId) {
    //Using filter instead of array index bc indexes would change after delete
    let subject = this.subjects.find(sb => sb.id == subjectId)
    subject.exams.forEach(ex => {
      ex.date = new Date(ex.date)
      ex.startTime = new Date(ex.startTime)
      ex.endTime = new Date(ex.endTime)
    })
    subject.homeworks.forEach(hw => {
      hw.date = new Date(hw.date)
      hw.startTime = new Date(hw.startTime)
      hw.endTime = new Date(hw.endTime)
    })
    return subject
  }

  getSubjectProperty(subjectId, propId, propName) {
    let subject = this.getSubject(subjectId)
    let subjectProperty = subject[propName].find(sc => sc.id == propId)
    return subjectProperty
  }

  storeSubjects() {
    this.StorageService.add('subjects', this.subjects)
    this.update()
  }

  addSubject(subject) {
    //Adding 5000 to differentiate activities IDs from subjects ones
    subject.id = this.getNextId(this.subjects, 5000)
    subject.classes = []
    subject.exams = []
    subject.homeworks = []
    this.subjects.push(subject)
    this.storeSubjects()
  }

  addSubjectProperty(subjectId, propName, input) {
    let subject = this.getSubject(subjectId)
    input.id = this.getNextId(subject[propName], 1)
    input.type = propName
    input.ownerId = subjectId
    input.ownerName = subject.name
    subject[propName].push(input)
    this.storeSubjects()
  }

  editSubjectProperty(subjectId, propName, input) {
    let subject = this.getSubject(subjectId)
    subject[propName] = subject[propName].map(prop => {
      if (prop.id == input.id) {
        return input
      }
      return prop
    })
    this.storeSubjects()
  }

  deleteSubject(subjectId) {
    this.subjects = this.subjects.filter( sb => sb.id != subjectId)
    this.storeSubjects()
  }

  deleteSubjectProperty(subjectId, propName, propId) {
    //Property can be a homework/exam/class
    let subject = this.getSubject(subjectId)
    subject[propName] = subject[propName].filter( ch => ch.id != propId)
    this.storeSubjects()
  }

  setFinalGradeWeights(subjectId, examsWeight, homeworksWeight) {
    let subject = this.getSubject(subjectId)
    subject.examsWeight = examsWeight
    subject.homeworksWeight = homeworksWeight
    this.storeSubjects()
  }

  validateTime(input) {
    if (input.startTime >= input.endTime) {
      this.PopupService.timeError().then(() => input.endTime = null)
      return false
    }
    return true
  }

  validateDate(input) {
    if (input.startDate >= input.endDate) {
      this.PopupService.dateError().then(() => input.endDate = null)
      return false
    }
    return true
  }
}

angular.module('app.services')
  .service('SubjectService', SubjectService)
