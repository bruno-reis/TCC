/// <reference path="../../typings/tsd.d.ts" />

class SubjectService {
  private $inject = ['StorageService']

  private subjectList: Array<any> = []
  private subjects: Array<any> = []

  //Creating a dummy empty object because we are using the index as an index
  constructor(public StorageService) {
    // this.subjects = [{}, {
    //   name: 'Introdução ao Design',
    //   id: 1,
    //   startDate: 1455501600000,
    //   endDate: 1467255600000,
    //   classes: [{
    //     day: '2',
    //     startTime: '39600000',
    //     endTime: '45600000',
    //     room: 'B4'
    //   }, {
    //     day: '5',
    //     startTime: '46800000',
    //     endTime: '52800000',
    //     room: 'B4'
    //   }],
    //   exams: [{
    //     title: 'P1',
    //     date: '29/Março',
    //     weight: '1'
    //   }],
    //   homeworks: [{
    //     title: 'Maquete ',
    //     date: '15/Março',
    //     weight: '2'
    //   }]
    // }, {
    //   name: 'Cálculo Diferencial e Integral I',
    //   id: 2,
    //   startDate: 1455501600000,
    //   endDate: 1467255600000,
    //   classes: [{
    //     day: '1',
    //     startTime: '39600000',
    //     endTime: '45600000',
    //     room: 'B2'
    //   }, {
    //     day: '3',
    //     startTime: '46800000',
    //     endTime: '52800000',
    //     room: 'B2'
    //   }],
    //   exams: [{
    //     title: 'P1',
    //     date: '24/Março',
    //     weight: '1'
    //   }, {
    //     title: 'P2',
    //     date: '22/Maio',
    //     weight: '2'
    //   }],
    //   homeworks: [{
    //     title: 'Lista de Exercicios 2',
    //     date: '10/Maio',
    //     weight: '1'
    //   }]
    // }]
    // this.subjectList = [{
    //   name: 'Introdução ao Design',
    //   id: 1
    // }, {
    //   name: 'Cálculo Diferencial e Integral I',
    //   id: 2
    // }]
    let list = this.StorageService.get('subjectsList')
    if (list) this.subjectList = list
    let data = this.StorageService.get('subjects')
    if (data) this.subjects = data
    console.log(this.StorageService.get('subjects'))
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
