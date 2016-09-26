/// <reference path="../../typings/tsd.d.ts" />

class CalendarService {
  private $inject = ['StorageService']

  private events: Array<any> = []

  constructor(public StorageService) {
    this.update()
  }

  update() {
    let data = this.StorageService.get('events')
    if (data) this.events = data
    console.log("events", this.StorageService.get('events'))
  }

  createEvent(input) {
    input.startTime.setMonth(input.date.getMonth())
    input.startTime.setDate(input.date.getDate())
    input.startTime.setFullYear(input.date.getFullYear())

    input.endTime.setMonth(input.date.getMonth())
    input.endTime.setDate(input.date.getDate())
    input.endTime.setFullYear(input.date.getFullYear())

    this.events.push({
      title: input.title,
      startTime: input.startTime.getTime(),
      endTime: input.endTime.getTime(),
      allDay: false
    })
    this.StorageService.add('events', this.events)
    this.update()
  }

  mod(n, m) {
    return ((n % m) + m) % m
  }

  createClassEvents(input, startDate, endDate, name) {
    //TODO: Currently timezone is affecting the start/end of the events on calendar. Try to calculate days in another way
    startDate = new Date(startDate)
    endDate = new Date(endDate)

    let diff = this.mod(input.day - startDate.getDay() , 7 )
    startDate.setDate( startDate.getDate() + diff)
    
    while ( startDate <= endDate ) {

      input.startTime.setMonth(startDate.getMonth())
      input.startTime.setDate(startDate.getDate())
      input.startTime.setFullYear(startDate.getFullYear())

      input.endTime.setMonth(startDate.getMonth())
      input.endTime.setDate(startDate.getDate())
      input.endTime.setFullYear(startDate.getFullYear())

      this.events.push({
        title: name,
        startTime: input.startTime.getTime(),
        endTime: input.endTime.getTime(),
        allDay: false
      })
      startDate.setDate(startDate.getDate() + 7)
    }

    this.StorageService.add('events', this.events)
    this.update()
  }

  getEvents() {
    return this.events
  }
}

angular.module('app.services')
  .service('CalendarService', CalendarService)
