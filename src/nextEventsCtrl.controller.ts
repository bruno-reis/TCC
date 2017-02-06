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
  }

  eventsInOneWeek() {
    let start = new Date()
    let end = this.getDateWithOffset(7)
    return this.events.filter( ev => ev.startTime >= start && ev.endTime <= end) 
  }

  eventsInTwoWeeks() {
    let start = this.getDateWithOffset(7)
    let end = this.getDateWithOffset(14)
    return this.events.filter( ev => ev.startTime >= start && ev.endTime <= end) 
  }

  eventsInOneMonth() {
    let start = this.getDateWithOffset(14)
    let end = this.getDateWithOffset(30)
    return this.events.filter( ev => ev.startTime >= start && ev.endTime <= end) 
  }

  getDateWithOffset(offset) {
    let date = new Date()
    date.setDate(date.getDate() + offset)
    return date
  }

  selectSubject(subjectId) {
    this.$state.go('subject.info', {subjectId: subjectId})
  }
  
}

angular.module('app.controllers')
  .controller('nextEventsCtrl', NextEventsCtrl)
