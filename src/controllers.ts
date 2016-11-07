/// <reference path="../typings/tsd.d.ts" />

angular.module('app.controllers', [])
  .controller('activitiesCtrl', function($scope) { })

  .controller('CalendarDemoCtrl', function ($scope, $state, CalendarService) {
    'use strict';
    $scope.calendar = {};
    $scope.calendar.eventSource = CalendarService.getEvents();
    $scope.changeMode = function (mode) {
      $scope.calendar.mode = mode;
    };
    
    $scope.onEventSelected = function (event) {
      if (event.type == 'activity') $scope.selectActivity(event.ownerId)
      else $scope.selectSubject(event.ownerId)
    };

    $scope.selectActivity = function (activityId) {
      $state.go('activity.info', {activityId: activityId})
    }

    $scope.selectSubject = function (subjectId) {
      $state.go('subject.info', {subjectId: subjectId})
    }

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
    };
  });


 