/// <reference path="../../typings/tsd.d.ts" />

class CalendarService {
  private $inject = ['StorageService']
  private events = []
  private days = ['Domingo','Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

  constructor(public StorageService) {
    this.update()
  }
  
  getEvents() {
    return this.events.filter(ev => { return !ev.hidden })
  }
  
  getDays() {
    return this.days
  }

  update() {
    let data = this.StorageService.get('events')
    if (data) this.events = data
    this.fixEvents()
  }

  fixEvents() {
    let size = this.events.length
    for (let i = 0; i < size; i++) {
      this.events[i].startTime = new Date(this.events[i].startTime)
      this.events[i].endTime = new Date(this.events[i].endTime)
    }
  }

  storeEvents() {
    this.StorageService.add('events', this.events)
    this.update()
  }
  
  //Defined as external function to handle negatives values i.e: '-3 mod 7'.
  mod(n, m) {
    return ((n % m) + m) % m
  }

  createMultipleEvents(input, owner) {
    let date = new Date(owner.startDate)
    let startDate = new Date(owner.startDate)
    let endDate = new Date(owner.endDate)

    //Using MOD to set 'date' as the closest day after a class/activity 'startDate'
    let diff = this.mod(input.day - startDate.getDay() , 7 )
    date.setDate( startDate.getDate() + diff)

    while (date <= endDate ) {
      this.createEvent(input, owner, date)
      date.setDate(date.getDate() + 7)
    }
  }
 
  createEvent(input, owner, date) {
    input.startTime.setDate(date.getDate())
    input.startTime.setMonth(date.getMonth())
    input.startTime.setFullYear(date.getFullYear())

    input.endTime.setDate(date.getDate())
    input.endTime.setMonth(date.getMonth())
    input.endTime.setFullYear(date.getFullYear())

    this.events.push({
      eventId: input.id,
      ownerId: owner.id,
      ownerName: owner.name,
      type: input.type,
      title: input.title || owner.name,
      startTime: input.startTime,
      endTime: input.endTime,
      allDay: false
    })
    this.storeEvents()
  }
  
  editChildEvent(ownerId, eventId, input) {
    this.events.map( ev => {
      if (ev.eventId == eventId && ev.ownerId == ownerId && ev.type == input.type) {
        input.startTime.setDate(input.date.getDate())
        input.startTime.setMonth(input.date.getMonth())
        input.startTime.setFullYear(input.date.getFullYear())

        input.endTime.setDate(input.date.getDate())
        input.endTime.setMonth(input.date.getMonth())
        input.endTime.setFullYear(input.date.getFullYear())

        ev.title = input.title
        ev.startTime = input.startTime
        ev.endTime = input.endTime
      }
    })
   this.storeEvents()
  }

  deleteEvent(ownerId) {
    //filter out the events given ownerId(activityId/subjectId)
    this.events = this.events.filter( ev => ev.ownerId != ownerId)
    this.storeEvents()
  }

  deleteChildEvent(ownerId, eventId, eventType) {
    //filter out the events from the ownerId that have the same eventId
    this.events = this.events.filter(ev => {
      return (ev.ownerId != ownerId) || (ev.eventId != eventId) || (ev.type != eventType)
    })
    this.storeEvents()
  }

  deleteEventByType(type) {
    this.events = this.events.filter(ev => {
      return ev.type != type
    })
    this.storeEvents()
  }

  changeEventVisibility(ownerId, eventType, startTime, endTime, hidden) {
    let event = this.events.filter(ev => {
      return (ev.ownerId == ownerId) && (ev.type == eventType) &&
             this.equals(ev.startTime, startTime) && this.equals(ev.endTime, endTime)
    })[0]
    event.hidden = hidden
    this.storeEvents()
  }

  equals(date1, date2) {
    return date1.getFullYear() == date2.getFullYear() &&
           date1.getMonth() == date2.getMonth() &&
           date1.getDate() == date2.getDate() &&
           date1.getHours() == date2.getHours() &&
           date1.getMinutes() == date2.getMinutes()
  }

}

angular.module('app.services')
  .service('CalendarService', CalendarService)
