/// <reference path="../../typings/tsd.d.ts" />

class SubjectService {
  private subjectList: Array<any>
  private subjects: Array<any>

  //Creating a dummy empty object because we are using the index as an index
  constructor() {
    this.subjects = [{}, {
      name: 'Introdução ao Design',
      id: 1,
      startDate: 1455501600000,
      endDate: 1467255600000,
      classes: [{
        day: '2',
        startTime: '39600000',
        endTime: '45600000',
        room: 'B4'
      }, {
        day: '5',
        startTime: '46800000',
        endTime: '52800000',
        room: 'B4'
      }],
      exams: [{
        title: 'P1',
        date: '29/Março',
        weight: '1'
      }],
      homeworks: [{
        title: 'Maquete ',
        date: '15/Março',
        weight: '2'
      }]
    }, {
      name: 'Cálculo Diferencial e Integral I',
      id: 2,
      startDate: 1455501600000,
      endDate: 1467255600000,
      classes: [{
        day: '1',
        startTime: '39600000',
        endTime: '45600000',
        room: 'B2'
      }, {
        day: '3',
        startTime: '46800000',
        endTime: '52800000',
        room: 'B2'
      }],
      exams: [{
        title: 'P1',
        date: '24/Março',
        weight: '1'
      }, {
        title: 'P2',
        date: '22/Maio',
        weight: '2'
      }],
      homeworks: [{
        title: 'Lista de Exercicios 2',
        date: '10/Maio',
        weight: '1'
      }]
    }]
    this.subjectList = [{
      name: 'Introdução ao Design',
      id: 1
    }, {
      name: 'Cálculo Diferencial e Integral I',
      id: 2
    }]
  }

  getSubject(subjectId) {
    return this.subjects[subjectId]
  }

  getSubjects() {
    return this.subjectList
  }

  addSubject(subject) {
    subject.id = ''
    subject.id  = this.subjects[this.subjects.length - 1].id + 1
    this.subjectList.push(subject)
    subject.classes = []
    subject.exams = [{}]
    subject.homeworks = [{}]
    this.subjects.push(subject)
  }

  addClass(subjectId, input) {
    this.subjects[subjectId].classes.push(input)
  }

  addExam(subjectId, exam) {
    exam.id = ''
    exam.id = this.subjects[subjectId].exams.length
    this.subjects[subjectId].exams.push(exam)
  }

  editExam(subjectId, exam) {
    this.subjects[subjectId].exams[exam.id] = exam
  }

  getExam(subjectId, examId) {
    return this.subjects[subjectId].exams[examId]
  }

  addHomework(subjectId, homework) {
    homework.id = ''
    homework.id = this.subjects[subjectId].homeworks.length
    this.subjects[subjectId].homeworks.push(homework)
  }

  editHomework(subjectId, homework) {
    this.subjects[subjectId].homeworks[homework.id] = homework
  }

  getHomework(subjectId, homeworkId) {
    return this.subjects[subjectId].homeworks[homeworkId]
  }
}

angular.module('app.services')
  .service('SubjectService', SubjectService)
