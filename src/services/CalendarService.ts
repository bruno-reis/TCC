/// <reference path="../../typings/tsd.d.ts" />

class CalendarService {
  private events: Array<any>

  constructor() {
    this.events = []
  }

  createEvent(input) {
    this.events.push({
      title: input.title,
      startTime: input.date.getTime() + input.startTime.getTime() - input.date.getTimezoneOffset()*60000,
      endTime: input.date.getTime() + input.endTime.getTime() - input.date.getTimezoneOffset()*60000,
      allDay: false
    })
  }

  createClassEvents(input, startDate, endDate, name) {
    //TODO: Currently timezone is affecting the start/end of the events on calendar. Try to calculate days in another way
    startDate = new Date(startDate)
    endDate = new Date(endDate)
    let currDate = startDate
  
  //Get the closest day to the subject startDay on a Date Object
    while ( input.day != currDate.getDay()) {
      currDate = new Date(currDate.getTime() + 24*3600000)
    }
  //Increment currDate by 7 days until we get to the endDate.
  //So we add this class for the whole period on the calendar.
    while ( currDate.getTime() <= endDate.getTime() ) {
      this.events.push({
        title: name,
        startTime: currDate.getTime() + input.startTime.getTime(),
        endTime: currDate.getTime() + input.endTime.getTime(),
        allDay: false
      })
      currDate = new Date(currDate.getTime() + 7*24*3600000)
    }
  }

  getEvents() {
    return this.events
  }

}

angular.module('app.services')
  .service('CalendarService', CalendarService)
