/// <reference path="../../typings/tsd.d.ts" />

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

angular.module('app.services')
  .service('CalendarService', CalendarService)
