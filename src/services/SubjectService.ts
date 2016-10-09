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
    //Adding 5000 to differentiate activities IDs from subjects ones
    subject.id = (this.subjects.length + 1) + 5000
    this.subjectList.push(subject)
    this.StorageService.add('subjectsList', this.subjectList)
    subject.classes = [{}]
    subject.exams = [{}]
    subject.homeworks = [{}]
    this.subjects.push(subject)
    this.StorageService.add('subjects', this.subjects)
    this.update()
  }

  addClass(subjectId, input) {
    input.id = this.subjects[subjectId].classes.length
    this.subjects[subjectId].classes.push(input)
    this.StorageService.add('subjects', this.subjects)
    this.update()
  }

  addExam(subjectId, exam) {
    exam.id = this.subjects[subjectId].exams.length
    this.subjects[subjectId].exams.push(exam)
    this.StorageService.add('subjects', this.subjects)
    this.update()
  }

  editExam(subjectId, exam) {
    this.subjects[subjectId].exams[exam.id] = exam
    this.StorageService.add('subjects', this.subjects)
    this.update()
  }

  getExam(subjectId, examId) {
    return this.subjects[subjectId].exams[examId]
  }

  addHomework(subjectId, homework) {
    homework.id = this.subjects[subjectId].homeworks.length
    this.subjects[subjectId].homeworks.push(homework)
    this.StorageService.add('subjects', this.subjects)
    this.update()
  }

  editHomework(subjectId, homework) {
    this.subjects[subjectId].homeworks[homework.id] = homework
    this.StorageService.add('subjects', this.subjects)
    this.update()
  }

  getHomework(subjectId, homeworkId) {
    return this.subjects[subjectId].homeworks[homeworkId]
  }
}

angular.module('app.services')
  .service('SubjectService', SubjectService)
