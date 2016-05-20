/// <reference path="../../typings/tsd.d.ts" />

class SubjectService {
  private subjectList: Array<any>
  private subjects: Array<any>

  //Creating a dummy empty object because we are using the index as an index
  constructor() {
    this.subjects = [{}, {
      name: 'Introdução ao Design',
      id: 1,
      startDate: '1455501600000',
      endDate: '1467255600000',
      classes: [{
        day: 'Terça',
        time: '0800:0940',
        room: 'B4'
      }, {
        day: 'Sexta',
        time: '1000:1140',
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
      startDate: '1455501600000',
      endDate: '1467255600000',
      classes: [{
        day: 'Segunda',
        time: '0800:0940',
        room: 'B2'
      }, {
        day: 'Quarta',
        time: '1000:1140',
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
    subject.exams = []
    subject.homeworks = []
    this.subjects.push(subject)
  }

  addClass(subjectId, input) {
    this.subjects[subjectId].classes.push(input)
  }

  addExam(subjectId, input) {
    this.subjects[subjectId].exams.push(input)
  }

  addHomework(subjectId, input) {
    this.subjects[subjectId].homeworks.push(input)
  }
}

angular.module('app.services')
  .service('SubjectService', SubjectService)
