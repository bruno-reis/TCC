/// <reference path="../typings/tsd.d.ts" />

class NextEventsCtrl {
  public $inject = ['$stateParams', '$state', 'SubjectService', 'CalendarService']
  private events;
  private nextEvents;
  private range = "7";

  constructor(public $state,
              public $stateParams,
              public CalendarService,
              public SubjectService) {
    this.events = this.CalendarService.getEvents().filter(e => e.type == "homeworks" || e.type == "exams");
    this.filterEvents()
  }
  
  filterEvents() {
    let start = new Date()
    let end = new Date().setDate(start.getDate() + parseInt(this.range, 10))
    this.nextEvents =  this.events.filter( ev => ev.startTime >= start && ev.endTime <= end)
  }

  selectSubject(subjectId) {
    this.$state.go('subject.info', {subjectId: subjectId})
  }
  
}

angular.module('app.controllers')
  .controller('nextEventsCtrl', NextEventsCtrl)
