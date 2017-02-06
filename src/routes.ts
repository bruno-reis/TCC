/// <reference path="../typings/tsd.d.ts" />

angular.module('app.routes', [])

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('calendar', {
        cache: false,
        url: '/calendar',
        templateUrl: 'templates/calendar.html',
        controller: 'CalendarDemoCtrl'
      })
      .state('subjects', {
        cache: false,
        url: '/subjects',
        template: '<ion-view id="subjectsList"> <ion-nav-view></ion-nav-view> </ion-view>',
        abstract: true
      })
      .state('subjects.list', {
        cache: false,
        url: '/list',
        templateUrl: 'templates/subject-list.html',
        controller: 'subjectsCtrl as vm'
      })
      .state('subjects.add', {
        cache: false,
        url: '/add',
        templateUrl: 'templates/subject-add.html',
        controller: 'subjectAddCtrl as vm'
      })
      .state('subject', {
        cache: false,
        url: '/subject/:subjectId',
        abstract: true,
        template: '<ion-nav-view name="subject-content"></ion-nav-view>'
      })
      .state('subject.info', {
        url: "/info",
        views: {
          'subject-content': {
            templateUrl: "templates/subject.html",
            controller: 'subjectCtrl as vm'            
          }
        }
      })
      .state('activities', {
        cache: false,
        url: '/activities',
        template: '<ion-view id="activitiesList"> <ion-nav-view></ion-nav-view> </ion-view>',
        abstract: true
      })
      .state('activities.list', {
        cache: false,
        url: '/list',
        templateUrl: 'templates/activity-list.html',
        controller: 'activitiesCtrl as vm'
      })
      .state('activities.add', {
        cache: false,
        url: '/add',
        templateUrl: 'templates/activity-add.html',
        controller: 'activitiesAddCtrl as vm'
      })
      .state('activity', {
        cache: false,
        url: 'activity/:activityId',
        template: '<ion-view id="activity"> <ion-nav-view></ion-nav-view> </ion-view>',
        abstract: true
      })
      .state('activity.info', {
        cache: false,
        url: '/info',
        templateUrl: 'templates/activity-info.html',
        controller: 'activitiesInfoCtrl as vm'
      })
      .state('activity.addDay', {
        cache: false,
        url: '/day/',
        templateUrl: 'templates/activity-add-day.html',
        controller: 'activitiesAddDayCtrl as vm'
      })
      .state('nextEvents', {
        cache: false,
        url: '/nextEvents',
        templateUrl: 'templates/nextEvents.html',
        controller: 'nextEventsCtrl as vm'
      })
      .state('grades', {
        cache: false,
        url: '/grades',
        templateUrl: 'templates/grades.html',
        controller: 'gradesCtrl as vm'
      })

      .state('schedules', {
        url: '/schedules',
        templateUrl: 'templates/schedules.html',
        controller: 'schedulesCtrl as vm'
      })

    $urlRouterProvider.otherwise('/subjects/list')
  });