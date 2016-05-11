/// <reference path="../typings/tsd.d.ts" />

class SubjectService {
  subjectList
  subjects
  
  constructor() {
    this.subjects = [{}, {
      name: 'Análise',
      id: 1,
      classes: [{
        day: 'Terça',
        hour: '0800:0940',
        room: 'B4'
      }, {
        day: 'Sexta',
        hour: '1000:1140',
        room: 'B4'
      }],
      exams: [{
        name: 'P1',
        date: '29/Março',
        grade: '6.0'
      }],
      homeworks: [{
        name: 'Lista 1',
        date: '15/Março',
        grade: '5.0'
      }]
    }, {
      name: 'Concorrentes',
      id: 2,
      classes: [{
        day: 'Segunda',
        hour: '0800:0940',
        room: 'B2'
      }, {
        day: 'Quarta',
        hour: '1000:1140',
        room: 'B2'
      }],
      exams: [{
        name: 'P1',
        date: '24/Março',
        grade: '4.5'
      }, {
        name: 'P2',
        date: '22/Maio',
        grade: '-'
      }],
      homeworks: [{
        name: 'Lista 2',
        date: '10/Maio',
        grade: '-'
      }]
    }]
    this.subjectList = [{
      name: 'Análise',
      id: 1
    }, {
      name: 'Concorrentes',
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
    subject.classes = [{}]
    subject.exams = [{}]
    subject.homeworks = [{}]
    this.subjects.push(subject)
  }
  
  addClass(subjectId, classInput) {
    this.subjects[subjectId].class.push(classInput)
  }
}

angular.module('app.services', [])

  .factory('BlankFactory', [function(){

  }])

  .service('SubjectService', SubjectService)

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

