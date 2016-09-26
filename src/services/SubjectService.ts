/// <reference path="../../typings/tsd.d.ts" />

class SubjectService {
  private $inject = ['StorageService']

  private subjectList: Array<any> = []
  private subjects: Array<any> = []

  //Creating a dummy empty object because we are using the index as an index
  constructor(public StorageService) {
    let list = this.StorageService.get('subjectsList')
    if (list) this.subjectList = list
    let data = this.StorageService.get('subjects')
    if (data) this.subjects = data
    console.log(this.StorageService.get('subjects'))
  }

  update() {
    let data = this.StorageService.get('subjects')
    if (data) this.subjects = data
  }

  getSubject(subjectId) {
    return this.subjects[subjectId]
  }

  getSubjects() {
    return this.subjectList
  }

  addSubject(subject) {
    subject.id = this.subjects.length + 1
    this.subjectList.push(subject)
    this.StorageService.add('subjectsList', this.subjectList)
    subject.classes = []
    subject.exams = []
    subject.homeworks = []
    this.subjects.push(subject)
    this.StorageService.add('subjects', this.subjects)
    this.update()
  }

  addClass(subjectId, input) {
    input.id = this.subjects[subjectId].classes.length + 1
    this.subjects[subjectId].classes.push(input)
    this.StorageService.add('subjects', this.subjects)
    this.update()
  }

  addExam(subjectId, input) {
    this.subjects[subjectId].exams.push(input)
    this.StorageService.add('subjects', this.subjects)
    this.update()
  }

  addHomework(subjectId, input) {
    this.subjects[subjectId].homeworks.push(input)
    this.StorageService.add('subjects', this.subjects)
    this.update()
  }
}

angular.module('app.services')
  .service('SubjectService', SubjectService)
