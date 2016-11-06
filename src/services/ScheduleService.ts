/// <reference path="../../typings/tsd.d.ts" />

class ScheduleService {
  private $inject = ['SubjectService', 'ActivityService', 'CalendarService']
  private subjects
  private events
  private criteria

  constructor(public SubjectService,
              public ActivityService,
              public CalendarService) {
    this.subjects = SubjectService.getSubjects()
    this.events = CalendarService.getEvents()
    this.criteria = {
      minStudyTime: this.getTime(8, 0, null),
      maxStudyTime: this.getTime(22, 0, null)
    }
  }

  getFreeStudyBlocks(dmin, dmax) {
    let weekdayFreeBlocks = []
    let weekdayEvents = []
    let events = this.filterEvents(dmin, dmax, this.events)
    
    // separate events by day
    for (let day = dmin.getDay(); day <= dmax.getDay(); day++) {
      weekdayEvents[day] = events.filter( ev => {
        return ev.startTime.getDay() == day
      })
    }
    
    // get free time blocks per day
    for (let day = dmin.getDay(); day <= dmax.getDay(); day++) {
      let date = this.getDateWithOffset(dmin, (day - dmin.getDay()))
      weekdayFreeBlocks[day] = this.getDayFreeBlocks(weekdayEvents[day], date)
    }
  }

  getDayFreeBlocks(events, date) {
    let ev, startTime, endTime
    let freeBlocks = []
    let index = 0
    let dmin = this.fixDate(date, this.criteria.minStudyTime)
    let dmax = this.fixDate(date, this.criteria.maxStudyTime)
    if (events.length == 0) {
      return [this.createBlock(dmin, dmax)]
    }
    ev = events[index]
    startTime = dmin
    while (startTime < dmax) {
      while (startTime >= ev.startTime && index < events.length) {
        startTime = ev.endTime
        if (index + 1 < events.length) ev = events[index + 1]
        index = index + 1
      }
      endTime = startTime < ev.startTime ? ev.startTime : dmax
      freeBlocks.push(this.createBlock(startTime, endTime))
      startTime = endTime
    }
    return freeBlocks
  }

  getDateWithOffset(date, offset) {
    let d = new Date(date)
    d.setDate(d.getDate() + offset)
    return d
  }

  createBlock(startTime, endTime) {
    let duration = this.getDuration(startTime, endTime)
    return { startTime: startTime, endTime: endTime, duration: duration }
  }

  // returns duration in minutes
  getDuration(dmin, dmax) {
    return (dmax.getHours() - dmin.getHours()) * 60 + (dmax.getMinutes() - dmin.getMinutes())
  }

  getTime(hours, minutes, date) {
    let d = date == null ? new Date() : new Date(date)
    d.setHours(hours)
    d.setMinutes(minutes)
    d.setSeconds(0)
    d.setMilliseconds(0)
    return d
  }

  // filter and sort the events within the interval between dmin and dmax
  filterEvents(dmin, dmax, events) {
    return events.filter(ev => {
      return dmin <= ev.startTime && ev.startTime <= dmax
    }).sort( (ev1, ev2) => {
      return ev1.startTime > ev2.startTime
    })
  }

  fixDate(date, time) {
    return this.getTime(time.getHours(), time.getMinutes(), date)
  }

}

angular.module('app.services')
  .service('ScheduleService', ScheduleService)