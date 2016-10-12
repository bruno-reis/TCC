/// <reference path="../../typings/tsd.d.ts" />

class SubjectService {
  private $inject = ['StorageService']
  private subjects = []

  //Creating a dummy empty object because we are using the index as an index
  constructor(public StorageService) {
    this.update()
  }

  update() {
    let data = this.StorageService.get('subjects')
    if (data) this.subjects = data
    console.log("subs", this.subjects)
  }

  getSubject(subjectId) {
    //Using filter instead of array index bc indexes would change after delete
    let subject = this.subjects.filter(sb => sb.id == subjectId)
    return subject[0]
  }

  getSubjects() {
    return this.subjects
  }

  getNextId(list, startValue) {
    //Get the id of the list last element and increase it by 1
    let nextId = (list.length > 0) ? list[list.length-1].id + 1 : startValue
    return nextId
  }

  addSubject(subject) {
    //Adding 5000 to differentiate activities IDs from subjects ones
    subject.id = this.getNextId(this.subjects, 5000)
    subject.classes = []
    subject.exams = []
    subject.homeworks = []
    this.subjects.push(subject)
    this.StorageService.add('subjects', this.subjects)
    this.update()
  }

  addClass(subjectId, input) {
    let subject = this.getSubject(subjectId)
    input.id = this.getNextId(subject.classes, 1)
    subject.classes.push(input)
    this.StorageService.add('subjects', this.subjects)
    this.update()
  }

  addExam(subjectId, exam) {
    let subject = this.getSubject(subjectId)
    exam.id = this.getNextId(subject.exams, 1)
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
    homework.id = this.getNextId(subject.homeworks, 1)
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
  
  deleteSubject(subjectId) {
    let subjects = this.subjects.filter( sb => sb.id != subjectId)
    this.StorageService.add('subjects', subjects)
    this.update()
  }
  
  deleteSubjectChild(subjectId, childId, child) {
    //Child can be a homework/exam/class
    let subject = this.getSubject(subjectId)
    subject[child] = subject[child].filter( ch => ch.id != childId)
    this.StorageService.add('subjects', this.subjects)
    this.update()
  }

  setFinalGradeWeights(subjectId, examsWeight, homeworksWeight) {
    this.subjects[subjectId].examsWeight = examsWeight
    this.subjects[subjectId].homeworksWeight = homeworksWeight
    this.StorageService.add('subjects', this.subjects)
    this.update()
  }
}

angular.module('app.services')
  .service('SubjectService', SubjectService)
