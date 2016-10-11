/// <reference path="../../typings/tsd.d.ts" />

class CalendarService {
  private $inject = ['StorageService']
  private events: Array<any> = []

  constructor(public StorageService) {
    this.update()
  }
  
  getEvents() {
    return this.events
  }

  update() {
    let data = this.StorageService.get('events')
    if (data) this.events = data
  }
  
  //Defined as external function to handle negatives values
  mod(n, m) {
    return ((n % m) + m) % m
  }

  createEvent(input, owner, start, type) {
    let date = new Date(start)

    input.startTime.setMonth(date.getMonth())
    input.startTime.setDate(date.getDate())
    input.startTime.setFullYear(date.getFullYear())

    input.endTime.setMonth(date.getMonth())
    input.endTime.setDate(date.getDate())
    input.endTime.setFullYear(date.getFullYear())

    this.events.push({
      eventId: input.id,
      ownerId: owner.id,
      type: type,
      title: input.type || owner.name,
      startTime: input.startTime.getTime(),
      endTime: input.endTime.getTime(),
      allDay: false
    })

    console.log("events", this.events)
    this.StorageService.add('events', this.events)
    this.update()
  }

  createClassEvents(input, subject) {
    subject.startDate = new Date(subject.startDate)
    subject.endDate = new Date(subject.endDate)
    
    //Using MOD to adjust between subject start date and day when class starts
    let diff = this.mod(input.day - subject.startDate.getDay() , 7 )
    subject.startDate.setDate( subject.startDate.getDate() + diff)
    
    while ( subject.startDate <= subject.endDate ) {
      this.createEvent(input, subject, subject.startDate, "class")
      subject.startDate.setDate(subject.startDate.getDate() + 7)
    }

    this.StorageService.add('events', this.events)
    this.update()
  }
  
  createActivityEvents(input, activity) {
    let end = new Date(activity.startDate)
    let start = new Date(activity.startDate)

    activity.duration = parseInt(activity.duration, 10);
    end.setMonth(start.getMonth() + activity.duration)

    while (start <= end ) {
      this.createEvent(input, activity, start, "activity")
      start.setDate(start.getDate() + 7)
    }

    this.StorageService.add('events', this.events)
    this.update()
  }
  
 
}

angular.module('app.services')
  .service('CalendarService', CalendarService)
