/// <reference path="../../typings/tsd.d.ts" />

class ScheduleService {
  private $inject = ['SubjectService', 'StorageService', 'CalendarService']
  private subjects
  private events
  private criteria
  private maxId

  constructor(public SubjectService,
              public StorageService,
              public CalendarService) {
    this.update()
    this.maxId = 1 + this.events.filter( ev => { return ev.type == "studies" }).length
  }

  saveCriteria(criteria) {
    this.StorageService.add('schedules.criteria', criteria)
    this.update()
  }

  getCriteria() {
    this.update()
    if (this.criteria == null) return {}
    return this.criteria
  }

  update() {
    let data = this.StorageService.get('schedules.criteria')
    if (data) {
      this.criteria = data
      this.criteria.minStudyTime = new Date(this.criteria.minStudyTime)
      this.criteria.maxStudyTime = new Date(this.criteria.maxStudyTime)
    }
    this.subjects = this.SubjectService.getSubjects()
    this.events = this.CalendarService.getEvents()
  }

  clearPreviousSchedules() {
    this.CalendarService.deleteEventByType("studies")
    this.update()
  }

  createSchedule(weekOffset) {
    let dmax, freeBlocks, studyTimePerSubject
    let totalFreeTime = 0
    let totalStudyTime = 120 * this.subjects.length
    let dmin = this.getTime(0, 0, null)
    let maxDay = this.criteria.weekendStudy ? 6 : 5
    while (!this.criteria.weekendStudy && dmin.getDay() % 6 == 0) {
      dmin.setDate(dmin.getDate() + 1)
    }
    if (dmin.getDay() < maxDay) {
      dmax = this.getTime(0, 0, null)
      dmax.setDate(dmin.getDate() + (maxDay - dmin.getDay()))
    } else {
      dmax = dmin
    }
    freeBlocks = this.getFreeStudyBlocks(dmin, dmax)
    console.log(freeBlocks)
    // freeBlocks.forEach(day => {
    //   day.forEach(block => {
    //     totalFreeTime += block.duration
    //   })
    // })
    // studyTimePerSubject = totalFreeTime > totalStudyTime ? 
    //                           this.criteria.weeklyStudyTime : totalFreeTime / this.subjects.length
    // this.subjects.forEach(subject => {
    //   freeBlocks = this.allocateStudy(subject, freeBlocks, studyTimePerSubject)
    // })
  }

  allocateStudy(subject, blocks, studyTimePerSubject) {
    let classDays = subject.classes.map(cl => { return cl.day })
    let dailyStudy = studyTimePerSubject / classDays.length
    let daysLeft = classDays.length
    let daysTaken = []
    // tries to schedule study to the same days as subject classes
    classDays.forEach(day => {
      let bd = blocks[day]
      if (this.checkBlocks(bd, dailyStudy, subject)) {
        daysLeft = daysLeft - 1
        daysTaken.push(day)
      }
    })

    // tries to schedule any day if class days were unavailable
    if (daysLeft > 0) {
      for (let day = 0; day < 7; day++) {
        let bd = blocks[day]
        if (daysTaken.indexOf(day) > -1)
          continue
        if (this.checkBlocks(bd, dailyStudy, subject))
          daysLeft = daysLeft - 1
      }
    }

    // case there was no block with duration bigger than daily study
    if (daysLeft > 0) {
      for (let day = 0; day < 7; day++) {
        let studyTimeLeft = daysLeft * dailyStudy
        let bd = blocks[day]
        for (let i = 0; i < bd.length && studyTimeLeft > 0; i++) {
          if (bd[i].duration >= studyTimeLeft) {
            let oldEndTime = new Date(bd[i].endTime.getTime())
            bd[i].endTime.setMinutes(bd[i].endTime.getMinutes() - studyTimeLeft)
            bd[i].duration -= studyTimeLeft
            studyTimeLeft = 0
            this.createStudyEvent(bd[i].endTime, oldEndTime, subject)
            break
          } else {
            let oldEndTime = new Date(bd[i].endTime.getTime())
            bd[i].endTime.setTime(bd[i].startTime.getTime())
            studyTimeLeft -= bd[i].duration
            bd[i].duration = 0
            this.createStudyEvent(bd[i].endTime, oldEndTime, subject)
          }
        }
      }
    }
    return blocks
  }

  checkBlocks(blocks, dailyStudy, subject) {
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].duration >= dailyStudy) {
        let oldEndTime = new Date(blocks[i].endTime.getTime())
        blocks[i].duration -= dailyStudy
        blocks[i].endTime.setMinutes(blocks[i].endTime.getMinutes() - dailyStudy)
        this.createStudyEvent(blocks[i].endTime, oldEndTime, subject)
        return true
      }
    }
    return false
  }

  createStudyEvent(startTime, endTime, subject) {
    let ev = {
      startTime: startTime,
      endTime: endTime,
      id: this.maxId,
      type: "studies",
      title: "Estudar " + subject.name
    }
    this.CalendarService.createEvent(ev, subject, startTime)
    this.maxId += 1
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

    return weekdayFreeBlocks
  }

  getDayFreeBlocks(events, date) {
    let ev, startTime, endTime
    let freeBlocks = []
    let index = 0
    let dmin = this.fixDateTime(date, this.criteria.minStudyTime)
    let dmax = this.fixDateTime(date, this.criteria.maxStudyTime)
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

  fixDateTime(date, time) {
    return this.getTime(time.getHours(), time.getMinutes(), date)
  }

}

angular.module('app.services')
  .service('ScheduleService', ScheduleService)