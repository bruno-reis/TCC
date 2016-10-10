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
  }

  update() {
    let data = this.StorageService.get('subjects')
    if (data) this.subjects = data
  }

  getSubject(subjectId) {
    //Using filter instead of array index bc indexes would change after delete
    let subject = this.subjects.filter(sb => sb.id == subjectId)
    return subject[0]
  }

  getSubjects() {
    //Using map to get subjectsList from subjects array to avoid errors on delete
    // let subjectList = this.subjects.map( s =>  [s.name, s.id])
    // console.log("sublist", subjectList)
    // return subjectList
    return this.subjects
  }

  addSubject(subject) {
    //Adding 5000 to differentiate activities IDs from subjects ones
    subject.id = (this.subjects.length) + 5000
    this.subjectList.push(subject)
    this.StorageService.add('subjectsList', this.subjectList)
    subject.classes = [{}]
    subject.exams = [{}]
    subject.homeworks = [{}]
    this.subjects.push(subject)
    this.StorageService.add('subjects', this.subjects)
    console.log("subs", this.subjects)
    this.update()
  }

  addClass(subjectId, input) {
    let subject = this.getSubject(subjectId)
    input.id = subject.classes.length
    subject.classes.push(input)
    this.StorageService.add('subjects', this.subjects)
    this.update()
  }

  addExam(subjectId, exam) {
    let subject = this.getSubject(subjectId)
    exam.id = subject.exams.length
    subject.exams.push(exam)
    this.StorageService.add('subjects', this.subjects)
    this.update()
  }

  editExam(subjectId, exam) {
    let subject = this.getSubject(subjectId)
    subject.exams[exam.id] = exam
    this.StorageService.add('subjects', this.subjects)
    this.update()
  }

  getExam(subjectId, examId) {
    let subject = this.getSubject(subjectId)
    return subject.exams[examId]
  }

  addHomework(subjectId, homework) {
    let subject = this.getSubject(subjectId)
    homework.id = subject.homeworks.length
    subject.homeworks.push(homework)
    this.StorageService.add('subjects', this.subjects)
    this.update()
  }

  editHomework(subjectId, homework) {
    let subject = this.getSubject(subjectId)
    subject.homeworks[homework.id] = homework
    this.StorageService.add('subjects', this.subjects)
    this.update()
  }

  getHomework(subjectId, homeworkId) {
    let subject = this.getSubject(subjectId)
    return subject.homeworks[homeworkId]
  }
}

angular.module('app.services')
  .service('SubjectService', SubjectService)
