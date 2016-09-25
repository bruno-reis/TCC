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

  mod(n, m) {
    return ((n % m) + m) % m
  }

  createClassEvents(input, startDate, endDate, name) {
    //TODO: Currently timezone is affecting the start/end of the events on calendar. Try to calculate days in another way
    startDate = new Date(startDate)
    endDate = new Date(endDate)
    console.log("sd", startDate)

    let diff = this.mod(input.day - startDate.getDay() , 6 )
    
    startDate.setDate( startDate.getDate() + diff)
    console.log("sf", startDate)

    let currDate = new Date()
    currDate = startDate
    //Get the closest day to the subject startDay on a Date Object
    // while ( input.day != currDate.getDay()) {
    //   currDate = new Date(currDate.getTime() + 24*3600000)
    //   console.log("c", currDate)
    // }


  //Increment currDate by 7 days until we get to the endDate.
  //So we add this class for the whole period on the calendar.
    while ( currDate <= endDate ) {
      this.events.push({
        title: name,
        startTime: currDate.getTime() + input.startTime.getTime(),
        endTime: currDate.getTime() + input.endTime.getTime(),
        allDay: false
      })

      currDate.setDate(currDate.getDate() + 7)
    }
  }

  getEvents() {
    return this.events
  }

}

angular.module('app.services')
  .service('CalendarService', CalendarService)
