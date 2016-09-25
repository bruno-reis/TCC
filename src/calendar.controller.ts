/// <reference path="../typings/tsd.d.ts" />

// class CalendarCtrl {
//   public inject = ['$scope', 'CalendarService']
//
//   private calendar
//
//   constructor(public scope,
//               public CalendarService) {
//     this.calendar.eventSource = CalendarService.getEvents()
//   }
//
//   changeMode(mode) {
//     this.calendar.mode = mode
//   }
//
//   loadEvents() {
//   }
//
//   onEventSelected(event) {
//     console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
//   }
//
//   onViewTitleChanged(title) {
//     this.scope.viewTitle = title
//   }
//
//   today() {
//     this.calendar.currentDate = new Date();
//   }
//
//   isToday() {
//     let today = new Date()
//     let currentCalendarDate = new Date(this.calendar.currentDate);
//     today.setHours(0, 0, 0, 0);
//     currentCalendarDate.setHours(0, 0, 0, 0);
//     return today.getTime() === currentCalendarDate.getTime();
//   }
//
//   onTimeSelected(selectedTime) {
//     console.log('Selected time: ' + selectedTime);
//   }
// }
//
// angular.module('app.controllers')
//   .controller('CalendarCtrl', CalendarCtrl)
