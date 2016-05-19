/// <reference path="../../typings/tsd.d.ts" />

class SubjectService {
  private subjectList: Array<any>
  private subjects: Array<any>
  
  constructor() {
    this.subjects = [{}, {
      name: 'Introdução ao Design',
      id: 1,
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

class CalendarService {
  private events: Array<any>

  constructor() {
    this.events = []
  }

  createEvent(input) {
    this.events.push({
      title: input.title,
      startTime: new Date(input.date.getFullYear(), input.date.getMonth(),
        input.date.getDate(), input.startTime.getHours(),
        input.startTime.getMinutes(), 0, 0 ),
      endTime: new Date(input.date.getFullYear(), input.date.getMonth(),
        input.date.getDate(), input.endTime.getHours(),
        input.endTime.getMinutes(), 0, 0  ),
      allDay: false
    })
  }

  getEvents() {
    return this.events
  }

}

angular.module('app.services', [])
  
  .service('SubjectService', SubjectService)

  .service('CalendarService', CalendarService)
  
  .service('Events',function($rootScope){
    var events=[]

    return {
      loadEvents:function(){
        events=[{
          title:'medicine',
          start:'2016-05-20'
        },{
          title:'examination',
          start:'2016-05-08'
        },{
          title:'cost',
          start:'2016-05-16'
        },{
          title:'examination',
          start:'2016-05-17'
        }]

        $rootScope.$broadcast('events_get')
      },

      getAllEvents:function(){
        return events
      },

      getEventsByDate:function(date){
        return events.filter(function(e){
          return e.start===date
        })
      }
    }
  })

