/// <reference path="../typings/tsd.d.ts" />

angular.module('app.controllers', [])
  .controller('activitiesCtrl', function($scope) {
  })
    
  //Test controller to make ui-calendar directive work, will be moved to a
  //seperate file after it is integrated with the rest of the app
  .controller('scheduleCtrl',function($scope, Events){

    Events.loadEvents()

    var getToday=function(){
      var today=new Date()
      var year=today.getFullYear()
      var month=today.getMonth()+1
      var date=today.getDate()
      return month>10? year+'-'+month+'-'+date:year+'-0'+month+'-'+date
    }

    $scope.select_date=getToday()
    var getColorByTitle=function(title){
      if(title==='medicine'){
        return 'red'
      }
      else if(title==='cost'){
        return 'yellow'
      }
      else if(title==='examination'){
        return 'green'
      }
      else{
        return 'blue'
      }
    }
    $scope.events_in_select_date=Events.getEventsByDate($scope.select_date)

    $scope.eventSources={
      events:Events.getAllEvents().map(function(e){
        var temp={
          title:e.title,
          start:e.start,
          color:getColorByTitle(e.title)
        }
        return temp
      }),
      textColor: 'black'
    }

    $scope.alertEventOnClick=function(date,jsEvent,view){
      $scope.select_date=date.format()
      $scope.events_in_select_date=Events.getEventsByDate($scope.select_date)
    }

    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'agendaDay',
          center: 'title',
          right: 'prev,next'
        },
        dayClick: $scope.alertEventOnClick,
      }
    }
  })

.controller('CalendarDemoCtrl', function ($scope) {
  'use strict';
  $scope.calendar = {};
  $scope.changeMode = function (mode) {
    $scope.calendar.mode = mode;
  };

  $scope.loadEvents = function () {
    $scope.calendar.eventSource = createRandomEvents();
  };

  $scope.onEventSelected = function (event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  };

  $scope.onViewTitleChanged = function (title) {
    $scope.viewTitle = title;
  };

  $scope.today = function () {
    $scope.calendar.currentDate = new Date();
  };

  $scope.isToday = function () {
    var today = new Date(),
      currentCalendarDate = new Date($scope.calendar.currentDate);

    today.setHours(0, 0, 0, 0);
    currentCalendarDate.setHours(0, 0, 0, 0);
    return today.getTime() === currentCalendarDate.getTime();
  };

  $scope.onTimeSelected = function (selectedTime) {
    console.log('Selected time: ' + selectedTime);
  };

  function createRandomEvents() {
    var events = [];
    for (var i = 0; i < 50; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
      if (eventType === 0) {
        startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
        events.push({
          title: 'All Day - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true
        });
      } else {
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
        endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
        events.push({
          title: 'Event - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: false
        });
      }
    }
    return events;
  }
});


 