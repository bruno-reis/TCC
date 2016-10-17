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
    // console.log("subs", this.subjects)
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
    let subject = this.subjects.filter(sb => sb.id == subjectId)
    return subject[0]
  }

  getSubjectProperty(subjectId, propId, propName) {
    let subject = this.subjects.find(sb => sb.id == subjectId)
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
    subject[propName].push(input)
    this.StorageService.add('subjects', this.subjects)
    this.update()
  }

  editSubjectProperty(subjectId, propName, input) {
    let subjectProp = this.getSubjectProperty(subjectId, input.id, propName)
    subjectProp = input
    this.StorageService.add('subjects', this.subjects)
    this.update()
  }

  deleteSubject(subjectId) {
    let subjects = this.subjects.filter( sb => sb.id != subjectId)
    this.StorageService.add('subjects', subjects)
    this.update()
  }
  

  deleteSubjectProperty(subjectId, propName, propId) {
    //Property can be a homework/exam/class
    let subject = this.getSubject(subjectId)
    subject[propName] = subject[propName].filter( ch => ch.id != propId)
    this.StorageService.add('subjects', this.subjects)
    this.update()
  }

  setFinalGradeWeights(subjectId, examsWeight, homeworksWeight) {
    let subject = this.getSubject(subjectId)
    subject.examsWeight = examsWeight
    subject.homeworksWeight = homeworksWeight
    this.storeSubjects()
  }

  validateTime(input) {
    if (input.startTime >= input.endTime) {
      this.PopupService.timeErrorPopup().then(() => input.endTime = null)
      return false
    }
    return true
  }
}

angular.module('app.services')
  .service('SubjectService', SubjectService)
