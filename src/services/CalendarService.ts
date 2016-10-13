/// <reference path="../../typings/tsd.d.ts" />

class CalendarService {
  private $inject = ['StorageService']
  private events = []
  private days = ['Domingo','Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

  constructor(public StorageService) {
    this.update()
  }
  
  getEvents() {
    return this.events
  }
  
  getDays() {
    return this.days
  }

  update() {
    let data = this.StorageService.get('events')
    if (data) this.events = data
    // console.log("events", this.events)
  }

  storeEvents() {
    this.StorageService.add('events', this.events)
    this.update()
  }
  
  //Defined as external function to handle negatives values
  mod(n, m) {
    return ((n % m) + m) % m
  }

  createSingleEvent() {

  }

  createMultipleEvent() {
    
  }

  createEvent(input, owner, start, type) {
    //TODO: refactor these create methods
    // let date = new Date(start)

    input.startTime.setMonth(start.getMonth())
    input.startTime.setDate(start.getDate())
    input.startTime.setFullYear(start.getFullYear())

    input.endTime.setMonth(start.getMonth())
    input.endTime.setDate(start.getDate())
    input.endTime.setFullYear(start.getFullYear())

    this.events.push({
      eventId: input.id,
      ownerId: owner.id,
      type: type,
      title: input.title || owner.name,
      startTime: input.startTime,
      endTime: input.endTime,
      allDay: false
    })
    this.storeEvents()
  }

  createClassEvents(input, subject) {
    //TODO: refactor these create methods
    subject.startDate = new Date(subject.startDate)
    subject.endDate = new Date(subject.endDate)
    
    //Using MOD to adjust between subject start date and day when class starts
    let diff = this.mod(input.day - subject.startDate.getDay() , 7 )
    subject.startDate.setDate( subject.startDate.getDate() + diff)
    
    while ( subject.startDate <= subject.endDate ) {
      this.createEvent(input, subject, subject.startDate, "class")
      subject.startDate.setDate(subject.startDate.getDate() + 7)
    }

    this.storeEvents()
  }
  
  createActivityEvents(input, activity) {
    //TODO: refactor these create methods
    let end = new Date(activity.startDate)
    let start = new Date(activity.startDate)

    activity.duration = parseInt(activity.duration, 10);
    end.setMonth(start.getMonth() + activity.duration)

    while (start <= end ) {
      this.createEvent(input, activity, start, "activity")
      start.setDate(start.getDate() + 7)
    }

    this.storeEvents()
  }

  deleteEvent(ownerId) {
    //filter out the events given ownerId(activityId/subjectId)
    let events = this.events.filter( ev => ev.ownerId != ownerId)
    this.StorageService.add('events', events)
    this.update()
  }

  deleteChildEvent(ownerId, eventId) {
    //filter out the events from the ownerId that have the same eventId
    this.events.map( ev => {
      if (ev.eventId == eventId && ev.ownerId == ownerId) {
        this.events.splice(this.events.indexOf(ev), 1)
      }
    })
    this.StorageService.add('events', this.events)
    this.update()
  }
}

angular.module('app.services')
  .service('CalendarService', CalendarService)
